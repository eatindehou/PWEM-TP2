import * as React from 'react'
import { Outlet, createRootRoute, Link } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <React.Fragment>
      <header>
        <nav>
          <Link to="/" style={{marginRight: '20px'}}>Tâches</Link>
          <Link to="/stats">Statistiques</Link>
        </nav>
      </header>
      <Outlet />
    </React.Fragment>
  )
}
