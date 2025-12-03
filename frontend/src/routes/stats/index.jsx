import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/stats/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className="todo-stats">
            <canvas id="todo-stats__chart"></canvas>
        </div>
}
