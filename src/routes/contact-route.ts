import express from 'express';
import {
    createContactController,
    deleteContactController,
    findAllContactsController,
    findContactByIdController,
    updateContactController,
} from '../controllers/contact-controller';

const contactRouter = express.Router();

contactRouter.get('/', findAllContactsController);

contactRouter.get('/search/:id', findContactByIdController);

contactRouter.post('/', createContactController);

contactRouter.put('/:id', updateContactController);

contactRouter.delete('/:id', deleteContactController);

export { contactRouter };
