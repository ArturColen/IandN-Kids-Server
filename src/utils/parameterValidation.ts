import { z } from 'zod';
import { ObjectId } from 'mongodb';

const objectIdSchema = z.string().refine((val) => ObjectId.isValid(val), {
    message: 'Invalid ObjectId',
});

export const userParamsSchema = z.object({
    userId: objectIdSchema,
});

export const postParamsSchema = z.object({
    postId: objectIdSchema,
});

export const taskParamsSchema = z.object({
    taskId: objectIdSchema,
});

export const contactParamsSchema = z.object({
    contactId: objectIdSchema,
});
