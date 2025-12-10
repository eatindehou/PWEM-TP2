import * as React from 'react'
import { Outlet, createRootRoute, Link } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <React.Fragment>
      <div className='todo-app'>
      <header>
        <nav style={{marginTop: '30px', borderBottom: 'solid orange 3px', paddingBottom: '30px'}}>
          <Link to="/" style={{marginRight: '20px', marginLeft: '30px', color: 'orange'}}>Tâches</Link>
          <Link to="/stats" style={{color: 'orange'}}>Statistiques</Link>
        </nav>
      </header>
      <Outlet />
      </div>
    </React.Fragment>
  )
}
