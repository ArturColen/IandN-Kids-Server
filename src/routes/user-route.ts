import express from 'express';
import {
    createUserController,
    deleteUserController,
    findAllUsersController,
    findUserByIdController,
    updateUserController,
} from '../controllers/user-controller';

const userRouter = express.Router();

userRouter.get('/', findAllUsersController);

userRouter.get('/search', findUserByIdController);

userRouter.post('/', createUserController);

userRouter.put('/:id', updateUserController);

userRouter.delete('/:id', deleteUserController);

export { userRouter };
