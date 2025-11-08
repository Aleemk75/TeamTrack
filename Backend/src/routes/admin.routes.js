import express from "express";
import {
  getAllTasks, deleteTask,} from "../controllers/admin.controller.js";
import { authJwtValidater } from "../middlewares/jwt.validater.js";
import { checkRole } from "../middlewares/role.middleware.js";

const router = express.Router();

//  Protect all admin routes
router.use(authJwtValidater, checkRole("admin"));

//  Routes
router.get("/tasks", getAllTasks);
router.delete("/tasks/:id", deleteTask);

export default router;
