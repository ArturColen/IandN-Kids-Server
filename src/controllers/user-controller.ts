import { Request, Response } from 'express';
import { UserInterface } from '../interfaces/user-interface';
import {
    createUserService,
    deleteUserService,
    findAllUsersService,
    findUserByIdService,
    updateUserService,
} from '../services/user/user-service';
import { validateUserData } from '../services/user/userValidations-service';
import { handleErrorResponse } from '../middlewares/response-middleware';

export const findAllUsersController = async (req: Request, res: Response) => {
    try {
        const users = await findAllUsersService();

        res.status(200).json({
            Users: users,
        });
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

export const findUserByIdController = async (req: Request, res: Response) => {
    try {
        const userId = req.query.id as string;

        if (!userId) {
            throw new Error('O ID não foi fornecido na consulta.');
        }

        const user = await findUserByIdService(userId);

        res.status(200).json({
            User: user,
        });
    } catch (error) {
        handleErrorResponse(res, error, 'exibição do usuário');
    }
};

export const createUserController = async (req: Request, res: Response) => {
    try {
        const userData = req.body as UserInterface;

        validateUserData(userData);

        const createdUser = await createUserService(userData);

        res.status(201).json({
            message: 'Usuário criado com sucesso',
            User: createdUser,
        });
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

export const updateUserController = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id as string;
        const userData = req.body as UserInterface;

        if (!userId) {
            throw new Error('O parâmetro ID não foi fornecido na consulta.');
        }

        validateUserData(userData);

        const updatedUser = await updateUserService(userId, userData);

        res.status(200).json({
            message: 'Dados atualizados com sucesso.',
            User: updatedUser,
        });
    } catch (error) {
        handleErrorResponse(res, error, 'atualização dos dados do usuário.');
    }
};

export const deleteUserController = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id as string;

        if (!userId) {
            throw new Error('O parâmetro ID não foi fornecido na consulta.');
        }

        await deleteUserService(userId);

        res.status(200).json({
            message: 'Exclusão feita com sucesso!',
        });
    } catch (error) {
        handleErrorResponse(res, error, 'exclusão do usuário');
    }
};
