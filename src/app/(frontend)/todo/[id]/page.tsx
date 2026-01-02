import config from '@/payload.config'
import { getPayload } from 'payload'

export default async function SelectedTodo({ params }: { params: { id: string } }) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const todo = await payload.findByID({
    collection: 'todos',
    id: params.id,
  })

  return (
    <div>
      <h1>{todo.task}</h1>
      <p>{todo.completed ? 'Completed' : 'Not Completed'}</p>
    </div>
  )
}
