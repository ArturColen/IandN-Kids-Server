import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    weekDay: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
});

export const Task = mongoose.model('Task', TaskSchema);
