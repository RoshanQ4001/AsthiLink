import "./home.css";

export default function Home() {
  return (
    <main className="home">
      <nav className="nav">
        <h1 className="logo">AesthiLink</h1>
        <div className="nav-actions">
          <a href="/login">Login</a>
          <a href="/signup" className="primary">Get Started</a>
        </div>
      </nav>

      <section className="hero">
        <h2>
          One link. <br />
          All your presence.
        </h2>

        <p>
          Build a beautiful bio link page for Instagram, GitHub, LinkedIn,
          and everything you do — no code needed.
        </p>

        <div className="hero-actions">
          <a href="/signup" className="cta">Create your link</a>
          <a href="#preview" className="secondary">See example</a>
        </div>
      </section>
    </main>
  );
}
