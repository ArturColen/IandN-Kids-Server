import { Response } from 'express';

export const handleErrorResponse = (
    res: Response,
    error: unknown,
    context?: string
) => {
    const message =
        error instanceof Error ? error.message : 'Erro desconhecido.';

    const status = message.includes('Cast to ObjectId failed') ? 400 : 500;

    const errorMessage = context
        ? `O ID fornecido não é válido para ${context}.`
        : message;

    res.status(status).json({
        message: errorMessage,
    });
};
