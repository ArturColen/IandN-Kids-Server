import { FastifyRequest, FastifyReply } from 'fastify';
import { UserInterface } from '../interfaces/user-interface';
import {
    createUserService,
    deleteUserService,
    findAllUsersService,
    findUserByIdService,
    updateUserService,
} from '../services/user/user-service';
import { validateUserData } from '../services/user/userValidations-service';
import { userParamsSchema } from '../utils/parameterValidation';

export const findAllUsersController = async (
    req: FastifyRequest,
    reply: FastifyReply
) => {
    try {
        const users = await findAllUsersService();

        reply.status(200).send({
            Users: users,
        });
    } catch (error) {
        reply.status(404).send({
            message: (error as Error).message,
        });
    }
};

export const findUserByIdController = async (
    req: FastifyRequest,
    reply: FastifyReply
) => {
    try {
        const { userId } = userParamsSchema.parse(req.params);

        if (!userId) {
            throw new Error('O ID não foi fornecido na consulta.');
        }

        const user = await findUserByIdService(userId);

        reply.status(200).send({
            User: user,
        });
    } catch (error) {
        if (
            error instanceof Error &&
            error.message.includes('Falha na conversão para ObjectId.')
        ) {
            reply.status(400).send({
                message:
                    'O ID fornecido não é válido para exibição do usuário.',
            });
        } else {
            reply.status(500).send({
                message: (error as Error).message,
            });
        }
    }
};

export const createUserController = async (
    req: FastifyRequest,
    reply: FastifyReply
) => {
    try {
        const userData = req.body as UserInterface;

        validateUserData(userData);

        const createdUser = await createUserService(userData);

        reply.status(201).send({
            message: 'Usuário criado com sucesso.',
            User: createdUser,
        });
    } catch (error) {
        reply.status(500).send({
            message: (error as Error).message,
        });
    }
};

export const updateUserController = async (
    req: FastifyRequest,
    reply: FastifyReply
) => {
    try {
        const { userId } = userParamsSchema.parse(req.params);
        const userData = req.body as UserInterface;

        if (!userId) {
            throw new Error('O parâmetro ID não foi fornecido na consulta.');
        }

        validateUserData(userData);

        const updatedUser = await updateUserService(userId, userData);

        reply.status(200).send({
            message: 'Dados atualizados com sucesso.',
            User: updatedUser,
        });
    } catch (error) {
        if (
            error instanceof Error &&
            error.message.includes('Falha na conversão para ObjectId.')
        ) {
            reply.status(400).send({
                message:
                    'O ID fornecido não é válido para atualização do usuário.',
            });
        } else {
            reply.status(500).send({
                message: (error as Error).message,
            });
        }
    }
};

export const deleteUserController = async (
    req: FastifyRequest,
    reply: FastifyReply
) => {
    try {
        const { userId } = userParamsSchema.parse(req.params);

        if (!userId) {
            throw new Error('O parâmetro ID não foi fornecido na consulta.');
        }

        await deleteUserService(userId);

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
                    'O ID fornecido não é válido para exclusão do usuário.',
            });
        } else {
            reply.status(500).send({
                message: (error as Error).message,
            });
        }
    }
};
