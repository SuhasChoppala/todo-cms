'use server'

import { actionClient } from './safe-action'
import z from 'zod'
import payloadConfig from '@/payload.config'
import { getPayload } from 'payload'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const inputSchema = z.object({
  task: z.string().min(1),
  completed: z.boolean(),
  id: z.string().min(1),
})

export const updateAction = actionClient
  .inputSchema(inputSchema)
  .action(async ({ parsedInput }) => {
    const { id, task, completed } = parsedInput

    const payload = await getPayload({ config: payloadConfig })

    console.log(id)

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
