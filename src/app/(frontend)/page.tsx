import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React, { use } from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'
import './styles.css'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  const todos = await payload.find({
    collection: 'todos',
    limit: 100,
  })

  return (
    <div className="min-h-screen w-full bg-black text-white flex items-center justify-center">
      <div className="flex flex-col items-center gap-6 text-center max-w-xl w-full px-4">
        {user?.email && <p className="text-sm text-gray-400">Logged in as {user.email}</p>}

        {todos.docs.map((todo) => (
          <div key={todo.id} className="w-full border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">{todo.title}</h3>

            <p className="text-gray-300 mb-2">{todo.description}</p>

            <p className={`text-sm mb-2 ${todo.completed ? 'text-green-400' : 'text-red-400'}`}>
              {todo.completed ? 'Completed' : 'Not Completed'}
            </p>

            <p className="text-xs text-gray-500">
              Created: {new Date(todo.createdAt).toLocaleString()}
            </p>
            <p className="text-xs text-gray-500">
              Updated: {new Date(todo.updatedAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
