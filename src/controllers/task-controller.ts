import { FastifyRequest, FastifyReply } from 'fastify';
import { TaskInterface } from '../interfaces/task-interface';
import {
    createTaskService,
    deleteTaskService,
    findAllTasksService,
    findTaskByIdService,
    updateTaskService,
} from '../services/task/task-service';
import { taskParamsSchema } from '../utils/parameterValidation';
import { validateTaskData } from '../services/task/taskValidations-service';

export const findAllTasksController = async (
    req: FastifyRequest,
    reply: FastifyReply
) => {
    try {
        const tasks = await findAllTasksService();

        reply.status(200).send({
            Tasks: tasks,
        });
    } catch (error) {
        reply.status(404).send({
            message: (error as Error).message,
        });
    }
};

export const findTaskByIdController = async (
    req: FastifyRequest,
    reply: FastifyReply
) => {
    try {
        const { taskId } = taskParamsSchema.parse(req.params);

        if (!taskId) {
            throw new Error('O ID não foi fornecido na consulta.');
        }

        const task = await findTaskByIdService(taskId);

        reply.status(200).send({
            Task: task,
        });
    } catch (error) {
        if (
            error instanceof Error &&
            error.message.includes('Falha na conversão para ObjectId.')
        ) {
            reply.status(400).send({
                message: 'O ID fornecido não é válido para exibição da tarefa.',
            });
        } else {
            reply.status(500).send({
                message: (error as Error).message,
            });
        }
    }
};

export const createTaskController = async (
    req: FastifyRequest,
    reply: FastifyReply
) => {
    try {
        const taskData = req.body as TaskInterface;

        validateTaskData(taskData);

        const createdTask = await createTaskService(taskData);

        reply.status(201).send({
            message: 'Tarefa criada com sucesso.',
            Task: createdTask,
        });
    } catch (error) {
        reply.status(500).send({
            message: (error as Error).message,
        });
    }
};

export const updateTaskController = async (
    req: FastifyRequest,
    reply: FastifyReply
) => {
    try {
        const { taskId } = taskParamsSchema.parse(req.params);
        const taskData = req.body as TaskInterface;

        if (!taskId) {
            throw new Error('O parâmetro ID não foi fornecido na consulta.');
        }

        validateTaskData(taskData);

        const updatedTask = await updateTaskService(taskId, taskData);

        reply.status(200).send({
            message: 'Dados atualizados com sucesso.',
            Task: updatedTask,
        });
    } catch (error) {
        if (
            error instanceof Error &&
            error.message.includes('Falha na conversão para ObjectId.')
        ) {
            reply.status(400).send({
                message:
                    'O ID fornecido não é válido para atualização da tarefa.',
            });
        } else {
            reply.status(500).send({
                message: (error as Error).message,
            });
        }
    }
};

export const deleteTaskController = async (
    req: FastifyRequest,
    reply: FastifyReply
) => {
    try {
        const { taskId } = taskParamsSchema.parse(req.params);

        if (!taskId) {
            throw new Error('O parâmetro ID não foi fornecido na consulta.');
        }

        await deleteTaskService(taskId);

        reply.status(200).send({
            message: 'Exclusão feita com sucesso.',
        });
    } catch (error) {
        if (
            error instanceof Error &&
            error.message.includes('Falha na conversão para ObjectId.')
        ) {
            reply.status(400).send({
                message: 'O ID fornecido não é válido para exclusão da tarefa.',
            });
        } else {
            reply.status(500).send({
                message: (error as Error).message,
            });
        }
    }
};
