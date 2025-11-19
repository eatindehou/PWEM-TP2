import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/stats/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Page statistiques</div>
}
