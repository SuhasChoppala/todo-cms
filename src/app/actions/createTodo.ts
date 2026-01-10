'use server'
import payloadConfig from '@/payload.config'
import { APIError, getPayload } from 'payload'
import { headers as getHeaders } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { actionClient } from './safe-action'
import { z } from 'zod'

const inputSchema = z.object({
  task: z.string().min(1),
})

export const createTodo = actionClient
  .inputSchema(inputSchema)
  .action(async ({ parsedInput: { task } }) => {
    const headers = await getHeaders()
    const payload = await getPayload({ config: payloadConfig })

    const { user } = await payload.auth({ headers })

    if (!user) {
      throw new APIError('You must be logged in to create a todo')
    }

    await payload.create({
      collection: 'todos',
      data: {
        task,
        user: user.id,
      },

      user,
    })
    revalidatePath('/todos')

    return { success: true }
  })
