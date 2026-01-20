'use server'
import { revalidatePath } from 'next/cache'
import { actionClient } from './safe-action'
import { z } from 'zod'
import { withAuth } from '../auth/withAuth'

const inputSchema = z.object({
  task: z.string().min(1),
})

export const createTodo = actionClient
  .inputSchema(inputSchema)
  .action(async ({ parsedInput: { task } }) => {
    return withAuth(async ({ user, payload }) => {
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
  })
