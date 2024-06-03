import { Request, Response } from 'express';
import { ContactInterface } from '../interfaces/contact-interface';
import {
    createContactService,
    deleteContactService,
    findAllContactsService,
    findContactByIdService,
    updateContactService,
} from '../services/contact/contact-service';
import { handleErrorResponse } from '../middlewares/response-middleware';

export const findAllContactsController = async (
    req: Request,
    res: Response
) => {
    try {
        const contacts = await findAllContactsService();

        res.status(200).json({
            Contacts: contacts,
        });
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

export const findContactByIdController = async (
    req: Request,
    res: Response
) => {
    try {
        const contactId = req.query.id as string;

        if (!contactId) {
            throw new Error('O ID não foi fornecido na consulta.');
        }

        const contact = await findContactByIdService(contactId);

        res.status(200).json({
            Contact: contact,
        });
    } catch (error) {
        handleErrorResponse(res, error, 'exibição do contato');
    }
};

export const createContactController = async (req: Request, res: Response) => {
    try {
        const contactData = req.body as ContactInterface;

        const createdContact = await createContactService(contactData);

        res.status(201).json({
            message: 'Contato criado com sucesso.',
            Contact: createdContact,
        });
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

export const updateContactController = async (req: Request, res: Response) => {
    try {
        const contactId = req.params.id as string;
        const contactData = req.body as ContactInterface;

        if (!contactId) {
            throw new Error('O parâmetro ID não foi fornecido na consulta.');
        }

        const updatedContact = await updateContactService(
            contactId,
            contactData
        );

        res.status(200).json({
            message: 'Dados atualizados com sucesso.',
            Contact: updatedContact,
        });
    } catch (error) {
        handleErrorResponse(res, error, 'atualização dos dados do contato');
    }
};

export const deleteContactController = async (req: Request, res: Response) => {
    try {
        const contactId = req.params.id as string;

        if (!contactId) {
            throw new Error('O parâmetro ID não foi fornecido na consulta.');
        }

        await deleteContactService(contactId);

        res.status(200).json({
            message: 'Exclusão feita com sucesso.',
        });
    } catch (error) {
        handleErrorResponse(res, error, 'exclusão do contato');
    }
};
