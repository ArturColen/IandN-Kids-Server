import { z } from 'zod';

export const contactSchema = z.object({
    username: z
        .string()
        .min(10, 'O nome do usuário deve ter pelo menos 10 caracteres.'),
    email: z
        .string()
        .email('O endereço de e-mail deve estar em um formato válido.'),
    message: z
        .string()
        .min(50, 'A mensagem do usuário deve ter pelo menos 50 caracteres.'),
});

export const validateContactData = (contactData: any) => {
    const result = contactSchema.safeParse(contactData);

    if (!result.success) {
        const errors = result.error.errors
            .map((error) => error.message)
            .join(', ');

        throw new Error(errors);
    }
};
