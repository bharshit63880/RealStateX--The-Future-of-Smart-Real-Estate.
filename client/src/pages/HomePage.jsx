import { Link } from 'react-router-dom';

import { ROUTES } from '@config/routes.js';

export function HomePage() {
  return (
    <div className="arbor-home">
      <section className="arbor-hero" aria-labelledby="hero-title">
        <video className="arbor-hero-video" autoPlay loop muted playsInline preload="auto" aria-hidden="true">
          <source src="/media/blueprint-to-house.mp4" type="video/mp4" />
        </video>
        <div className="arbor-hero-wash" />
        <div className="arbor-hero-meta">
          <span>28.4595° N</span>
          <span>Built for what comes next</span>
          <span>77.0266° E</span>
        </div>
        <div className="arbor-hero-title">
          <p>Smart property ecosystem</p>
          <h1 id="hero-title">RealEstateX</h1>
        </div>
        <a className="arbor-scroll" href="#design" aria-label="Scroll to the RealEstateX story">
          <i /> Scroll to explore
        </a>
      </section>

      <section id="design" className="arbor-design-scroll">
        <div className="arbor-design-sticky">
          <div className="arbor-design-copy">
            <p className="arbor-label">RealEstateX design</p>
            <h2>
              Property intelligence shaped around the way <em>people live.</em>
            </h2>
            <p className="arbor-description">
              A connected real-estate experience where architectural clarity, verified information,
              and thoughtful technology make every decision feel considered.
            </p>
            <Link className="arbor-outline-button" to={ROUTES.EXPLORE}>
              Explore properties <span>↗</span>
            </Link>
          </div>
          <div className="arbor-shapes" aria-hidden="true">
            <div className="arbor-shape arbor-shape-small" />
            <div className="arbor-shape arbor-shape-large" />
          </div>
          <div className="arbor-progress"><i /><span>01</span></div>
        </div>
      </section>

      <section className="arbor-statement">
        <p className="arbor-label">One intelligent address</p>
        <h2>
          Not another listing portal. A living ecosystem for
          <em> discovering, deciding and managing.</em>
        </h2>
        <div className="arbor-statement-footer">
          <p>Search → understand → decide → transact → manage</p>
          <Link to={ROUTES.EXPLORE}>Enter the ecosystem <span>→</span></Link>
        </div>
      </section>

      <section className="arbor-residences">
        <div className="arbor-section-head">
          <p className="arbor-label">Curated residences</p>
          <h2>A new chapter in intelligent living.</h2>
          <p>Verified homes chosen for architecture, connectivity, enduring value and everyday comfort.</p>
        </div>
        <div className="arbor-property-track">
          <Link className="arbor-property arbor-property-one" to="/properties/aranya-residence">
            <span>01 / Gurugram</span><strong>Aranya Residence</strong><small>₹2.85 Cr · 3 BHK</small>
          </Link>
          <Link className="arbor-property arbor-property-two" to="/properties/the-courtyard">
            <span>02 / Noida</span><strong>The Courtyard</strong><small>₹1.72 Cr · 3 BHK</small>
          </Link>
          <Link className="arbor-property arbor-property-three" to="/properties/one-verde">
            <span>03 / Bengaluru</span><strong>One Verde</strong><small>₹1.48 Cr · 2 BHK</small>
          </Link>
        </div>
      </section>

      <section className="arbor-location">
        <div className="arbor-location-orbit" aria-hidden="true"><i /><i /><i /></div>
        <p className="arbor-label">Location intelligence</p>
        <h2>Everything that matters, placed in context.</h2>
        <div className="arbor-location-list">
          <span>Metro access <b>08 min</b></span>
          <span>Business district <b>12 min</b></span>
          <span>International airport <b>24 min</b></span>
        </div>
      </section>

      <section className="arbor-final">
        <p>Every property. Every decision.</p>
        <h2>One intelligent<br /><em>ecosystem.</em></h2>
        <Link className="arbor-solid-button" to={ROUTES.EXPLORE}>Begin your search <span>↗</span></Link>
      </section>
    </div>
  );
}
