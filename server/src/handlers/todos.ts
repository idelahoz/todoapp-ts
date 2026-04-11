import { Request, Response } from 'express';
import { TodoModel, todoModel, UpdateTodoData } from '../models/todos.js';

export const createTodo = (model: TodoModel) => (req: Request, res: Response): Response => {
  const { title } = req.body;

  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }

  const newTodo = model.add(title);
  return res.status(201).json(newTodo);
};

export const getAllTodos = (model: TodoModel) => (req: Request, res: Response): Response => {
  const { search } = req.query;
  const todos = search && typeof search === 'string' && search.trim()
    ? model.search(search.trim())
    : model.getAll();
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

export const updateTodo = (model: TodoModel) => (req: Request, res: Response): Response => {
  const { id } = req.params;
  const data: UpdateTodoData = req.body;

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: 'Invalid id' });
  }

  if (data.title !== undefined && (typeof data.title !== 'string' || data.title.trim() === '')) {
    return res.status(400).json({ error: 'Title must be a non-empty string' });
  }

  const updated = model.update(id, data);

  if (!updated) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  return res.json(updated);
};

export const deleteTodo = (model: TodoModel) => (req: Request, res: Response): Response => {
  const { id } = req.params;

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: 'Invalid id' });
  }

  const deleted = model.delete(id);

  if (!deleted) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  return res.status(204).send();
};