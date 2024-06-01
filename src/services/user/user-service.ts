import { UserInterface } from '../../interfaces/user-interface';
import {
    createUserRepository,
    deleteUserRepository,
    findAllUsersRepository,
    findUserByIdRepository,
    updateUserRepository,
} from '../../repositories/user-repository';
import { validateUserData } from './userValidations-service';

export const findAllUsersService = async () => {
    try {
        const users = await findAllUsersRepository();
        return users;
    } catch (error) {
        console.error(error);
        throw new Error('Erro ao buscar todos os usuários.');
    }
};

export const findUserByIdService = async (idUser: string) => {
    try {
        if (!idUser) {
            throw new Error('ID do usuário não informado.');
        }

        const user = await findUserByIdRepository(idUser);

        if (!user) {
            throw new Error('Usuário não encontrado.');
        }

        return user;
    } catch (error) {
        console.error(error);
        throw new Error('Erro ao buscar usuário por ID.');
    }
};

export const createUserService = async (userData: UserInterface) => {
    try {
        validateUserData(userData);

        const createdUser = await createUserRepository(userData);

        return createdUser;
    } catch (error) {
        console.error(error);
        throw new Error('Erro ao criar usuário.');
    }
};

export const updateUserService = async (
    idUser: string,
    userData: Partial<UserInterface>
) => {
    try {
        validateUserData(userData);

        const updatedUser = await updateUserRepository(idUser, userData);

        if (!updatedUser) {
            throw new Error('Usuário não encontrado.');
        }

        return updatedUser;
    } catch (error) {
        console.error(error);
        throw new Error('Erro ao atualizar o usuário.');
    }
};

export const deleteUserService = async (idUser: string) => {
    try {
        const deletedUser = await deleteUserRepository(idUser);

        if (!deletedUser) {
            throw new Error('Usuário não encontrado.');
        }

        return deletedUser;
    } catch (error) {
        console.error(error);
        throw new Error('Erro ao excluir usuário.');
    }
};
