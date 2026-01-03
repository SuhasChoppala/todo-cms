'use server'

import payloadConfig from '@/payload.config'
import { getPayload } from 'payload'
import { revalidatePath } from 'next/cache'
import { actionClient } from './safe-action'
import z from 'zod'

const inputSchema = z.object({
  todoID: z.string().min(1),
})

export const todoDeleteAction = actionClient
  .inputSchema(inputSchema)
  .action(async ({ parsedInput: { todoID } }) => {
    const payload = await getPayload({ config: payloadConfig })

    await payload.delete({
      collection: 'todos',
      id: todoID,
    })

    revalidatePath('/todos')
  })
