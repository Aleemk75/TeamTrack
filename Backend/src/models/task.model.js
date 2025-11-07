import mongoose from "mongoose";
const Schema = mongoose.Schema;


const taskSchema = new Schema({
    title: {
        String,
        required: true,
    },
    description: {
        String,
    },
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed'],
        default: 'pending'
    },
    dueDate: Date,
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true, // which user is responsible
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},
    { timestamps: true });

const Task = new mongoose.model("Task", taskSchema);

export default Task;