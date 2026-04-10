import { Request, Response } from 'express';
import { TodoModel, todoModel } from '../models/todos';

export const createTodo = (model: TodoModel) => (req: Request, res: Response): Response => {
  const { title } = req.body;

  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }

  const newTodo = model.add(title);
  return res.status(201).json(newTodo);
};

export const getAllTodos = (model: TodoModel) => (_req: Request, res: Response): Response => {
  const todos = model.getAll();
  return res.json(todos);
};

export const getTodoById = (model: TodoModel) => (req: Request, res: Response): Response => {
  const { id } = req.params;
  const todo = model.getById(id as string);

  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  return res.json(todo);
};