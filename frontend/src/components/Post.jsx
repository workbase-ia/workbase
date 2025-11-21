import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { ThumbsUp, MessageSquare, Share2, Send, MoreVertical } from 'lucide-react';

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
};

const Comment = ({ comment }) => {
    const commenter = comment.autor || { nome: "Usuário Desconhecido", foto: "./images/default.jpg" };
    console.log('Comentário por:', commenter.nome);

    return (
        <div className="flex gap-3 mt-4">
            <img
                src={commenter.foto || "./images/default.jpg"}
                alt={commenter.nome}
                className="w-8 h-8 rounded-full object-cover"
            />
            <div className="flex-1 bg-slate-100 dark:bg-slate-700 p-3 rounded-lg">
                <div className="flex justify-between items-start">
                    <p className="font-semibold text-sm text-slate-800 dark:text-white">{commenter.nome}</p>
                    <span className="text-xs text-slate-500 dark:text-slate-400">{formatDate(comment.data)}</span>
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300 mt-1">{comment.texto}</p>
            </div>
        </div>
    );
};

export default function Post({ post }) {
    const [showComments, setShowComments] = useState(false);
    const [commentText, setCommentText] = useState('');
    const { user, token } = useAuth();

    const [likesCount, setLikesCount] = useState(post.curtidasCount || 0);
    const [isLiked, setIsLiked] = useState(post.isLiked || false);
    const [comments, setComments] = useState(post.comentarios || []);

    // Buscar comentários do backend com autenticação
    const fetchComments = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/posts/${post.id}/comments`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error('Falha ao buscar comentários');
            }
            const data = await response.json();
            console.log('Comentários recebidos:', data);  // Aqui você vê os commenterId
            setComments(data);
        } catch (error) {
            console.error('Erro ao buscar comentários:', error);
        }
    };

    // Abrir/fechar área de comentários, e buscar comentários quando abrir
    const handleToggleComments = () => {
        setShowComments(prev => {
            const novoEstado = !prev;
            if (novoEstado) fetchComments();
            return novoEstado;
        });
    };

    const handleLike = async () => {
        if (!user) {
            alert('Você precisa estar logado para curtir um post.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:3001/api/posts/${post.id}/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Falha ao curtir/descurtir o post');
            }

            const data = await response.json();
            setLikesCount(data.curtidasCount);
            setIsLiked(data.isLiked);
        } catch (error) {
            console.error('Erro ao curtir:', error);
            alert(error.message);
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();

        if (commentText.trim() === '') return;

        if (!user) {
            alert('Você precisa estar logado para comentar.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:3001/api/posts/${post.id}/comment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ text: commentText.trim() }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Falha ao adicionar comentário');
            }

            setComments((prev) => [data, ...prev]);
            setCommentText('');
        } catch (error) {
            console.error('Erro ao comentar:', error);
            alert(error.message);
        }
    };

    const autor = post.autor || { nome: "Usuário Desconhecido", foto: "./images/default.jpg", cargo: "Cargo Desconhecido" };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 mb-6">
            {/* Cabeçalho */}
            <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-start">
                <div className="flex items-center gap-3">
                    <img
                        src={autor.foto}
                        alt={autor.nome}
                        className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
                    />
                    <div>
                        <h2 className="font-bold text-lg text-slate-900 dark:text-white hover:text-blue-600 cursor-pointer transition">
                            {autor.nome}
                        </h2>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{autor.cargo}</p>
                        <p className="text-xs text-slate-400 dark:text-slate-500">{formatDate(post.date)}</p>
                    </div>
                </div>
                <button className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white p-1 rounded-full transition">
                    <MoreVertical size={20} />
                </button>
            </div>

            {/* Conteúdo */}
            <div className="p-4">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">{post.title}</h3>
                <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">{post.content}</p>
            </div>

            {/* Estatísticas e botão de curtir juntos */}
            <div className="px-4 py-2 flex justify-between items-center text-sm text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-700">
                <button
                    onClick={handleLike}
                    className="flex items-center gap-1 text-slate-600 dark:text-slate-400 hover:text-blue-600 transition font-medium"
                >
                    <ThumbsUp size={16} className={isLiked ? "text-blue-600 fill-blue-600" : "text-slate-400"} />
                    <span>{likesCount} {likesCount === 1 ? 'curtida' : 'curtidas'}</span>
                </button>

                <span
                    className="hover:text-blue-600 cursor-pointer transition"
                    onClick={handleToggleComments}
                >
                    {comments.length} {comments.length === 1 ? 'comentário' : 'comentários'}
                </span>
            </div>

            {/* Ações */}
            <div className="flex border-t border-slate-100 dark:border-slate-700 divide-x divide-slate-100 dark:divide-slate-700">
                <button
                    onClick={handleLike}
                    className="flex-1 flex items-center justify-center gap-2 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-blue-600 transition font-medium"
                >
                    <ThumbsUp size={20} className={isLiked ? "text-blue-600 fill-blue-600" : ""} />
                    {isLiked ? 'Curtido' : 'Curtir'}
                </button>

                <button
                    onClick={handleToggleComments}
                    className="flex-1 flex items-center justify-center gap-2 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-blue-600 transition font-medium"
                >
                    <MessageSquare size={20} />
                    Comentar
                </button>

                <button className="flex-1 flex items-center justify-center gap-2 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-blue-600 transition font-medium">
                    <Share2 size={20} />
                    Compartilhar
                </button>
            </div>

            {/* Comentários */}
            {showComments && (
                <div className="p-4 border-t border-slate-100 dark:border-slate-700">
                    {/* Formulário */}
                    <form onSubmit={handleCommentSubmit} className="flex gap-3 mb-4">
                        <img
                            src={user?.foto || "./images/default.jpg"}
                            alt={user?.nome || "Seu Perfil"}
                            className="w-10 h-10 rounded-full object-cover"
                        />

                        <div className="flex-1 relative">
                            <input
                                type="text"
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                placeholder="Adicione um comentário..."
                                className="w-full p-3 pr-12 border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-full focus:ring-blue-500 focus:border-blue-500 transition"
                            />

                            <button
                                type="submit"
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-blue-600 hover:text-blue-800 disabled:text-slate-400 transition"
                                disabled={commentText.trim() === ''}
                            >
                                <Send size={20} />
                            </button>
                        </div>
                    </form>

                    {/* Lista de comentários */}
                    <div className="max-h-80 overflow-y-auto">
                        {comments.length > 0 ? (
                            comments.map((comment, index) => (
                                <Comment key={index} comment={comment} />
                            ))
                        ) : (
                            <p className="text-center text-slate-500 dark:text-slate-400 mt-4">
                                Seja o primeiro a comentar!
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}