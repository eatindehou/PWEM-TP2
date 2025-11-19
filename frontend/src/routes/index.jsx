import { createFileRoute } from '@tanstack/react-router'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
  <div>
    <TaskForm />
    <TaskList />
  </div>
  )
}
