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
            return res.status(500).json({ message: "Erro ao carregar posts ou usuários" });
        }

        const postsComAutor = postsData.map(post => {
            const autor = usuariosData.find(user => user.id === post.autorId);

            if (!post.curtidoPor) post.curtidoPor = [];
            if (!post.comentarios) post.comentarios = [];

            const curtidasCount = post.curtidoPor.length;
            const isLiked = req.user && post.curtidoPor.includes(parseInt(req.user.id));

            return {
                ...post,
                curtidasCount,
                isLiked,
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
        });

        postsComAutor.sort((a, b) => new Date(b.date) - new Date(a.date));

        res.status(200).json(postsComAutor);

    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar posts", error: error.message });
    }
};

export const likePost = async (req, res) => {
    try {
        await delay(100);

        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Não autorizado" });
        }

        const userId = parseInt(req.user.id);
        const { postId } = req.params;

        const postsData = readJSON(postsFilePath);
        const post = postsData.find(p => p.id === parseInt(postId));

        if (!post) {
            return res.status(404).json({ message: "Post não encontrado" });
        }

        if (!post.curtidoPor) post.curtidoPor = [];

        const isLiked = post.curtidoPor.includes(userId);

        if (isLiked) {
            post.curtidoPor = post.curtidoPor.filter(id => id !== userId);
        } else {
            post.curtidoPor.push(userId);
        }

        writeJSON(postsFilePath, postsData);

        res.status(200).json({
            curtidasCount: post.curtidoPor.length,
            isLiked: !isLiked
        });

    } catch (error) {
        res.status(500).json({ message: "Erro ao dar like", error: error.message });
    }
};

export const addComment = async (req, res) => {
    try {
        await delay(200);

        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Não autorizado" });
        }

        const commenterId = parseInt(req.user.id);
        const { postId } = req.params;
        const { text } = req.body;

        const postsData = readJSON(postsFilePath);
        const usuariosData = readJSON(usersFilePath);

        const post = postsData.find(p => p.id === parseInt(postId));
        const commenter = usuariosData.find(u => u.id === commenterId);

        if (!post || !commenter) {
            return res.status(404).json({ message: "Post ou usuário não encontrado" });
        }

        if (!post.comentarios) post.comentarios = [];

        const newComment = {
            id: Date.now(),
            commenterId,
            texto: text,
            data: new Date().toISOString().slice(0, 10)
        };

        post.comentarios.push(newComment);
        writeJSON(postsFilePath, postsData);

        res.status(201).json({
            ...newComment,
            autor: {
                nome: commenter.nome,
                foto: commenter.foto
            }
        });

    } catch (error) {
        res.status(500).json({ message: "Erro ao comentar", error: error.message });
    }
};

export const getComments = async (req, res) => {
    try {
        await delay(100);

        const { postId } = req.params;
        const postsData = readJSON(postsFilePath);
        const usuariosData = readJSON(usersFilePath);

        const post = postsData.find(p => p.id === parseInt(postId));

        if (!post) {
            return res.status(404).json({ message: "Post não encontrado" });
        }

        if (!post.comentarios) post.comentarios = [];

        const comentariosComAutor = post.comentarios.map(comment => {
            const autor = usuariosData.find(user => user.id === comment.commenterId);

            console.log(`Comentário ID: ${comment.id}, commenterId: ${comment.commenterId}`);
            if (autor) {
                console.log(`Autor encontrado: ${autor.nome} (ID: ${autor.id})`);
            } else {
                console.log(`Autor NÃO encontrado para commenterId: ${comment.commenterId}`);
            }

            return {
                ...comment,
                autor: autor ? {
                    id: autor.id,
                    nome: autor.nome,
                    foto: autor.foto,
                    cargo: autor.cargo,
                    localizacao: autor.localizacao
                } : {
                    nome: "Usuário Desconhecido",
                    foto: "./images/default.jpg"
                }
            };
        });


        res.status(200).json(comentariosComAutor);

    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar comentários", error: error.message });
    }
};

