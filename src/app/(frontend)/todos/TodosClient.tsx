'use client'

import Link from 'next/link'
import { createTodo } from '@/app/actions/createTodo'
import { logoutAction } from '@/app/actions/logoutAction'
import { todoDeleteAction } from '@/app/actions/deleteTodo'
import { useState } from 'react'

type Todo = {
  id: string
  task: string
  completed: boolean
  createdAt: string
  updatedAt: string
}

type User = {
  id: string
  email: string
}

type TodosClientProps = {
  user: User
  todos: Todo[]
}

export default function TodosClient({ user, todos }: TodosClientProps) {
  const [error, setError] = useState<string | null>(null)
  return (
    <div className="min-h-screen w-full bg-black text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8 max-w-2xl mx-auto">
          <p className="text-sm text-white">Logged in as {user.email}</p>
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
        <form
          action={async (formData) => {
            const result = await createTodo({
              task: formData.get('task') as string,
            })

            if (result?.serverError) {
              setError(result.serverError)
            } else if (result?.validationErrors) {
              setError('Please enter a task name to continue')
            }
          }}
          className="flex items-center gap-2 mb-12 max-w-2xl mx-auto"
        >
          <input
            name="task"
            type="text"
            placeholder="Create task"
            className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gray-600"
          />
          <button
            type="submit"
            className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 hover:bg-gray-800 transition-colors h-[52px] flex items-center justify-center"
          >
            <span className="text-2xl leading-none">+</span>
          </button>
        </form>

        {error && (
          <div className="mb-12 max-w-2xl mx-auto rounded-lg border border-red-500 bg-red-500/10 text-red-400 relative">
            <span className="block text-center py-3 px-4">{error}</span>
            <button
              onClick={() => setError(null)}
              className="absolute -top-2.5 -right-2.5 bg-red-500 text-red-950 hover:bg-red-400 transition-colors w-7 h-7 flex items-center justify-center rounded-full font-bold text-sm"
              aria-label="Close error message"
            >
              ✕
            </button>
          </div>
        )}

        {/* Todos grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="w-full border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition-colors group"
            >
              <div className="block">
                <h3 className="text-xl font-semibold mb-2">{todo.task}</h3>

                <p className={`text-sm mb-2 ${todo.completed ? 'text-green-400' : 'text-red-400'}`}>
                  {todo.completed ? 'Completed' : 'Not Completed'}
                </p>

                <p className="text-xs text-gray-500">Created: {todo.createdAt}</p>
                <p className="text-xs text-gray-500 mb-4">Updated: {todo.updatedAt}</p>
              </div>

              <div className="flex gap-3 pt-3 border-t border-gray-800">
                <Link
                  href={`/todo/${todo.id}`}
                  className="flex-1 text-gray-400 hover:text-white text-sm transition-colors underline text-center"
                >
                  Edit
                </Link>
                <span className="text-gray-800">|</span>
                <button
                  onClick={() => {
                    todoDeleteAction({
                      todoID: todo.id,
                    })
                  }}
                  className="flex-1 text-gray-400 hover:text-red-400 text-sm transition-colors underline"
                >
                  Delete
                </button>
              </div>
            </div>
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
