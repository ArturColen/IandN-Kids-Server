import { TaskInterface } from '../../interfaces/task-interface';
import {
    createTaskRepository,
    deleteTaskRepository,
    findAllTasksRepository,
    findTaskByIdRepository,
    updateTaskRepository,
} from '../../repositories/task-repository';
import { validateTaskData } from './taskValidations-service';

export const findAllTasksService = async () => {
    try {
        const tasks = await findAllTasksRepository();
        return tasks;
    } catch (error) {
        console.error(error);
        throw new Error('Erro ao buscar todas as tarefas.');
    }
};

export const findTaskByIdService = async (idTask: string) => {
    try {
        if (!idTask) {
            throw new Error('ID da tarefa não informado.');
        }

        const task = await findTaskByIdRepository(idTask);

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
        validateTaskData(taskData);

        const createdTask = await createTaskRepository(taskData);

        return createdTask;
    } catch (error) {
        console.error(error);
        throw new Error('Erro ao criar tarefa.');
    }
};

export const updateTaskService = async (
    idTask: string,
    taskData: Partial<TaskInterface>
) => {
    try {
        validateTaskData(taskData);

        const updatedTask = await updateTaskRepository(idTask, taskData);

        if (!updatedTask) {
            throw new Error('Tarefa não encontrada.');
        }

        return updatedTask;
    } catch (error) {
        console.error(error);
        throw new Error('Erro ao atualizar a tarefa.');
    }
};

export const deleteTaskService = async (idTask: string) => {
    try {
        const deletedTask = await deleteTaskRepository(idTask);

        if (!deletedTask) {
            throw new Error('Tarefa não encontrada.');
        }

        return deletedTask;
    } catch (error) {
        console.error(error);
        throw new Error('Erro ao excluir tarefa.');
    }
};
