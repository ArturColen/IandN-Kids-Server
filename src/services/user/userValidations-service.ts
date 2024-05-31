import { UserInterface } from '../../interfaces/user-interface';

export const validateUserData = (userData: UserInterface) => {
    if (!userData.name) {
        throw new Error('Favor preencher corretamente o nome do usuário.');
    } else if (typeof userData.name !== 'string') {
        throw new Error('O nome do usuário deve ser uma string válida.');
    } else if (userData.name.trim().length < 10) {
        throw new Error('O nome do usuário deve ter pelo menos 10 caracteres.');
    }

    if (!userData.phone) {
        throw new Error(
            'Favor preencher corretamente o número de telefone do usuário.'
        );
    } else if (typeof userData.phone !== 'string') {
        throw new Error('O número do usuário deve ser uma string válida.');
    } else if (!/^\(\d{2}\) \d{5}-\d{4}$/.test(userData.phone)) {
        throw new Error(
            'O número de telefone deve estar no formato (xx) xxxxx-xxxx.'
        );
    }

    if (!userData.email) {
        throw new Error(
            'Favor preencher corretamente o endereço de e-mail do usuário.'
        );
    } else if (typeof userData.email !== 'string') {
        throw new Error(
            'O endereço de e-mail do usuário deve ser uma string válida.'
        );
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
        throw new Error(
            'O endereço de e-mail deve estar em um formato válido.'
        );
    }

    if (!userData.password) {
        throw new Error('Favor preencher corretamente a senha do usuário.');
    } else if (typeof userData.password !== 'string') {
        throw new Error('A senha do usuário deve ser uma string válida.');
    } else if (userData.password.trim().length < 8) {
        throw new Error('A senha do usuário deve ter pelo menos 8 caracteres.');
    }
};
