import { ContactInterface } from '../../interfaces/contact-interface';
import {
    createContactRepository,
    deleteContactRepository,
    findAllContactsRepository,
    findContactByIdRepository,
    updateContactRepository,
} from '../../repositories/contact-repository';
import { validateContactData } from './contactValidations-service';

export const findAllContactsService = async () => {
    try {
        const contacts = await findAllContactsRepository();
        return contacts;
    } catch (error) {
        console.error(error);
        throw new Error('Erro ao buscar todos os contatos.');
    }
};

export const findContactByIdService = async (contactId: string) => {
    try {
        if (!contactId) {
            throw new Error('ID do contato não informado.');
        }

        const contact = await findContactByIdRepository(contactId);

        if (!contact) {
            throw new Error('Contato não encontrado.');
        }

        return contact;
    } catch (error) {
        console.error(error);
        throw new Error('Erro ao buscar contato por ID.');
    }
};

export const createContactService = async (contactData: ContactInterface) => {
    try {
        validateContactData(contactData);

        const createdContact = await createContactRepository(contactData);

        return createdContact;
    } catch (error) {
        console.error(error);
        throw new Error('Erro ao criar contato.');
    }
};

export const updateContactService = async (
    contactId: string,
    contactData: Partial<ContactInterface>
) => {
    try {
        validateContactData(contactData);

        const updatedContact = await updateContactRepository(
            contactId,
            contactData
        );

        if (!updatedContact) {
            throw new Error('Contato não encontrado.');
        }

        return updatedContact;
    } catch (error) {
        console.error(error);
        throw new Error('Erro ao atualizar dados do contato.');
    }
};

export const deleteContactService = async (contactId: string) => {
    try {
        const deletedContact = await deleteContactRepository(contactId);

        if (!deletedContact) {
            throw new Error('Contato não encontrado.');
        }

        return deletedContact;
    } catch (error) {
        console.error(error);
        throw new Error('Erro ao excluir contato.');
    }
};
