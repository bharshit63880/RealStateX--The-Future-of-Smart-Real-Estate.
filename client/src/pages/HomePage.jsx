import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import { ButtonLink } from '@components/common/ButtonLink.jsx';
import { ROUTES } from '@config/routes.js';

export function HomePage() {
  const sequenceRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const section = sequenceRef.current;
    const video = videoRef.current;
    if (!section || !video || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    let frame;
    const sync = () => {
      const rect = section.getBoundingClientRect();
      const distance = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / distance));
      if (Number.isFinite(video.duration)) video.currentTime = progress * video.duration;
      section.style.setProperty('--build-progress', progress);
      frame = undefined;
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(sync); };
    video.addEventListener('loadedmetadata', sync);
    window.addEventListener('scroll', onScroll, { passive: true });
    sync();
    return () => {
      video.removeEventListener('loadedmetadata', sync);
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <section ref={sequenceRef} className="build-sequence" aria-labelledby="hero-title">
        <div className="build-stage">
          <video ref={videoRef} className="build-video" muted playsInline preload="metadata" aria-hidden="true">
            <source src="/media/blueprint-to-house.mp4" type="video/mp4" />
          </video>
          <div className="hero-shade" />
          <div className="blueprint-grid" />
          <div className="hero-copy">
            <p className="eyebrow">Blueprint → structure → reality</p>
            <h1 id="hero-title">Real estate,<br /><em>built intelligently.</em></h1>
            <p>Discover, evaluate, buy, sell, rent and manage property through one intelligent ecosystem.</p>
            <div className="action-row">
              <ButtonLink to={ROUTES.EXPLORE}>Explore properties <span aria-hidden="true">↗</span></ButtonLink>
              <a className="text-link light-link" href="#discovery">Experience RealEstateX</a>
            </div>
          </div>
          <div className="scroll-cue"><span>Scroll to build</span><i /></div>
          <div className="sequence-labels" aria-hidden="true"><span>01 Blueprint</span><span>02 Structure</span><span>03 Reality</span></div>
        </div>
      </section>

      <section id="discovery" className="discovery-section">
        <div className="section-kicker"><span>01</span> Find your space</div>
        <div className="discovery-heading">
          <h2>Where do you want to <em>live, invest or build?</em></h2>
          <p>One search across verified homes, emerging projects and investment-ready opportunities.</p>
        </div>
        <form className="search-bar" action={ROUTES.EXPLORE}>
          <label><span>Location or project</span><input name="q" placeholder="Try Gurugram, Noida or a project" /></label>
          <label><span>Intent</span><select name="listingType" defaultValue="buy"><option value="buy">Buy</option><option value="rent">Rent</option></select></label>
          <label><span>Budget</span><select name="maxPrice" defaultValue=""><option value="">Any budget</option><option value="10000000">Under ₹1 Cr</option><option value="20000000">Under ₹2 Cr</option></select></label>
          <button type="submit" aria-label="Search properties">Search <span>↗</span></button>
        </form>
        <div className="editorial-grid">
          <article className="feature-property"><div className="property-image image-one"><span>Verified collection</span></div><h3>Homes shaped by light</h3><p>Golf Course Extension · Gurugram</p></article>
          <div className="collection-list">
            <article><span>01</span><div><h3>Urban sanctuaries</h3><p>Quiet homes within connected cities</p></div><b>18 properties</b></article>
            <article><span>02</span><div><h3>Investment corridors</h3><p>Markets with durable rental demand</p></div><b>24 insights</b></article>
            <article><span>03</span><div><h3>Design-led living</h3><p>Architecture that earns its space</p></div><b>12 projects</b></article>
          </div>
        </div>
      </section>

      <section id="intelligence" className="intelligence-section">
        <div className="intelligence-lines" aria-hidden="true" />
        <div className="section-kicker"><span>02</span> Understand before you decide</div>
        <h2>A property is more than<br />a pin on a map.</h2>
        <div className="signal-grid">
          <article><small>01 / VALUE</small><strong>₹18,420</strong><span>Average price / sq.ft.</span><p>Comparable pricing and historical movement, explained without false certainty.</p></article>
          <article><small>02 / CONNECTIVITY</small><strong>12 min</strong><span>To nearest metro</span><p>Spatial context for schools, work hubs, healthcare and the journeys that matter.</p></article>
          <article><small>03 / TRUST</small><strong>Verified</strong><span>Identity & documents</span><p>Clear listing provenance, moderation status and explainable risk signals.</p></article>
        </div>
        <Link className="outline-link" to={ROUTES.EXPLORE}>Explore market intelligence <span>→</span></Link>
      </section>

      <section className="final-statement"><p>Every property. Every decision.</p><h2>One intelligent<br /><em>ecosystem.</em></h2><ButtonLink to={ROUTES.EXPLORE}>Begin your search <span>↗</span></ButtonLink></section>
    </>
  );
}
