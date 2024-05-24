import { PostInterface } from '../../interfaces/post-interface';

export const validatePostData = (postData: PostInterface) => {
    if (!postData.title) {
        throw new Error('Favor preencher corretamente o título da postagem.');
    }
    else if (typeof postData.title !== 'string') {
        throw new Error('O título da postagem deve ser uma string válida.');
    }
    else if (postData.title.trim().length < 5) {
        throw new Error('O título da postagem deve ter pelo menos 5 caracteres.');
    }

    if (!postData.author) {
        throw new Error('Favor preencher corretamente o nome do autor da postagem.');
    }
    else if (typeof postData.author !== 'string') {
        throw new Error('O nome do autor da postagem deve ser uma string válida.');
    }
    else if (postData.author.trim().length < 10) {
        throw new Error('O nome do autor da postagem deve ter pelo menos 10 caracteres.');
    }

    if (!postData.content) {
        throw new Error('Favor preencher corretamente o conteúdo da postagem.');
    }
    else if (typeof postData.content !== 'string') {
        throw new Error('O conteúdo da postagem deve ser uma string válida.');
    }
    else if (postData.content.trim().length < 100) {
        throw new Error('O conteúdo da postagem deve ter pelo menos 100 caracteres.');
    }

    if (!postData.imageLink) {
        throw new Error('Favor preencher corretamente o link da imagem da postagem.');
    }
    else if (typeof postData.imageLink !== 'string') {
        throw new Error('O link da imagem da postagem deve ser uma string válida.');
    }
    else if (!/\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(postData.imageLink)) {
        throw new Error('O link da imagem da postagem deve ser uma URL válida de imagem.');
    }
}