export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export interface UpdateTodoData {
  title?: string;
  completed?: boolean;
}

export class TodoModel {
  private todos: Todo[] = [];

  add(title: string): Todo {
    const todo: Todo = {
      id: crypto.randomUUID(),
      title: title.trim(),
      completed: false,
    };
    this.todos.push(todo);
    return todo;
  }

  getById(id: string): Todo | undefined {
    return this.todos.find((todo) => todo.id === id);
  }

  getAll(): Todo[] {
    return [...this.todos];
  }

  search(query: string): Todo[] {
    const lowerQuery = query.toLowerCase();
    return this.todos.filter((todo) =>
      todo.title.toLowerCase().includes(lowerQuery)
    );
  }

  update(id: string, data: UpdateTodoData): Todo | null {
    const todo = this.todos.find((t) => t.id === id);
    if (!todo) return null;

    if (data.title !== undefined) {
      todo.title = data.title.trim();
    }
    if (data.completed !== undefined) {
      todo.completed = data.completed;
    }
    return todo;
  }

  delete(id: string): boolean {
    const index = this.todos.findIndex((t) => t.id === id);
    if (index === -1) return false;
    this.todos.splice(index, 1);
    return true;
  }
}

export const todoModel = new TodoModel();