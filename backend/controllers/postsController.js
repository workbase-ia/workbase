import { readJSON, writeJSON } from '../lib/helper.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const postsFilePath = path.join(__dirname, '../data/posts.json');
const usersFilePath = path.join(__dirname, '../data/usuarios.json');

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getPosts = async (req, res) => {
    try {
        await delay(300);

        const postsData = readJSON(postsFilePath);
        const usuariosData = readJSON(usersFilePath);

        if (!postsData || !usuariosData) {
            return res.status(500).json({ message: "Erro ao carregar dados de posts ou usuários" });
        }

        const postsComAutor = postsData.map(post => {
            const autor = usuariosData.find(user => user.id === post.autorId);

            const postComAutor = {
                ...post,
                autor: autor ? {
                    id: autor.id,
                    nome: autor.nome,
                    foto: autor.foto,
                    cargo: autor.cargo,
                    localizacao: autor.localizacao
                } : {
                    nome: "Usuário Desconhecido",
                    foto: null
                }
            };

            if (postComAutor.comentarios && postComAutor.comentarios.length > 0) {
                postComAutor.comentarios = postComAutor.comentarios.map(comment => {
                    const commenter = usuariosData.find(user => user.id === comment.commenterId);

                    return {
                        ...comment,
                        autor: commenter ? {
                            nome: commenter.nome,
                            foto: commenter.foto
                        } : {
                            nome: "Usuário Desconhecido",
                            foto: null
                        }
                    };
                });
            }

            return postComAutor;
        });

        postsComAutor.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
        );

        res.status(200).json(postsComAutor);
    } catch (error) {
        res.status(500).json({
            message: "Erro ao buscar posts",
            error: error.message
        });
    }
};

export const likePost = async (req, res) => {
    try {
        await delay(100);

        const { postId } = req.params;
        const postsData = readJSON(postsFilePath);

        if (!postsData) {
            return res.status(500).json({ message: "Erro ao carregar dados de posts" });
        }

        const post = postsData.find(p => p.id === parseInt(postId));

        if (!post) {
            return res.status(404).json({ message: "Post não encontrado" });
        }

        post.curtidas += 1;
        writeJSON(postsFilePath, postsData);

        res.status(200).json({ curtidas: post.curtidas });
    } catch (error) {
        res.status(500).json({
            message: "Erro ao dar like no post",
            error: error.message
        });
    }
};

export const addComment = async (req, res) => {
    try {
        await delay(200);

        const { postId } = req.params;
        const { commenterId, text } = req.body;

        const postsData = readJSON(postsFilePath);
        const usuariosData = readJSON(usersFilePath);

        if (!postsData || !usuariosData) {
            return res.status(500).json({ message: "Erro ao carregar dados de posts ou usuários" });
        }

        const post = postsData.find(p => p.id === parseInt(postId));
        const commenter = usuariosData.find(u => u.id === commenterId);

        if (!post || !commenter) {
            return res.status(404).json({ message: "Post ou usuário não encontrado" });
        }

        const newComment = {
            id: Date.now(),
            commenterId,
            texto: text,
            data: new Date().toISOString().split('T')[0],
            autor: {
                nome: commenter.nome,
                foto: commenter.foto
            }
        };

        post.comentarios.push(newComment);
        writeJSON(postsFilePath, postsData);

        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({
            message: "Erro ao adicionar comentário",
            error: error.message
        });
    }
};

export const getComments = async (req, res) => {
    try {
        await delay(100);

        const { postId } = req.params;
        const postsData = readJSON(postsFilePath);

        if (!postsData) {
            return res.status(500).json({ message: "Erro ao carregar dados de posts" });
        }

        const post = postsData.find(p => p.id === parseInt(postId));

        if (!post) {
            return res.status(404).json({ message: "Post não encontrado" });
        }

        res.status(200).json(post.comentarios || []);
    } catch (error) {
        res.status(500).json({
            message: "Erro ao buscar comentários",
            error: error.message
        });
    }
};