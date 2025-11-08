import express from "express";
import {createTask,  getUserTasks,updateTask, deleteTask} from "../controllers/task.controllers.js";
import { authJwtValidater } from "../middlewares/jwt.validater.js";

const router = express.Router();

//  Protect all admin routes
router.use(authJwtValidater);   


router.post("/tasks", createTask);
router.get("/tasks", getUserTasks);
router.patch("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTask);    

export default router;
