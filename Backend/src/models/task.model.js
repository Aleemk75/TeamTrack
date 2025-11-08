import mongoose from "mongoose";
const Schema = mongoose.Schema;


const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed'],
        default: 'pending'
    },
    dueDate: Date,

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
},
    { timestamps: true });

const Task = new mongoose.model("Task", taskSchema);

export default Task;