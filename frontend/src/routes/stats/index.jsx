import { createFileRoute } from '@tanstack/react-router'
import Chart from '../../components/TaskStats'

export const Route = createFileRoute('/stats/')({
  component: RouteComponent,
})

function RouteComponent() {

  return (
    < Chart/>
  )
}
