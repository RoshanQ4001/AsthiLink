"use client";
import { useEffect } from "react";
import "./home.css";

export default function Home() {
  useEffect(() => {
    const items = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.15 }
    );

    items.forEach(i => observer.observe(i));
  }, []);

  return (
    <main className="home">

      {/* ---------------- HERO ---------------- */}
      <section className="hero">
        <div className="blob pink"></div>
        <div className="blob lavender"></div>
        <div className="blob mint"></div>

        <div className="hero-content reveal">
          <h1>
            Your vibe deserves  
            <span> a better link.</span>
          </h1>
          <p>
            AesthiLink helps you build a colorful, aesthetic profile
            that actually feels like *you*.
          </p>
          <button className="cta">Create your profile ✨</button>
        </div>

        <div className="hero-mockup reveal">
          <div className="phone">
            <div className="profile-card pastel-1">
              <img src="https://i.pravatar.cc/150?img=47" />
              <h3>mila.exe</h3>
              <p>designer • coffee • soft vibes</p>
              <div className="link">🌸 Portfolio</div>
              <div className="link">🎵 Spotify</div>
              <div className="link">📷 Instagram</div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- FEATURES ---------------- */}
      <section className="features reveal">
        <h2>Everything you need to look aesthetic</h2>

        <div className="feature-grid">
          {[
            ["🎨", "Custom themes", "Change colors, vibes & mood"],
            ["🔗", "Multiple links", "All your socials in one place"],
            ["🖼️", "Profile + bio", "Show your personality"],
            ["⚡", "Live editor", "Instant preview"],
            ["📱", "Mobile-first", "Looks perfect on phones"],
            ["🌍", "Shareable link", "One link everywhere"]
          ].map((f, i) => (
            <div key={i} className={`feature-card pastel-${(i % 4) + 1}`}>
              <span className="icon">{f[0]}</span>
              <h3>{f[1]}</h3>
              <p>{f[2]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- PREVIEW ---------------- */}
      <section className="preview reveal">
        <h2>Different vibes. Same you.</h2>
        <div className="preview-grid">
          <div className="mini-profile pastel-1">soft pink 🌸</div>
          <div className="mini-profile pastel-2">lavender dream 💜</div>
          <div className="mini-profile pastel-3">mint chill 🍃</div>
          <div className="mini-profile pastel-4">peach glow 🍑</div>
        </div>
      </section>

      {/* ---------------- WHY ---------------- */}
      <section className="why reveal">
        <h2>Why AesthiLink?</h2>
        <div className="why-lines">
          <p>✨ More aesthetic than Instagram</p>
          <p>💖 Your vibe. Your page.</p>
          <p>🎨 Designed for Gen-Z creators</p>
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="final-cta reveal">
        <h2>Ready to glow up your bio?</h2>
        <button className="cta big">Create your aesthetic page 🚀</button>
      </section>

    </main>
  );
}
