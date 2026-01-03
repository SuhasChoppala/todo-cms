'use server'
import config from '@/payload.config'
import { getPayload } from 'payload'
import TodoPage from './TodoPage'

export default async function SelectedTodo({ params }: { params: { id: string } }) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const todo = await payload.findByID({
    collection: 'todos',
    id: params.id,
  })

  const serializableTodo = {
    id: todo.id,
    task: todo.task,
    completed: Boolean(todo.completed),
    createdAt: todo.createdAt.toString(),
    updatedAt: todo.updatedAt.toString(),
    userID: typeof todo.user === 'string' ? todo.user : todo.user?.id,
  }

  return <TodoPage todoSelected={serializableTodo}></TodoPage>
}
