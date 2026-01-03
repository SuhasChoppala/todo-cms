'use server'

import { login } from '@payloadcms/next/auth'
import config from '@payload-config'
import { redirect } from 'next/navigation'
import z from 'zod'
import { password } from 'payload/shared'

const inputSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
})

export async function loginAction(formData: FormData): Promise<void> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  try {
    await login({
      collection: 'users',
      config,
      email,
      password,
    })
  } catch (error) {
    throw new Error(`Login failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }

  redirect('/todos')
}
