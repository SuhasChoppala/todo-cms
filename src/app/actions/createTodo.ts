import payloadConfig from '@/payload.config'
import { getPayload } from 'payload'
import { headers as getHeaders } from 'next/headers'
import { revalidatePath } from 'next/cache'

export default async function createTodo(formData: FormData) {
  'use server'

  const headers = await getHeaders()
  const payload = await getPayload({ config: payloadConfig })

  const { user } = await payload.auth({ headers })

  if (!user) {
    throw new Error('You must be logged in to create a todo')
  }

  const task = formData.get('task')

  if (!task || typeof task !== 'string') {
    throw new Error('Task is required')
  }

  try {
    await payload.create({
      collection: 'todos',
      data: {
        task,
        user: user.id,
      },
    })
    revalidatePath('/todos')
  } catch (error) {
    console.error('Error creating todo:', error)
    throw error
  }
}
