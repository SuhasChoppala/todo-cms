'use server'
import config from '@/payload.config'
import { getPayload } from 'payload'
import UpdateTodoPage from './UpdateTodoClient'

export default async function SelectedTodo({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const todo = await payload.findByID({
    collection: 'todos',
    id,
  })

  const serializableTodo = {
    id: todo.id,
    task: todo.task,
    completed: Boolean(todo.completed),
    createdAt: todo.createdAt.toString(),
    updatedAt: todo.updatedAt.toString(),
    userID: typeof todo.user === 'string' ? todo.user : todo.user?.id,
  }

  return <UpdateTodoPage todoSelected={serializableTodo}></UpdateTodoPage>
}
