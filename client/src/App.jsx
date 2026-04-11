import { useState, useEffect } from 'react';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from './api/todos';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [loading, setLoading] = useState(false);

  async function loadTodos() {
    setLoading(true);
    try {
      const data = await fetchTodos(search);
      setTodos(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTodos();
  }, [search]);

  async function handleAdd(e) {
    e.preventDefault();
    if (!newTitle.trim()) return;
    try {
      await createTodo(newTitle);
      setNewTitle('');
      loadTodos();
    } catch (err) {
      console.error(err);
    }
  }

  async function handleToggle(todo) {
    try {
      await updateTodo(todo.id, { completed: !todo.completed });
      loadTodos();
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteTodo(id);
      loadTodos();
    } catch (err) {
      console.error(err);
    }
  }

  function startEdit(todo) {
    setEditingId(todo.id);
    setEditTitle(todo.title);
  }

  async function saveEdit(todo) {
    if (!editTitle.trim()) return;
    try {
      await updateTodo(todo.id, { title: editTitle });
      setEditingId(null);
      setEditTitle('');
      loadTodos();
    } catch (err) {
      console.error(err);
    }
  }

  function cancelEdit() {
    setEditingId(null);
    setEditTitle('');
  }

  return (
    <div>
      <h1>Todos</h1>

      <form onSubmit={handleAdd}>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="New todo"
        />
        <button type="submit">Add</button>
      </form>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search todos"
      />

      {loading ? (
        <p>Loading...</p>
      ) : todos.length === 0 ? (
        <p>No todos</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              {editingId === todo.id ? (
                <>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                  <button onClick={() => saveEdit(todo)}>Save</button>
                  <button onClick={cancelEdit}>Cancel</button>
                </>
              ) : (
                <>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggle(todo)}
                  />
                  <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                    {todo.title}
                  </span>
                  <button onClick={() => startEdit(todo)}>Edit</button>
                  <button onClick={() => handleDelete(todo.id)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;