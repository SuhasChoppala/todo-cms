import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'

import config from '@/payload.config'
import '../styles.css'
import Link from 'next/link'
import createTodo from '../../actions/createTodo'
import { logoutAction } from '@/app/actions/logoutAction'
import { redirect } from 'next/navigation'

export default async function TodosPage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  if (!user) {
    redirect('/')
  }

  const todos = await payload.find({
    collection: 'todos',
    limit: 100,
    overrideAccess: false,
    user,
  })

  return (
    <div className="min-h-screen w-full bg-black text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8 max-w-2xl mx-auto">
          <p className="text-sm text-white">Logged in as {user?.email}</p>
          <form action={logoutAction}>
            <button
              type="submit"
              className="text-sm text-white underline hover:text-gray-300 transition-colors"
            >
              Logout
            </button>
          </form>
        </div>

        {/* Task input section */}
        <form action={createTodo} className="flex items-center gap-2 mb-12 max-w-2xl mx-auto">
          <input
            name="task"
            type="text"
            placeholder="Create task"
            className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gray-600"
          />
          <button
            type="submit"
            className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 hover:bg-gray-800 transition-colors"
          >
            <span className="text-2xl">+</span>
          </button>
        </form>

        {/* Todos grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {todos.docs.map((todo) => (
            <Link href={`/todo/${todo.id}`} key={todo.id}>
              <div className="w-full border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition-colors cursor-pointer">
                <h3 className="text-xl font-semibold mb-2">{todo.task}</h3>

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
            </Link>
          ))}
        </div>

        {/* Upgrade prompt */}
        <div className="border border-gray-700 rounded-lg p-8 text-center bg-gray-900/50">
          <h3 className="text-2xl font-bold mb-2">Want more?</h3>
          <p className="text-gray-400 mb-4">Pay to add more todos and unlock more features</p>
          <button className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
            Upgrade Now
          </button>
        </div>
      </div>
    </div>
  )
}
