import { createFileRoute } from '@tanstack/react-router'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'
import { useTasks } from '../hooks/useTasks'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { tasks, addTask, toggleTask, deleteTask, editTask } = useTasks();

  return (
  <div>
    <TaskForm onAdd={addTask} />
    <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} onEdit={editTask}/>
  </div>
  )
}
