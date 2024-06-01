import { PostInterface } from '../../interfaces/post-interface';
import {
    createPostRepository,
    deletePostRepository,
    findAllPostsRepository,
    findPostByIdRepository,
    updatePostRepository,
} from '../../repositories/post-repositoy';
import { validatePostData } from './postValidations-service';

export const findAllPostsService = async () => {
    try {
        const posts = await findAllPostsRepository();
        return posts;
    } catch (error) {
        console.error(error);
        throw new Error('Erro ao buscar todas as postagens.');
    }
};

export const findPostByIdService = async (idPost: string) => {
    try {
        if (!idPost) {
            throw new Error('ID da postagem não informado.');
        }

        const post = await findPostByIdRepository(idPost);

        if (!post) {
            throw new Error('Postagem não encontrada.');
        }

        return post;
    } catch (error) {
        console.error(error);
        throw new Error('Erro ao buscar postagem por ID.');
    }
};

export const createPostService = async (postData: PostInterface) => {
    try {
        validatePostData(postData);

        const createdPost = await createPostRepository(postData);

        return createdPost;
    } catch (error) {
        console.error(error);
        throw new Error('Erro ao criar postagem.');
    }
};

export const updatePostService = async (
    idPost: string,
    postData: Partial<PostInterface>
) => {
    try {
        validatePostData(postData);

        const updatedPost = await updatePostRepository(idPost, postData);

        if (!updatedPost) {
            throw new Error('Postagem não encontrada.');
        }

        return updatedPost;
    } catch (error) {
        console.error(error);
        throw new Error('Erro ao atualizar a postagem.');
    }
};

export const deletePostService = async (idPost: string) => {
    try {
        const deletedPost = await deletePostRepository(idPost);

        if (!deletedPost) {
            throw new Error('Postagem não encontrada.');
        }

        return deletedPost;
    } catch (error) {
        console.error(error);
        throw new Error('Erro ao excluir postagem.');
    }
};