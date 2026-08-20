import { Link, Outlet } from 'react-router-dom';

import { ROUTES } from '@config/routes.js';
import { env } from '@config/env.js';

export function RootLayout() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <Link className="brand-link" to={ROUTES.HOME}>
          {env.appName}
        </Link>
        <nav className="app-nav" aria-label="Primary navigation">
          <Link to={ROUTES.EXPLORE}>Explore</Link>
          <Link to={`${ROUTES.EXPLORE}?view=map`}>Map</Link>
          <Link to={`${ROUTES.EXPLORE}?type=project`}>Projects</Link>
          <a href="#intelligence">Insights</a>
          <Link className="nav-emphasis" to={ROUTES.DASHBOARD}>List property</Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
