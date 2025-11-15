import postsData from '../posts.json';
import usuariosData from '../usuarios.json';



export async function fetchPosts() {
    await delay(500); 

    const postsComAutor = postsData.map(post => {
        const autor = usuariosData.find(user => user.Id === post.autorId);
        return {
            ...post,
            autor: autor ? {
                Id: autor.Id,
                nome: autor.nome,
                foto: autor.foto,
                cargo: autor.cargo,
                localizacao: autor.localizacao
            } : { nome: "Usuário Desconhecido" }
        };
    });

    postsComAutor.sort((a, b) => new Date(b.date) - new Date(a.date));

    return postsComAutor;
}

export async function fetchUser(id) {
    await delay(300);
    const user = usuariosData.find(user => user.Id === id);
    return user || null;
}

export async function likePost(postId) {
    await delay(100);
    const post = postsData.find(p => p.id === postId);
    if (post) {
        post.curtidas += 1;
        return post.curtidas;
    }
    throw new Error("Post não encontrado");
}

export async function addComment(postId, commenterId, text) {
    await delay(200);
    const post = postsData.find(p => p.id === postId);
    const commenter = usuariosData.find(u => u.Id === commenterId);

    if (!post || !commenter) {
        throw new Error("Post ou usuário não encontrado");
    }

    const newComment = {
        id: Date.now(), 
        commenterId: commenterId,
        texto: text,
        data: new Date().toISOString().split('T')[0],
        autor: {
            nome: commenter.nome,
            foto: commenter.foto
        }
    };

    post.comentarios.push(newComment);
    return newComment;
}

export { postsData, usuariosData };
