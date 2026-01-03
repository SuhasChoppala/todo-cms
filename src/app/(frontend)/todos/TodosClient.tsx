'use client'

import Link from 'next/link'
import { createTodo } from '@/app/actions/createTodo'
import { logoutAction } from '@/app/actions/logoutAction'

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
  return (
    <div className="min-h-screen w-full bg-black text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8 max-w-2xl mx-auto">
          <p className="text-sm">Logged in as {user.email}</p>
          <form action={logoutAction}>
            <button type="submit" className="underline">
              Logout
            </button>
          </form>
        </div>

        <form
          action={(formData) => {
            createTodo({
              task: formData.get('task') as string,
            })
          }}
          className="flex gap-2 mb-12 max-w-2xl mx-auto"
        >
          <input
            name="task"
            placeholder="Create task"
            className="flex-1 bg-gray-900 border px-4 py-3"
          />
          <button type="submit">+</button>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {todos.map((todo) => (
            <Link key={todo.id} href={`/todo/${todo.id}`}>
              <div className="border p-6 rounded-lg">
                <h3 className="text-xl font-semibold">{todo.task}</h3>
                <p className={todo.completed ? 'text-green-400' : 'text-red-400'}>
                  {todo.completed ? 'Completed' : 'Not Completed'}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
