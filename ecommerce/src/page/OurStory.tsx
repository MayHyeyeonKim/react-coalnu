import { Link } from "react-router-dom";
import "./MarketingPages.css";

const OurStory = () => {
  return (
    <main className="marketing-page story-page">
      <section className="story-hero">
        <div className="story-hero-copy">
          <p className="eyebrow">Our story</p>
          <h1>Better coffee begins with care.</h1>
          <p>
            We started Coffee Bean with one goal: make thoughtfully sourced, freshly roasted coffee part of
            the everyday ritual.
          </p>
        </div>
        <div className="story-hero-image">
          <img
            src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1400&q=85"
            alt="Coffee being prepared at the roastery"
          />
        </div>
      </section>

      <section className="story-intro">
        <p className="eyebrow">From seed to cup</p>
        <h2>We believe every coffee has a story worth telling.</h2>
        <p>
          Our coffees are selected for clarity, sweetness, and character. We work with trusted importers and
          producers, roast in small batches, and share the details behind every bag so you know exactly what
          you are brewing.
        </p>
      </section>

      <section className="values-grid">
        <article>
          <span>01</span>
          <h3>Thoughtful sourcing</h3>
          <p>We choose coffees with distinctive flavor and transparent, responsible supply chains.</p>
        </article>
        <article>
          <span>02</span>
          <h3>Small-batch roasting</h3>
          <p>Each coffee gets a roast profile designed to bring out its natural sweetness and character.</p>
        </article>
        <article>
          <span>03</span>
          <h3>Made for sharing</h3>
          <p>Good coffee should feel welcoming, whether you are learning or brewing your hundredth cup.</p>
        </article>
      </section>

      <section className="story-feature">
        <div className="story-feature-image">
          <img
            src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1200&q=85"
            alt="Freshly roasted coffee beans"
          />
        </div>
        <div>
          <p className="eyebrow">Roasted with intention</p>
          <h2>Freshness you can taste.</h2>
          <p>
            We roast throughout the week and ship quickly, giving every bag the time it needs to rest before
            it reaches your brewer. The result is a more expressive, balanced cup.
          </p>
          <Link className="primary-link" to="/">
            Shop our coffee
          </Link>
        </div>
      </section>
    </main>
  );
};

export default OurStory;
