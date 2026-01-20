'use server'
import { revalidatePath } from 'next/cache'
import { actionClient } from './safe-action'
import z from 'zod'
import { withAuth } from '../auth/withAuth'

const inputSchema = z.object({
  todoID: z.string().min(1),
})

export const todoDeleteAction = actionClient
  .inputSchema(inputSchema)
  .action(async ({ parsedInput: { todoID } }) => {
    return withAuth(async ({ user, payload }) => {
      await payload.delete({
        collection: 'todos',
        id: todoID,
      })

      revalidatePath('/todos')
    })
  })
