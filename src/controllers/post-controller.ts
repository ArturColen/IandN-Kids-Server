import { FastifyRequest, FastifyReply } from 'fastify';
import { PostInterface } from '../interfaces/post-interface';
import {
    createPostService,
    deletePostService,
    findAllPostsService,
    findPostByIdService,
    updatePostService,
} from '../services/post/post-service';
import { postParamsSchema } from '../utils/parameterValidation';
import { validatePostData } from '../services/post/postValidations-service';

export const findAllPostsController = async (
    req: FastifyRequest,
    reply: FastifyReply
) => {
    try {
        const posts = await findAllPostsService();

        reply.status(200).send({
            Posts: posts,
        });
    } catch (error) {
        reply.status(404).send({
            message: (error as Error).message,
        });
    }
};

export const findPostByIdController = async (
    req: FastifyRequest,
    reply: FastifyReply
) => {
    try {
        const { postId } = postParamsSchema.parse(req.params);

        if (!postId) {
            throw new Error('O ID não foi fornecido na consulta.');
        }

        const post = await findPostByIdService(postId);

        reply.status(200).send({
            Post: post,
        });
    } catch (error) {
        if (
            error instanceof Error &&
            error.message.includes('Falha na conversão para ObjectId.')
        ) {
            reply.status(400).send({
                message:
                    'O ID fornecido não é válido para exibição da postagem.',
            });
        } else {
            reply.status(500).send({
                message: (error as Error).message,
            });
        }
    }
};

export const createPostController = async (
    req: FastifyRequest,
    reply: FastifyReply
) => {
    try {
        const postData = req.body as PostInterface;

        validatePostData(postData);

        const createdPost = await createPostService(postData);

        reply.status(201).send({
            message: 'Postagem criada com sucesso.',
            Post: createdPost,
        });
    } catch (error) {
        reply.status(500).send({
            message: (error as Error).message,
        });
    }
};

export const updatePostController = async (
    req: FastifyRequest,
    reply: FastifyReply
) => {
    try {
        const { postId } = postParamsSchema.parse(req.params);
        const postData = req.body as PostInterface;

        if (!postId) {
            throw new Error('O parâmetro ID não foi fornecido na consulta.');
        }

        validatePostData(postData);

        const updatedPost = await updatePostService(postId, postData);

        reply.status(200).send({
            message: 'Dados atualizados com sucesso.',
            Post: updatedPost,
        });
    } catch (error) {
        if (
            error instanceof Error &&
            error.message.includes('Falha na conversão para ObjectId.')
        ) {
            reply.status(400).send({
                message:
                    'O ID fornecido não é válido para atualização da postagem.',
            });
        } else {
            reply.status(500).send({
                message: (error as Error).message,
            });
        }
    }
};

export const deletePostController = async (
    req: FastifyRequest,
    reply: FastifyReply
) => {
    try {
        const { postId } = postParamsSchema.parse(req.params);

        if (!postId) {
            throw new Error('O parâmetro ID não foi fornecido na consulta.');
        }

        await deletePostService(postId);

        reply.status(200).send({
            message: 'Exclusão feita com sucesso.',
        });
    } catch (error) {
        if (
            error instanceof Error &&
            error.message.includes('Falha na conversão para ObjectId.')
        ) {
            reply.status(400).send({
                message:
                    'O ID fornecido não é válido para exclusão da postagem.',
            });
        } else {
            reply.status(500).send({
                message: (error as Error).message,
            });
        }
    }
};
