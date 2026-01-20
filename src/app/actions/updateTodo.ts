'use server'

import { actionClient } from './safe-action'
import z from 'zod'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { withAuth } from '../auth/withAuth'

const inputSchema = z.object({
  task: z.string().min(1),
  completed: z.boolean(),
  id: z.string().min(1),
})

export const updateAction = actionClient
  .inputSchema(inputSchema)
  .action(async ({ parsedInput }) => {
    return withAuth(async ({ user, payload }) => {
      const { id, task, completed } = parsedInput
      await payload.update({
        collection: 'todos',
        id: id,
        data: {
          task,
          completed,
        },
      })

      revalidatePath('/todos')
      redirect('/todos')
    })
  })
