import { Link } from 'react-router-dom';

import { ButtonLink } from '@components/common/ButtonLink.jsx';
import { ROUTES } from '@config/routes.js';

export function HomePage() {
  return (
    <section className="page-section">
      <p className="section-label">RealStateX foundation</p>
      <h1>Production-ready MERN architecture starts here.</h1>
      <p className="section-copy">
        The project is wired with routing, configuration, API access, styling, and backend health
        checks so feature modules can be added cleanly.
      </p>
      <div className="action-row">
        <ButtonLink to={ROUTES.DASHBOARD}>Open dashboard</ButtonLink>
        <Link className="text-link" to="/missing-route">
          Test 404
        </Link>
      </div>
    </section>
  );
}
