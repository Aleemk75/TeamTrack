import Task from "../models/task.model.js";
import { isValidObjectId } from "mongoose";
import { isValidBody, isValidString } from "../utils/validateObjID.js";

//  Create a new task
export async function createTask(req, res, next) {
    try {
        const { title, description, dueDate } = req.body;

        if (!isValidString(title)) {
            return res.status(400).json({ message: "Invalid title" });
        }
        if (!title || !dueDate) {
            return res.status(400).json({ message: "Title and due date are required" });
        }

        const task = await Task.create({
            title,
            description: description || "you have not provided any description",
            dueDate: new Date(dueDate),
            createdBy: req.user.userId, // Logged-in user
        });

        res.status(201).json({
            success: true,
            message: "Task created successfully",
            task,
        });
    } catch (error) {
        next(error);
    }
}



// Get all tasks for the logged-in user
export async function getUserTasks(req, res, next) {
    try {
        console.log(req.user, "in get user tasks");

        const tasks = await Task.find({ createdBy: req.user.userId }).sort({ dueDate: 1 }); // Sort by due date

        if (tasks.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No tasks found for this user",
                count: 0,
                tasks: [],
            });
        }
        res.status(200).json({
            success: true,
            count: tasks.length,
            tasks,
        });
    } catch (error) {
        next(error);
    }
}


//  Update a task (only if it belongs to the logged-in user)
export async function updateTask(req, res, next) {
    try {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            return res.status(400).json({ message: "Invalid Task ID" });
        }

        const task = await Task.findOne({ _id: id, createdBy: req.user.userId });

        if (!task) {
            return res.status(404).json({ message: "Task not found or not authorized" });
        }

        if (!isValidBody(req.body)) {
            return res.status(400).json({ message: "No fields to update provided" });
        }
        // Update allowed fields
        const { title, description, dueDate, status } = req.body;
        if (!isValidString(title)) {
            return res.status(400).json({ message: "Invalid title" });
        }

        if (status && !["pending", "in-progress", "completed"].includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }
        if (title) task.title = title;
        if (description) task.description = description;
        if (dueDate) task.dueDate = new Date(dueDate);
        if (status) task.status = status;

        await task.save();

        res.status(200).json({
            success: true,
            message: "Task updated successfully",
            task,
        });
    } catch (error) {
        next(error);
    }
}

//  Delete a task (only if it belongs to the logged-in user)
export async function deleteTask(req, res, next) {
    try {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            return res.status(400).json({ message: "Invalid Task ID" });
        }

        const task = await Task.findOneAndDelete({ _id: id, createdBy: req.user.userId });

        if (!task) {
            return res.status(404).json({ message: "Task not found or not authorized" });
        }

        res.status(200).json({
            success: true,
            message: "Task deleted successfully",
        });
    } catch (error) {
        next(error);
    }
}