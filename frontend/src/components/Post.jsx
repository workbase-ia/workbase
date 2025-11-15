import React, { useState } from 'react';
import { ThumbsUp, MessageSquare, Share2, Send, MoreVertical, Heart } from 'lucide-react';

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
};


const Comment = ({ comment }) => {
    // Simula a busca do autor do comentário (em um cenário real, isso viria da API)
    const commenter = comment.autor || { nome: "Usuário Desconhecido", foto: "./images/default.jpg" };

    return (
        <div className="flex gap-3 mt-4">
            <img
                src={commenter.foto}
                alt={commenter.nome}
                className="w-8 h-8 rounded-full object-cover"
            />
            <div className="flex-1 bg-slate-100 p-3 rounded-lg">
                <div className="flex justify-between items-start">
                    <p className="font-semibold text-sm text-slate-800">{commenter.nome}</p>
                    <span className="text-xs text-slate-500">{formatDate(comment.data)}</span>
                </div>
                <p className="text-sm text-slate-700 mt-1">{comment.texto}</p>
            </div>
        </div>
    );
};

export default function Post({ post, onLike, onComment }) {
    const [showComments, setShowComments] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [likes, setLikes] = useState(post.curtidas);
    const [comments, setComments] = useState(post.comentarios || []);

    const handleLike = async () => {
        try {
            const response = await fetch(`/api/posts/${post.id}/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // O corpo da requisição pode ser vazio ou incluir um ID de usuário, dependendo da sua implementação de autenticação
            });

            if (!response.ok) {
                throw new Error('Falha ao curtir o post');
            }

            const data = await response.json();
            setLikes(data.curtidas);
        } catch (error) {
            console.error("Erro ao curtir:", error);
            // Opcional: mostrar uma mensagem de erro para o usuário
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (commentText.trim() === '') return;

        try {
            // Simula o ID do usuário logado
            const commenterId = 1; 
            
            const response = await fetch(`/api/posts/${post.id}/comment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    commenterId: commenterId,
                    text: commentText.trim()
                })
            });

            if (!response.ok) {
                throw new Error('Falha ao adicionar comentário');
            }

            const newComment = await response.json();
            
            setComments(prev => [newComment, ...prev]);
            setCommentText('');
        } catch (error) {
            console.error("Erro ao comentar:", error);
            // Opcional: mostrar uma mensagem de erro para o usuário
        }
    };

    const autor = post.autor || { nome: "Usuário Desconhecido", foto: "./images/default.jpg", cargo: "Cargo Desconhecido" };

    return (
        <div className="bg-white rounded-lg shadow-md border border-slate-200 mb-6">
            {/* Cabeçalho do Post */}
            <div className="p-4 border-b border-slate-100 flex justify-between items-start">
                <div className="flex items-center gap-3">
                    <img
                        src={autor.foto}
                        alt={autor.nome}
                        className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
                    />
                    <div>
                        <h2 className="font-bold text-lg text-slate-900 hover:text-blue-600 cursor-pointer transition">
                            {autor.nome}
                        </h2>
                        <p className="text-sm text-slate-600">{autor.cargo}</p>
                        <p className="text-xs text-slate-400">{formatDate(post.date)}</p>
                    </div>
                </div>
                <button className="text-slate-500 hover:text-slate-800 p-1 rounded-full transition">
                    <MoreVertical size={20} />
                </button>
            </div>

            {/* Conteúdo do Post */}
            <div className="p-4">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{post.title}</h3>
                {/* O conteúdo do post pode ser longo, então usamos 'whitespace-pre-wrap' para manter quebras de linha */}
                <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">{post.content}</p>
            </div>

            {/* Estatísticas */}
            <div className="px-4 py-2 flex justify-between items-center text-sm text-slate-600 border-t border-slate-100">
                <div className="flex items-center gap-1">
                    <Heart size={16} className="text-red-500 fill-red-500" />
                    <span>{likes} curtidas</span>
                </div>
                <span className="hover:text-blue-600 cursor-pointer transition" onClick={() => setShowComments(true)}>
                    {comments.length} comentários
                </span>
            </div>

            {/* Ações */}
            <div className="flex border-t border-slate-100 divide-x divide-slate-100">
                <button
                    onClick={handleLike}
                    className="flex-1 flex items-center justify-center gap-2 py-3 text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition font-medium"
                >
                    <ThumbsUp size={20} />
                    Curtir
                </button>
                <button
                    onClick={() => setShowComments(!showComments)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition font-medium"
                >
                    <MessageSquare size={20} />
                    Comentar
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-3 text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition font-medium">
                    <Share2 size={20} />
                    Compartilhar
                </button>
            </div>

            {/* Seção de Comentários */}
            {showComments && (
                <div className="p-4 border-t border-slate-100">
                    {/* Formulário de Comentário */}
                    <form onSubmit={handleCommentSubmit} className="flex gap-3 mb-4">
                        <img
                            src="./images/foto1.jpg" // Simula a foto do usuário logado
                            alt="Seu Perfil"
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                placeholder="Adicione um comentário..."
                                className="w-full p-3 pr-12 border border-slate-300 rounded-full focus:ring-blue-500 focus:border-blue-500 transition"
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

                    {/* Lista de Comentários */}
                    <div className="max-h-80 overflow-y-auto">
                        {comments.length > 0 ? (
                            comments.map((comment, index) => (
                                <Comment key={index} comment={comment} />
                            ))
                        ) : (
                            <p className="text-center text-slate-500 mt-4">Seja o primeiro a comentar!</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
