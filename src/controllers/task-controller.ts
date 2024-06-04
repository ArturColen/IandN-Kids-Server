import { Request, Response } from 'express';
import { TaskInterface } from '../interfaces/task-interface';
import {
    createTaskService,
    deleteTaskService,
    findAllTasksService,
    findTaskByIdService,
    updateTaskService,
} from '../services/task-service';
import { validateTaskData } from '../validators/task-validator';
import { handleErrorResponse } from '../middlewares/response-middleware';

export const findAllTasksController = async (req: Request, res: Response) => {
    try {
        const tasks = await findAllTasksService();

        res.status(200).json({
            Tasks: tasks,
        });
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

export const findTaskByIdController = async (req: Request, res: Response) => {
    try {
        const taskId = req.params.id as string;

        if (!taskId) {
            throw new Error('O ID não foi fornecido na consulta.');
        }

        const task = await findTaskByIdService(taskId);

        res.status(200).json({
            Task: task,
        });
    } catch (error) {
        handleErrorResponse(res, error, 'exibição da tarefa');
    }
};

export const createTaskController = async (req: Request, res: Response) => {
    try {
        const taskData = req.body as TaskInterface;

        validateTaskData(taskData);

        const createdTask = await createTaskService(taskData);

        res.status(201).json({
            message: 'Tarefa criada com sucesso.',
            Task: createdTask,
        });
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

export const updateTaskController = async (req: Request, res: Response) => {
    try {
        const taskId = req.params.id as string;
        const taskData = req.body as TaskInterface;

        if (!taskId) {
            throw new Error('O parâmetro ID não foi fornecido na consulta.');
        }

        validateTaskData(taskData);

        const updatedTask = await updateTaskService(taskId, taskData);

        res.status(200).json({
            message: 'Dados atualizados com sucesso.',
            Task: updatedTask,
        });
    } catch (error) {
        handleErrorResponse(res, error, 'atualização dos dados da tarefa');
    }
};

export const deleteTaskController = async (req: Request, res: Response) => {
    try {
        const taskId = req.params.id as string;

        if (!taskId) {
            throw new Error('O parâmetro ID não foi fornecido na consulta.');
        }

        await deleteTaskService(taskId);

        res.status(200).json({
            message: 'Exclusão feita com sucesso.',
        });
    } catch (error) {
        handleErrorResponse(res, error, 'exclusão da tarefa');
    }
};
