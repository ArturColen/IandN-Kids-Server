import { z } from 'zod';

export const userSchema = z.object({
    name: z
        .string()
        .min(10, 'O nome do usuário deve ter pelo menos 10 caracteres.'),
    phone: z
        .string()
        .regex(
            /^\(\d{2}\) \d{5}-\d{4}$/,
            'O número de telefone deve estar no formato (xx) xxxxx-xxxx.'
        ),
    email: z
        .string()
        .email('O endereço de e-mail deve estar em um formato válido.'),
    password: z
        .string()
        .min(8, 'A senha do usuário deve ter pelo menos 8 caracteres.'),
});

export const validateUserData = (userData: any) => {
    const result = userSchema.safeParse(userData);

    if (!result.success) {
        const errors = result.error.errors
            .map((error) => error.message)
            .join(', ');

        throw new Error(errors);
    }
};
