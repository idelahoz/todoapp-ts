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
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Todos</h1>
        <p className="app-subtitle">Stay organized, get things done</p>
      </header>

      <section className="search-section">
        <input
          className="search-input"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search your todos..."
        />
      </section>

      <form className="add-section add-form" onSubmit={handleAdd}>
        <input
          className="add-input"
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="What needs to be done?"
        />
        <button className="add-button" type="submit">Add</button>
      </form>

      <section className="todos-section">
        {loading ? (
          <div className="loading-state">Loading...</div>
        ) : todos.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">○</div>
            <p className="empty-text">No todos yet</p>
            <p className="empty-subtext">Add your first todo above</p>
          </div>
        ) : (
          <ul className="todos-list">
            {todos.map((todo) => (
              <li className="todo-item" key={todo.id}>
                {editingId === todo.id ? (
                  <div className="todo-edit-form">
                    <input
                      className="todo-edit-input"
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />
                    <button className="todo-save-btn" onClick={() => saveEdit(todo)}>Save</button>
                    <button className="todo-cancel-btn" onClick={cancelEdit}>Cancel</button>
                  </div>
                ) : (
                  <>
                    <input
                      className="todo-checkbox"
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => handleToggle(todo)}
                    />
                    <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
                      {todo.title}
                    </span>
                    <div className="todo-actions">
                      <button className="todo-edit-btn" onClick={() => startEdit(todo)}>Edit</button>
                      <button className="todo-delete-btn" onClick={() => handleDelete(todo.id)}>Delete</button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}

export default App
