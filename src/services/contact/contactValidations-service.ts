import { ContactInterface } from '../../interfaces/contact-interface';

export const validateContactData = (contactData: ContactInterface) => {
    if (!contactData.username) {
        throw new Error('Favor preencher corretamente o nome do usuário.');
    }
    else if (typeof contactData.username !== 'string') {
        throw new Error('O nome do usuário deve ser uma string válida.');
    }
    else if (contactData.username.trim().length < 10) {
        throw new Error('O nome do usuário deve ter pelo menos 10 caracteres.');
    }

    if (!contactData.email) {
        throw new Error('Favor preencher corretamente o endereço de e-mail do usuário.');
    }
    else if (typeof contactData.email !== 'string') {
        throw new Error('O endereço de e-mail do usuário deve ser uma string válida.');
    }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactData.email)) {
        throw new Error('O endereço de e-mail deve estar em um formato válido.');
    }

    if (!contactData.message) {
        throw new Error('Favor preencher corretamente a mensagem do usuário.');
    }
    else if (contactData.message !== 'string') {
        throw new Error('A mensagem do usuário deve ser uma string válida.');
    }
    else if (contactData.message.trim().length < 50) {
        throw new Error('A mensagem do usuário deve ter pelo menos 50 caracteres.');
    }
}