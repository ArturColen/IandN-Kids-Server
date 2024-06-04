import express from 'express';
import {
    createTaskController,
    deleteTaskController,
    findAllTasksController,
    findTaskByIdController,
    updateTaskController,
} from '../controllers/task-controller';

const taskRouter = express.Router();

taskRouter.get('/', findAllTasksController);

taskRouter.get('/search/:id', findTaskByIdController);

taskRouter.post('/', createTaskController);

taskRouter.put('/:id', updateTaskController);

taskRouter.delete('/:id', deleteTaskController);

export { taskRouter };
