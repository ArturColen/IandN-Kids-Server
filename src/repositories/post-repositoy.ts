import mongoose from 'mongoose';
import { PostInterface } from '../interfaces/post-interface';
import { Post } from '../models/post';

export const findAllPostsRepository = () => Post.find();

export const findPostByIdRepository = (postId: string) => Post.findById(postId);

export const createPostRepository = ({
    title,
    author,
    content,
    imageLink,
}: PostInterface) =>
    Post.create({
        title,
        author,
        content,
        imageLink,
    });