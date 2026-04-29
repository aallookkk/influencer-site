import { useState, useEffect, useRef } from "react";

const USER_CONFIG = {
  name: "Aanya Wanderer",
  handle: "@aanya.wanderer",
  tagline: "Content Creator · Brand Partner · Visual Storyteller",
  socials: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    snapchat: "https://snapchat.com"
  },
  bio: "Somewhere between a café in Mumbai and a temple in Rajasthan, I craft stories that linger. I believe beauty lives in the unhurried — in morning chai, in old stone corridors, in the quiet magic of everyday India.",
  stats: [
    { label: "Total Reach",      value: "2.4M" },
    { label: "IG Followers",     value: "890K" },
    { label: "Engagement Rate",  value: "6.8%" },
    { label: "Avg. Story Views", value: "310K" },
  ],
  heroImage: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=1200&q=80",
  brands: [
    { id: 1, name: "Luxury Stay", category: "Travel", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80" },
    { id: 2, name: "Organic Glow", category: "Beauty", image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&q=80" },
    { id: 3, name: "Urban Chic", category: "Fashion", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80" },
    { id: 4, name: "Heritage Edit", category: "Lifestyle", image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&q=80" }
  ],
  contact: { email: "collabs@aanya.com", location: "Mumbai, India" }
};

const THEMES = {
  dark: { bg: "#0a0a0a", text: "#f0ece4", accent: "#ff4b2b", surface: "#141414", border: "#1c1c1c", muted: "#888" },
  light: { bg: "#fcfaf7", text: "#1a1a1a", accent: "#ff4b2b", surface: "#ffffff", border: "#e5e0d8", muted: "#666" }
};

function PulseDot() {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
      <span style={{
        display: "inline-block", width: 8, height: 8, borderRadius: "50%",
        background: "var(--accent)", boxShadow: "0 0 10px var(--accent)",
        animation: "pulse 1.5s ease-out infinite",
      }} />
      <span style={{ fontSize: 11, letterSpacing: "0.2em", color: "var(--accent)", fontWeight: 700 }}>LIVE</span>
    </span>
  );
}

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(true);
  const C = USER_CONFIG;
  const theme = darkMode ? THEMES.dark : THEMES.light;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Montserrat:wght@400;600;700&display=swap');
        :root { --bg: ${theme.bg}; --text: ${theme.text}; --accent: ${theme.accent}; --surface: ${theme.surface}; --border: ${theme.border}; --muted: ${theme.muted}; }
        body { background: var(--bg); color: var(--text); font-family: 'Montserrat', sans-serif; transition: 0.5s; margin: 0; }
        @keyframes pulse { 0% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.2); } 100% { opacity: 1; transform: scale(1); } }
        .social-icon { font-size: 24px; color: var(--text); text-decoration: none; transition: 0.3s; opacity: 0.6; }
        .social-icon:hover { opacity: 1; color: var(--accent); transform: translateY(-3px); }
      `}</style>

      {/* Hero Section */}
      <section style={{ height: "100vh", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img src={C.heroImage} style={{ position: "absolute", width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.5)" }} />
        <div style={{ position: "relative", textAlign: "center", zIndex: 2 }}>
          <p style={{ color: "#c9a96e", letterSpacing: "0.4em", fontSize: 12, marginBottom: 20 }}>{C.handle.toUpperCase()}</p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(50px, 10vw, 100px)", margin: 0 }}>{C.name}</h1>
          <p style={{ letterSpacing: "0.2em", fontSize: 10, marginTop: 10, opacity: 0.8 }}>{C.tagline.toUpperCase()}</p>
        </div>
      </section>

      {/* Stats Bar */}
      <section style={{ background: "var(--surface)", borderY: "1px solid var(--border)", padding: "40px 20px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
          <div style={{ width: "100%", marginBottom: 20 }}><PulseDot /></div>
          {C.stats.map(s => (
            <div key={s.label} style={{ textAlign: "center", flex: "1 1 150px" }}>
              <h2 style={{ fontSize: 32, margin: 0 }}>{s.value}</h2>
              <p style={{ fontSize: 10, color: "var(--muted)", letterSpacing: "0.1em" }}>{s.label.toUpperCase()}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Social Section */}
      <section style={{ padding: "80px 20px", textAlign: "center", background: "var(--bg)" }}>
        <p style={{ fontSize: 10, letterSpacing: "0.3em", color: "var(--accent)", marginBottom: 30 }}>CONNECT</p>
        <div style={{ display: "flex", justifyContent: "center", gap: "40px" }}>
          <a href={C.socials.instagram} className="social-icon">IG</a>
          <a href={C.socials.facebook} className="social-icon">FB</a>
          <a href={C.socials.twitter} className="social-icon">X</a>
          <a href={C.socials.snapchat} className="social-icon">SC</a>
        </div>
      </section>

      <button onClick={() => setDarkMode(!darkMode)} style={{ position: "fixed", bottom: 30, right: 30, width: 50, height: 50, borderRadius: "50%", background: "var(--text)", color: "var(--bg)", border: "none", cursor: "pointer", fontSize: 20 }}>
        {darkMode ? "☼" : "☾"}
      </button>
    </>
  );
}
