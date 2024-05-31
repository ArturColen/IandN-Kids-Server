import Fastify from 'fastify';
import { FastifyInstance } from 'fastify/types/instance';
import cors from '@fastify/cors';

export const configureCORS = (app: FastifyInstance) => {
    app.register(cors, {
        origin: true,
        credentials: true,
    });
};
