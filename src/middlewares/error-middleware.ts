import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

export const errorMiddleware = (app: FastifyInstance) => {
    app.setErrorHandler(
        (error, request: FastifyRequest, reply: FastifyReply) => {
            if (error instanceof SyntaxError && 'body' in error) {
                reply.status(400).send({
                    error: 'JSON parsing error. Please check your JSON format.',
                });
            } else {
                app.log.error(error);

                reply.status(500).send({
                    error: 'Internal Server Error',
                });
            }
        }
    );
};
