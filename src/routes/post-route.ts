import express from 'express';
import {
    createPostController,
    deletePostController,
    findAllPostsController,
    findPostByIdController,
    updatePostController,
} from '../controllers/post-controller';

const postRouter = express.Router();

postRouter.get('/', findAllPostsController);

postRouter.get('/search/:id', findPostByIdController);

postRouter.post('/', createPostController);

postRouter.put('/:id', updatePostController);

postRouter.delete('/:id', deletePostController);

export { postRouter };
