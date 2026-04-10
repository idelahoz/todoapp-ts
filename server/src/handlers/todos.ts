import { Request, Response } from 'express';
import { todoModel } from '../models/todos';

export const createTodo = (req: Request, res: Response): Response => {
  const { title } = req.body;

  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }

  const newTodo = todoModel.add(title);
  return res.status(201).json(newTodo);
};

export const getAllTodos = (_req: Request, res: Response): Response => {
  const todos = todoModel.getAll();
  return res.json(todos);
};

export const getTodoById = (req: Request, res: Response): Response => {
  const { id } = req.params;
  const todo = todoModel.getById(id as string);

  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  return res.json(todo);
};