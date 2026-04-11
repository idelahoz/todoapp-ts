import express, { Router } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { createTodo, getAllTodos, getTodoById, updateTodo, deleteTodo } from './handlers/todos.js';
import { todoModel } from './models/todos.js';

const apiRouter = Router();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());

app.get('/health', (_req, res) => { 
  res.json({ status: 'ok' });
});

apiRouter.post('/todos', createTodo(todoModel));
apiRouter.get('/todos', getAllTodos(todoModel));
apiRouter.get('/todos/:id', getTodoById(todoModel));
apiRouter.put('/todos/:id', updateTodo(todoModel));
apiRouter.delete('/todos/:id', deleteTodo(todoModel));

app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;