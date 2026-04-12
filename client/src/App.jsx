import { useEffect } from 'react'
import { useTodos } from './store/todosStore'
import './App.css'

function App() {
  const todos = useTodos((state) => state.todos)
  const search = useTodos((state) => state.search)
  const newTitle = useTodos((state) => state.newTitle)
  const editingId = useTodos((state) => state.editingId)
  const editTitle = useTodos((state) => state.editTitle)
  const loading = useTodos((state) => state.loading)

  const setSearch = useTodos((state) => state.setSearch)
  const setNewTitle = useTodos((state) => state.setNewTitle)
  const setEditTitle = useTodos((state) => state.setEditTitle)
  const loadTodos = useTodos((state) => state.loadTodos)
  const handleAdd = useTodos((state) => state.handleAdd)
  const handleToggle = useTodos((state) => state.handleToggle)
  const handleDelete = useTodos((state) => state.handleDelete)
  const startEdit = useTodos((state) => state.startEdit)
  const saveEdit = useTodos((state) => state.saveEdit)
  const cancelEdit = useTodos((state) => state.cancelEdit)

  useEffect(() => {
    loadTodos()
  }, [search])

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
  )
}

export default App