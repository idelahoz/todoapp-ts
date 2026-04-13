import { useEffect } from 'react'
import { useTodos } from './store/todosStore'
import Heading from './components/atoms/Heading/Heading'
import Form from './components/atoms/Form/Form'
import Input from './components/atoms/Input/Input'
import Button from './components/atoms/Button/Button'
import List from './components/atoms/List/List'
import ListItem from './components/atoms/ListItem/ListItem'
import Checkbox from './components/atoms/Checkbox/Checkbox'
import Text from './components/atoms/Text/Text'
import Paragraph from './components/atoms/Paragraph/Paragraph'
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
      <Heading>Todos</Heading>

      <Form onSubmit={handleAdd}>
        <Input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="New todo"
        />
        <Button type="submit">Add</Button>
      </Form>

      <Input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search todos"
      />

      {loading ? (
        <Paragraph>Loading...</Paragraph>
      ) : todos.length === 0 ? (
        <Paragraph>No todos</Paragraph>
      ) : (
        <List>
          {todos.map((todo) => (
            <ListItem key={todo.id}>
              {editingId === todo.id ? (
                <>
                  <Input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                  <Button onClick={() => saveEdit(todo)}>Save</Button>
                  <Button onClick={cancelEdit}>Cancel</Button>
                </>
              ) : (
                <>
                  <Checkbox
                    checked={todo.completed}
                    onChange={() => handleToggle(todo)}
                  />
                  <Text style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                    {todo.title}
                  </Text>
                  <Button onClick={() => startEdit(todo)}>Edit</Button>
                  <Button onClick={() => handleDelete(todo.id)}>Delete</Button>
                </>
              )}
            </ListItem>
          ))}
        </List>
      )}
    </div>
  )
}

export default App