'use client'

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
    <div>
      <h1>{todoSelected.task}</h1>
      <p>{todoSelected.completed ? 'Completed' : 'Not Completed'}</p>
      <p>{todoSelected.userID}</p>
    </div>
  )
}
