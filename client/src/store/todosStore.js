import { createStore } from 'zustand/vanilla'
import { useStore } from 'zustand'
import { fetchTodos, createTodo, updateTodo, deleteTodo } from '../api/todos'

const useTodosStore = createStore()((set, get) => ({
  todos: [],
  search: '',
  newTitle: '',
  editingId: null,
  editTitle: '',
  loading: false,

  setTodos: (todos) => set({ todos }),
  setSearch: (search) => set({ search }),
  setNewTitle: (newTitle) => set({ newTitle }),
  setEditingId: (editingId) => set({ editingId }),
  setEditTitle: (editTitle) => set({ editTitle }),
  setLoading: (loading) => set({ loading }),

  loadTodos: async () => {
    set({ loading: true })
    try {
      const { search } = get()
      const data = await fetchTodos(search)
      set({ todos: data })
    } catch (err) {
      console.error(err)
    } finally {
      set({ loading: false })
    }
  },

  handleAdd: async (e) => {
    e.preventDefault()
    const { newTitle } = get()
    if (!newTitle.trim()) return
    try {
      await createTodo(newTitle)
      set({ newTitle: '' })
      get().loadTodos()
    } catch (err) {
      console.error(err)
    }
  },

  handleToggle: async (todo) => {
    try {
      await updateTodo(todo.id, { completed: !todo.completed })
      get().loadTodos()
    } catch (err) {
      console.error(err)
    }
  },

  handleDelete: async (id) => {
    try {
      await deleteTodo(id)
      get().loadTodos()
    } catch (err) {
      console.error(err)
    }
  },

  startEdit: (todo) => {
    set({ editingId: todo.id, editTitle: todo.title })
  },

  saveEdit: async (todo) => {
    const { editTitle } = get()
    if (!editTitle.trim()) return
    try {
      await updateTodo(todo.id, { title: editTitle })
      set({ editingId: null, editTitle: '' })
      get().loadTodos()
    } catch (err) {
      console.error(err)
    }
  },

  cancelEdit: () => {
    set({ editingId: null, editTitle: '' })
  },
}))

export const useTodos = (selector) => useStore(useTodosStore, selector)