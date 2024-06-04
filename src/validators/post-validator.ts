import { z } from 'zod';

export const postSchema = z.object({
    title: z
        .string()
        .min(5, 'O título da postagem deve ter pelo menos 5 caracteres.'),
    author: z
        .string()
        .min(
            10,
            'O nome do autor da postagem deve ter pelo menos 10 caracteres.'
        ),
    content: z
        .string()
        .min(100, 'O conteúdo da postagem deve ter pelo menos 100 caracteres.'),
    imageLink: z
        .string()
        .regex(
            /\.(jpg|jpeg|png|gif|bmp|webp)$/i,
            'O link da imagem da postagem deve ser uma URL válida de imagem.'
        ),
});

export const validatePostData = (postData: any) => {
    const result = postSchema.safeParse(postData);

    if (!result.success) {
        const errors = result.error.errors
            .map((error) => error.message)
            .join(', ');

        throw new Error(errors);
    }
};
