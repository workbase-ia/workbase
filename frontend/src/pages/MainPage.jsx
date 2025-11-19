import React, { useState, useEffect } from 'react';
import Post from '../components/Post';
import { ProfileCardContainer } from '../components/ProfileCard'; 
import { Loader2 } from 'lucide-react';

export default function MainPage() {
    const [suggestedProfiles, setSuggestedProfiles] = useState([]);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadPosts = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/posts');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const fetchedPosts = await response.json();
                setPosts(fetchedPosts);
            } catch (err) {
                console.error("Erro ao carregar posts:", err);
                setError("Não foi possível carregar os posts. Tente novamente mais tarde.");
            } finally {
                setLoading(false);
            }
        };

        const loadSuggestedProfiles = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/usuarios/suggested-profiles');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const profiles = await response.json();
                setSuggestedProfiles(profiles);
            } catch (err) {
                console.error("Erro ao carregar perfis sugeridos:", err);
            }
        };

        loadPosts();
        loadSuggestedProfiles();
    }, []);

    const handleLike = (postId) => {
        console.log(`Curtir post ${postId}`);
    };

    const handleComment = (postId, comment) => {
        console.log(`Comentar no post ${postId}: ${comment}`);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-96">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                <p className="ml-3 text-lg text-slate-600 dark:text-slate-300">Carregando feed...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center p-8 bg-red-100 border border-red-400 text-red-700 rounded-lg max-w-lg mx-auto mt-10">
                <p className="font-bold">Erro de Carregamento</p>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto px-4">
	            <h1 className="text-3xl font-bold text-slate-800 mb-6">Feed Principal</h1>
	            <div className="space-y-6">
	                {posts.map((post, index) => (
	                    <React.Fragment key={post.id}>
	                        <Post
	                            post={post}
	                            onLike={handleLike}
	                            onComment={handleComment}
	                        />
	                        {(index + 1) % 4 === 0 && suggestedProfiles.length > 0 && (
	                            <ProfileCardContainer profiles={suggestedProfiles} />
	                        )}
	                    </React.Fragment>
	                ))}
	            </div>
            {posts.length === 0 && (
                <div className="text-center p-8 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 rounded-lg mt-10">
                    <p className="font-bold">Nenhum Post Encontrado</p>
                    <p>Parece que o feed está vazio.</p>
                </div>
            )}
        </div>
    );
}
