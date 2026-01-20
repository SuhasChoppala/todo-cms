'use server'
import { headers as getHeaders } from 'next/headers'
import { getPayload } from 'payload'
import payloadConfig from '@/payload.config'
import { APIError } from 'payload'

export async function withAuth<T>(fn: (args: { user: any; payload: any }) => Promise<T>) {
  const headers = await getHeaders()
  const payload = await getPayload({ config: payloadConfig })

  const { user } = await payload.auth({ headers })

  if (!user) {
    throw new APIError('You must be logged in', 401)
  }

  return fn({ user, payload })
}
