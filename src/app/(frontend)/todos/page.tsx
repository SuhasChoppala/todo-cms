import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { redirect } from 'next/navigation'
import TodosClient from './TodosClient'

export default async function TodosPage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  if (!user) {
    redirect('/')
  }

  const serializedUser = {
    id: user.id,
    email: user.email,
  }

  const todos = await payload.find({
    collection: 'todos',
    limit: 100,
    overrideAccess: false,
    user,
  })

  const serializableTodos = todos.docs.map((todo) => ({
    id: todo.id,
    task: todo.task,
    completed: Boolean(todo.completed),
    createdAt: todo.createdAt.toString(),
    updatedAt: todo.updatedAt.toString(),
  }))

  return <TodosClient user={serializedUser} todos={serializableTodos} />
}
