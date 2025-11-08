import Task from "../models/task.model.js";
import User from "../models/user.model.js";
import { isValidObjectId } from "mongoose";

// Get all tasks (admin only)
export const getAllTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find()
            .populate("createdBy", "name email");

        res.status(200).json({
            success: true,
            message: "All tasks fetched successfully",
            count: tasks.length,
            tasks,
        });
    } catch (error) {
        next(error);
    }
};


//  Delete any task
export const deleteTask = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            return res.status(400).json({ message: "Invalid Task ID" });
        }

        const task = await Task.findByIdAndDelete(id);

        if (!task) return res.status(404).json({ message: "Task not found" });

        res.status(200).json({ success: true, message: "Task deleted successfully" });
    } catch (error) {
        next(error);
    }
};
