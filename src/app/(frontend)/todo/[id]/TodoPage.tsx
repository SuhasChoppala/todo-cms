'use client'
import { updateAction } from '@/app/actions/updateTodo'
import Link from 'next/link'
import { id, is } from 'zod/locales'

type Todo = {
  id: string
  createdAt: string
  updatedAt: string
  completed: boolean
  task: string
  userID: string
}

type TodoPageProps = {
  todoSelected: Todo
}

export default function TodoPage({ todoSelected }: TodoPageProps) {
  return (
    <div className="min-h-screen w-full bg-black text-white flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Edit Todo</h1>

        <form
          action={(formData) => {
            updateAction({
              task: formData.get('task') as string,
              completed: Boolean(formData.get('completed')),
              id: todoSelected.id as string,
            })
          }}
          className="space-y-4"
        >
          <div>
            <label htmlFor="task" className="block text-sm font-medium mb-2">
              Task Name
            </label>
            <input
              id="task"
              name="task"
              type="text"
              defaultValue={todoSelected.task}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gray-600"
              placeholder="Enter task name"
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              id="completed"
              name="completed"
              type="checkbox"
              defaultChecked={todoSelected.completed}
              className="w-5 h-5 bg-gray-900 border border-gray-700 rounded focus:ring-2 focus:ring-gray-600"
            />
            <label htmlFor="completed" className="text-sm font-medium cursor-pointer">
              Mark as completed
            </label>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              Save Changes
            </button>
            <Link
              href="/todos"
              className="flex-1 bg-gray-900 border border-gray-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors text-center"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
