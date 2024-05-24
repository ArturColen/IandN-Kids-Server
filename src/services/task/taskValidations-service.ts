import { TaskInterface } from '../../interfaces/task-interface';

export const validateTaskData = (taskData: TaskInterface) => {
    if (!taskData.title) {
        throw new Error('Favor preencher corretamente o título da tarefa.');
    }
    else if (typeof taskData.title !== 'string') {
        throw new Error('O título da tarefa deve ser uma string válida.');
    }
    else if (taskData.title.trim().length < 5) {
        throw new Error('O título da tarefa deve ter pelo menos 5 caracteres.');
    }

    if (!taskData.weekDay) {
        throw new Error('Favor preencher corretamente o dia da semana.');
    }
    else if (typeof taskData.weekDay !== 'string') {
        throw new Error('O dia da semana deve ser uma string válida.');
    }
    else if (taskData.weekDay.trim().length < 6) {
        throw new Error('O dia da semana deve ter pelo menos 6 caracteres.');
    }

    if (!taskData.time) {
        throw new Error('Favor preencher corretamente o horário.');
    }
    else if (taskData.time !== 'string') {
        throw new Error('O horário deve ser uma string válida.');
    }
    else if (!/^\d{2}:\d{2}$/.test(taskData.time)) {
        throw new Error('O horário deve estar no formato xx:xx.');
    }
}