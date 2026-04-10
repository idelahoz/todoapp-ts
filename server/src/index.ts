import express, { Router } from 'express';
import cors from 'cors';
import { createTodo, getAllTodos, getTodoById } from './handlers/todos';
import { todoModel } from './models/todos';

const apiRouter = Router();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => { 
  res.json({ status: 'ok' });
});

apiRouter.post('/todos', createTodo(todoModel));
apiRouter.get('/todos', getAllTodos(todoModel));
apiRouter.get('/todos/:id', getTodoById(todoModel));

app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;