import { FastifyRequest, FastifyReply } from 'fastify';

export const indexController = async (
    req: FastifyRequest,
    reply: FastifyReply
) => {
    try {
        const projectTitle = 'I&N Kids';
        const projectDescription =
            'Project developed with the goal of serving as the back-end for the I&N Kids website, a platform designed to reduce childrens screen time by providing engaging and playful content and activities.';
        const developer = 'Artur Bomtempo';
        const version = '1.0.0';

        reply.status(200).send({
            projectTitle: projectTitle,
            projectDescription: projectDescription,
            developer: developer,
            version: version,
        });
    } catch (error) {
        reply.status(500).send({
            message: (error as Error).message,
        });
    }
};
