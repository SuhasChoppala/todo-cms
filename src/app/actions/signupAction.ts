'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { redirect } from 'next/navigation'
import { login } from '@payloadcms/next/auth'

export async function signupAction(formData: FormData): Promise<void> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    throw new Error('Email and password are required')
  }

  const payload = await getPayload({ config })

  await payload.create({
    collection: 'users',
    data: {
      email,
      password,
    },
  })

  await login({
    collection: 'users',
    config,
    email,
    password,
  })

  redirect('/todos')
}
