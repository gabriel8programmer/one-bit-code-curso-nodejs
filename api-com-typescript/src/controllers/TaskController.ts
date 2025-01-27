import { Handler } from "express";
import { z } from "zod";
import { Task } from "../models/Task";
import { HttpError } from "../errors/HttpError";

const StoreRequestSchema = z.object({
  title: z.string(),
  description: z.string(),
  status: z.enum(["todo", "doing", "done"]),
  priority: z.enum(["low", "medium", "high"]),
});

const UpdateRequestSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  status: z.enum(["todo", "doing", "done"]).optional(),
  priority: z.enum(["low", "medium", "high"]).optional(),
});

export class TaskController {
  //GET /api/tasks
  index: Handler = (req, res) => {
    res.json(Task.findAll());
  };

  //POST /api/tasks
  store: Handler = (req, res) => {
    const taskBody = StoreRequestSchema.parse(req.body);
    const task = Task.create(taskBody);
    res.status(201).json(task);
  };

  //GET /api/tasks/:id
  show: Handler = (req, res) => {
    const { id } = req.params;
    const task = Task.findById(+id);
    if (!task) throw new HttpError(404, "Task not found!");
    res.json(task);
  };

  //PUT /api/tasks/:id
  update: Handler = (req, res) => {
    const { id } = req.params;
    const taskBody = UpdateRequestSchema.parse(req.body);
    const task = Task.update(+id, taskBody);
    if (!task) throw new HttpError(404, "Task not found!");
    res.json(task);
  };

  //DELETE /api/tasks/:id
  delete: Handler = (req, res) => {
    const { id } = req.params;
    const task = Task.delete(+id);
    res.json(task);
  };
}
