import { Link, Outlet } from 'react-router-dom';

import { ROUTES } from '@config/routes.js';
import { env } from '@config/env.js';

export function RootLayout() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <Link className="menu-trigger" to={ROUTES.EXPLORE}><i /><span>Explore</span></Link>
        <Link className="brand-link" to={ROUTES.HOME} aria-label={`${env.appName} home`}>RX</Link>
        <Link className="nav-emphasis" to={ROUTES.DASHBOARD}>Inquire <span>→</span></Link>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
