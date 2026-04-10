export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

class TodoModel {
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
}

export const todoModel = new TodoModel();