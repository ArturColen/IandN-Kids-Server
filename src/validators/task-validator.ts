import { z } from 'zod';

export const taskSchema = z.object({
    title: z
        .string()
        .min(5, 'O título da tarefa deve ter pelo menos 5 caracteres.'),
    weekDay: z
        .string()
        .min(6, 'O dia da semana deve ter pelo menos 6 caracteres.'),
    time: z
        .string()
        .regex(/^\d{2}:\d{2}$/, 'O horário deve estar no formato xx:xx.'),
});

export const validateTaskData = (taskData: any) => {
    const result = taskSchema.safeParse(taskData);

    if (!result.success) {
        const errors = result.error.errors
            .map((error) => error.message)
            .join(', ');

        throw new Error(errors);
    }
};
