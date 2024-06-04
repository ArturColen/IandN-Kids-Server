import { TaskInterface } from '../interfaces/task-interface';
import {
    createTaskRepository,
    deleteTaskRepository,
    findAllTasksRepository,
    findTaskByIdRepository,
    updateTaskRepository,
} from '../repositories/task-repository';

export const findAllTasksService = async () => {
    try {
        const tasks = await findAllTasksRepository();
        return tasks;
    } catch (error) {
        console.error(error);
        throw new Error('Erro ao buscar todas as tarefas.');
    }
};

export const findTaskByIdService = async (taskId: string) => {
    try {
        if (!taskId) {
            throw new Error('ID da tarefa não informado.');
        }

        const task = await findTaskByIdRepository(taskId);

        if (!task) {
            throw new Error('Tarefa não encontrada.');
        }

        return task;
    } catch (error) {
        console.error(error);
        throw new Error('Erro ao buscar tarefa por ID.');
    }
};

export const createTaskService = async (taskData: TaskInterface) => {
    try {
        const createdTask = await createTaskRepository(taskData);

        return createdTask;
    } catch (error) {
        console.error(error);
        throw new Error('Erro ao criar tarefa.');
    }
};

export const updateTaskService = async (
    taskId: string,
    taskData: Partial<TaskInterface>
) => {
    try {
        const updatedTask = await updateTaskRepository(taskId, taskData);

        if (!updatedTask) {
            throw new Error('Tarefa não encontrada.');
        }

        return updatedTask;
    } catch (error) {
        console.error(error);
        throw new Error('Erro ao atualizar dados da tarefa.');
    }
};

export const deleteTaskService = async (taskId: string) => {
    try {
        const deletedTask = await deleteTaskRepository(taskId);

        if (!deletedTask) {
            throw new Error('Tarefa não encontrada.');
        }

        return deletedTask;
    } catch (error) {
        console.error(error);
        throw new Error('Erro ao excluir tarefa.');
    }
};
