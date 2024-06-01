import { FastifyRequest, FastifyReply } from 'fastify';
import { ContactInterface } from '../interfaces/contact-interface';
import {
    createContactService,
    deleteContactService,
    findAllContactsService,
    findContactByIdService,
    updateContactService,
} from '../services/contact/contact-service';
import { contactParamsSchema } from '../utils/parameterValidation';
import { validateContactData } from '../services/contact/contactValidations-service';

export const findAllContactsController = async (
    req: FastifyRequest,
    reply: FastifyReply
) => {
    try {
        const contacts = await findAllContactsService();

        reply.status(200).send({
            Contacts: contacts,
        });
    } catch (error) {
        reply.status(404).send({
            message: (error as Error).message,
        });
    }
};

export const findContactByIdController = async (
    req: FastifyRequest,
    reply: FastifyReply
) => {
    try {
        const { contactId } = contactParamsSchema.parse(req.params);

        if (!contactId) {
            throw new Error('O ID não foi fornecido na consulta.');
        }

        const contact = await findContactByIdService(contactId);

        reply.status(200).send({
            Contact: contact,
        });
    } catch (error) {
        if (
            error instanceof Error &&
            error.message.includes('Falha na conversão para ObjectId.')
        ) {
            reply.status(400).send({
                message:
                    'O ID fornecido não é válido para exibição do contato.',
            });
        } else {
            reply.status(500).send({
                message: (error as Error).message,
            });
        }
    }
};

export const createContactController = async (
    req: FastifyRequest,
    reply: FastifyReply
) => {
    try {
        const contactData = req.body as ContactInterface;

        validateContactData(contactData);

        const createdContact = await createContactService(contactData);

        reply.status(201).send({
            message: 'Contato criado com sucesso.',
            Contato: createdContact,
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
        const { contactId } = contactParamsSchema.parse(req.params);
        const contactData = req.body as ContactInterface;

        if (!contactId) {
            throw new Error('O parâmetro ID não foi fornecido na consulta.');
        }

        validateContactData(contactData);

        const updatedContact = await updateContactService(
            contactId,
            contactData
        );

        reply.status(200).send({
            message: 'Dados atualizados com sucesso.',
            Contact: updatedContact,
        });
    } catch (error) {
        if (
            error instanceof Error &&
            error.message.includes('Falha na conversão para ObjectId.')
        ) {
            reply.status(400).send({
                message:
                    'O ID fornecido não é válido para atualização do contato.',
            });
        } else {
            reply.status(500).send({
                message: (error as Error).message,
            });
        }
    }
};

export const deleteContactController = async (
    req: FastifyRequest,
    reply: FastifyReply
) => {
    try {
        const { contactId } = contactParamsSchema.parse(req.params);

        if (!contactId) {
            throw new Error('O parâmetro ID não foi fornecido na consulta.');
        }

        await deleteContactService(contactId);

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
                    'O ID fornecido não é válido para exclusão do contato.',
            });
        } else {
            reply.status(500).send({
                message: (error as Error).message,
            });
        }
    }
};
