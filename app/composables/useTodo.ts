import { ref, onMounted } from 'vue'
import { useSupabase } from '~/composables/useSupabase'

interface Todo {
  id: string
  item: string
  completed: boolean
}

const useTodo = () => {
  const { supabase } = useSupabase()

  const todos = ref<Todo[]>([])
  const isAuthed = ref(false)

  const checkAuth = async () => {
    const { data } = await supabase.auth.getSession()
    isAuthed.value = !!data.session
  }

  const addGuestTodo = (item: string) => {
    todos.value.unshift({
      id: crypto.randomUUID(),
      item,
      completed: false
    })
  }

  const toggleGuestTodo = (id: string) => {
    const t = todos.value.find(t => t.id === id)
    if (t) t.completed = !t.completed
  }

  const deleteGuestTodo = (id: string) => {
    todos.value = todos.value.filter(t => t.id !== id)
  }

  const fetchTodos = async () => {
    if (!isAuthed.value) return

    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error) todos.value = data ?? []
  }

  const addTodo = async (item: string) => {
    if (!item) return

    if (!isAuthed.value) {
      addGuestTodo(item)
      return
    }

    const { error } = await supabase.from('todos').insert({
      item,
      completed: false
    })

    if (!error) fetchTodos()
  }

  const updateTodo = async (id: string, completed: boolean) => {
    if (!isAuthed.value) {
      toggleGuestTodo(id)
      return
    }

    const { error } = await supabase
      .from('todos')
      .update({ completed: !completed })
      .eq('id', id)

    if (!error) fetchTodos()
  }

  const deleteTodo = async (id: string) => {
    if (!isAuthed.value) {
      deleteGuestTodo(id)
      return
    }

    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', id)

    if (!error) fetchTodos()
  }

  onMounted(async () => {
    await checkAuth()
    await fetchTodos()
  })

  return {
    todos,
    addTodo,
    updateTodo,
    deleteTodo
  }
}

export default useTodo
