import { ButtonLink } from '@components/common/ButtonLink.jsx';
import { ROUTES } from '@config/routes.js';

export function NotFoundPage() {
  return (
    <section className="page-section">
      <p className="section-label">404</p>
      <h1>Page not found</h1>
      <p className="section-copy">The route you requested does not exist.</p>
      <ButtonLink to={ROUTES.HOME}>Return home</ButtonLink>
    </section>
  );
}
