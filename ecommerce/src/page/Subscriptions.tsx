import { Link } from "react-router-dom";
import "./MarketingPages.css";

const plans = [
  {
    name: "The Explorer",
    description: "A rotating single-origin coffee chosen by our roaster each month.",
    price: 20,
    frequency: "Every 4 weeks",
    details: ["1 bag · 250g", "Light to medium roast", "Free shipping"],
  },
  {
    name: "Daily Ritual",
    description: "Two dependable bags for an always-stocked morning coffee routine.",
    price: 36,
    frequency: "Every 4 weeks",
    details: ["2 bags · 250g each", "Choose your roast", "Free shipping"],
    featured: true,
  },
  {
    name: "Roaster's Table",
    description: "Our most distinctive limited lots, selected for curious coffee drinkers.",
    price: 52,
    frequency: "Every 4 weeks",
    details: ["2 reserve bags · 200g each", "Roaster tasting card", "Free shipping"],
  },
];

const Subscriptions = () => {
  return (
    <main className="marketing-page">
      <section className="marketing-hero subscription-hero">
        <p className="eyebrow">Coffee, right on time</p>
        <h1>Never run out of good coffee.</h1>
        <p className="hero-copy">
          Freshly roasted beans delivered on your schedule. Pause, skip, or cancel whenever you like.
        </p>
        <a className="primary-link" href="#plans">
          Choose your plan
        </a>
      </section>

      <section className="steps-section">
        <div>
          <span>01</span>
          <h2>Pick your plan</h2>
          <p>Choose a monthly coffee experience that fits your routine.</p>
        </div>
        <div>
          <span>02</span>
          <h2>We roast it fresh</h2>
          <p>Your coffee is roasted in small batches just before shipping.</p>
        </div>
        <div>
          <span>03</span>
          <h2>Brew and enjoy</h2>
          <p>Discover every coffee with simple tasting and brewing notes.</p>
        </div>
      </section>

      <section className="plans-section" id="plans">
        <div className="section-heading">
          <p className="eyebrow">Simple and flexible</p>
          <h2>Find your perfect rhythm</h2>
        </div>

        <div className="plan-grid">
          {plans.map((plan) => (
            <article className={`plan-card${plan.featured ? " featured-plan" : ""}`} key={plan.name}>
              {plan.featured && <span className="plan-label">Most popular</span>}
              <h3>{plan.name}</h3>
              <p>{plan.description}</p>
              <div className="plan-price">
                <strong>${plan.price}</strong>
                <span>/ delivery</span>
              </div>
              <small>{plan.frequency}</small>
              <ul>
                {plan.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
              <button type="button">Select plan</button>
            </article>
          ))}
        </div>
      </section>

      <section className="marketing-cta">
        <p className="eyebrow">Prefer a one-time order?</p>
        <h2>Explore all of our coffees.</h2>
        <Link className="text-link" to="/">
          Shop coffee →
        </Link>
      </section>
    </main>
  );
};

export default Subscriptions;
