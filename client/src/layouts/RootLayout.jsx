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
          <Link to={ROUTES.HOME}>Home</Link>
          <Link to={ROUTES.DASHBOARD}>Dashboard</Link>
        </nav>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
}
