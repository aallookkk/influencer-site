import { useState, useEffect, useRef } from "react";

// ============================================================
// USER_CONFIG — Edit this object to update all portfolio data.
// ============================================================
const USER_CONFIG = {
  name: "Aanya Wanderer",
  handle: "@aanya.wanderer",
  tagline: "Content Creator · Brand Partner · Visual Storyteller",
  instagramUrl: "https://www.instagram.com/aanya.wanderer/",
  bio: "Somewhere between a café in Mumbai and a temple in Rajasthan, I craft stories that linger. I believe beauty lives in the unhurried — in morning chai, in old stone corridors, in the quiet magic of everyday India.",
  stats: [
    { label: "Total Reach",      value: "2.4M" },
    { label: "IG Followers",     value: "890K" },
    { label: "Engagement Rate",  value: "6.8%" },
    { label: "Avg. Story Views", value: "310K" },
  ],
  // Hero: warm-toned portrait style
  heroImage: "https://picsum.photos/seed/aanya-hero/1200/1600",
  brands: [
    { id: 1, name: "Café Culture Collab",    category: "Lifestyle",   image: "https://picsum.photos/seed/cafe-collab/600/800" },
    { id: 2, name: "Festive Wear Campaign",  category: "Fashion",     image: "https://picsum.photos/seed/festive-fashion/600/800" },
    { id: 3, name: "Rajasthan Heritage Edit",category: "Travel",      image: "https://picsum.photos/seed/rajasthan-edit/600/800" },
    { id: 4, name: "Saree Stories",          category: "Fashion",     image: "https://picsum.photos/seed/saree-stories/600/800" },
    { id: 5, name: "Minimal Living",         category: "Home & Decor",image: "https://picsum.photos/seed/minimal-living/600/800" },
    { id: 6, name: "Golden Hour Mumbai",     category: "Lifestyle",   image: "https://picsum.photos/seed/golden-mumbai/600/800" },
    { id: 7, name: "Skincare Ritual",        category: "Beauty",      image: "https://picsum.photos/seed/skincare-ritual/600/800" },
    { id: 8, name: "Kitchen Chronicles",     category: "Food",        image: "https://picsum.photos/seed/kitchen-chronicles/600/800" },
  ],
  contact: {
    email:    "collabs@aanyawanderer.com",
    manager:  "management@aanyawanderer.com",
    location: "Mumbai, India",
  },
};

/* ── Utility: Fade-in on scroll ── */
function useFadeIn() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

/* ── Red Live Pulse Dot ── */
function PulseDot({ theme }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
      <span style={{
        display: "inline-block", width: 9, height: 9, borderRadius: "50%",
        background: "#e63946",
        boxShadow: "0 0 0 0 rgba(230,57,70,0.55)",
        animation: "livePulse 1.6s ease-out infinite",
        flexShrink: 0,
      }} />
      <span style={{
        fontSize: 10,
        letterSpacing: "0.22em",
        color: "#e63946",
        fontFamily: "'Montserrat', sans-serif",
        fontWeight: 700,
        textTransform: "uppercase",
      }}>Live Analytics</span>
    </span>
  );
}

/* ── Theme Toggle Button ── */
function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === "dark";
  return (
    <button
      onClick={onToggle}
      aria-label="Toggle theme"
      style={{
        background: isDark ? "#1e1e1e" : "#f0ede8",
        border: isDark ? "1px solid #2e2e2e" : "1px solid #d8d0c4",
        borderRadius: 20,
        width: 48,
        height: 26,
        cursor: "pointer",
        position: "relative",
        transition: "background 0.3s ease, border-color 0.3s ease",
        flexShrink: 0,
      }}
    >
      <span style={{
        position: "absolute",
        top: 3,
        left: isDark ? 24 : 3,
        width: 18,
        height: 18,
        borderRadius: "50%",
        background: isDark ? "#c9a96e" : "#8a7558",
        transition: "left 0.3s ease, background 0.3s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 10,
      }}>
        {isDark ? "☀" : "☽"}
      </span>
    </button>
  );
}

/* ── Contact Modal ── */
function ContactModal({ onClose, theme }) {
  const [sent, setSent] = useState(false);
  const isDark = theme === "dark";
  const T = {
    bg: isDark ? "#141414" : "#faf8f5",
    border: isDark ? "#2a2a2a" : "#e2dcd4",
    inputBg: isDark ? "#1c1c1c" : "#f0ede8",
    inputBorder: isDark ? "#2e2e2e" : "#ddd6cc",
    textPrimary: isDark ? "#f0ece4" : "#1a1a1a",
    textSecondary: isDark ? "#888" : "#888",
    closeColor: isDark ? "#666" : "#aaa",
  };
  const handleSubmit = (e) => { e.preventDefault(); setSent(true); };
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: isDark ? "rgba(5,5,5,0.85)" : "rgba(20,15,10,0.6)",
        backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "20px",
        animation: "fadeIn 0.25s ease",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: T.bg,
          border: `1px solid ${T.border}`,
          borderRadius: 4,
          padding: "clamp(32px, 6vw, 52px) clamp(24px, 5vw, 44px)",
          maxWidth: 480, width: "100%",
          animation: "slideUp 0.3s ease",
          position: "relative",
          boxShadow: isDark ? "0 32px 80px rgba(0,0,0,0.6)" : "0 32px 80px rgba(0,0,0,0.14)",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: 18, right: 22,
            background: "none", border: "none", color: T.closeColor, fontSize: 22,
            cursor: "pointer", lineHeight: 1, transition: "color 0.2s",
          }}
          onMouseEnter={e => e.target.style.color = "#c9a96e"}
          onMouseLeave={e => e.target.style.color = T.closeColor}
        >×</button>

        {!sent ? (
          <>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: T.textPrimary, marginBottom: 4, fontWeight: 700 }}>
              Work With Me
            </p>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, color: T.textSecondary, letterSpacing: "0.08em", marginBottom: 30 }}>
              For brand partnerships & collaborations
            </p>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { name: "name",  placeholder: "Your Name",       type: "text" },
                { name: "brand", placeholder: "Brand / Company", type: "text" },
                { name: "email", placeholder: "Email Address",   type: "email" },
              ].map(f => (
                <input
                  key={f.name} type={f.type} placeholder={f.placeholder} required
                  style={{
                    background: T.inputBg, border: `1px solid ${T.inputBorder}`,
                    borderRadius: 2, padding: "13px 16px",
                    color: T.textPrimary, fontFamily: "'Montserrat', sans-serif", fontSize: 13,
                    outline: "none", transition: "border-color 0.2s",
                  }}
                  onFocus={e => e.target.style.borderColor = "#c9a96e"}
                  onBlur={e => e.target.style.borderColor = T.inputBorder}
                />
              ))}
              <textarea
                placeholder="Tell me about your campaign…"
                rows={4}
                style={{
                  background: T.inputBg, border: `1px solid ${T.inputBorder}`,
                  borderRadius: 2, padding: "13px 16px",
                  color: T.textPrimary, fontFamily: "'Montserrat', sans-serif", fontSize: 13,
                  outline: "none", resize: "vertical", transition: "border-color 0.2s",
                }}
                onFocus={e => e.target.style.borderColor = "#c9a96e"}
                onBlur={e => e.target.style.borderColor = T.inputBorder}
              />
              <button
                type="submit"
                style={{
                  marginTop: 6, padding: "15px", background: "#c9a96e",
                  border: "none", borderRadius: 2, cursor: "pointer",
                  fontFamily: "'Montserrat', sans-serif", fontWeight: 700,
                  fontSize: 11, letterSpacing: "0.2em", color: "#0a0a0a",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={e => e.target.style.opacity = "0.85"}
                onMouseLeave={e => e.target.style.opacity = "1"}
              >SEND INQUIRY</button>
            </form>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "32px 0" }}>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, color: "#c9a96e", marginBottom: 16 }}>✦</p>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: T.textPrimary, marginBottom: 10 }}>Message Received</p>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12, color: T.textSecondary, letterSpacing: "0.08em" }}>
              I'll be in touch within 48 hours.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Brand Card ── */
function BrandCard({ brand }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative", overflow: "hidden",
        aspectRatio: "3/4", cursor: "default",
        background: "#111",
        borderRadius: 2,
      }}
    >
      <img
        src={brand.image}
        alt={brand.name}
        style={{
          width: "100%", height: "100%", objectFit: "cover",
          filter: hovered ? "grayscale(0%) brightness(0.9)" : "grayscale(100%) brightness(0.72)",
          transform: hovered ? "scale(1.05)" : "scale(1)",
          transition: "filter 0.55s ease, transform 0.6s ease",
          display: "block",
        }}
      />
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(0,0,0,0.78) 0%, transparent 55%)",
        opacity: hovered ? 1 : 0.55,
        transition: "opacity 0.4s ease",
      }} />
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "20px 16px",
        transform: hovered ? "translateY(0)" : "translateY(5px)",
        transition: "transform 0.35s ease",
      }}>
        <p style={{
          fontFamily: "'Montserrat', sans-serif", fontSize: 9,
          letterSpacing: "0.24em", color: "#c9a96e", marginBottom: 5, fontWeight: 700,
        }}>{brand.category.toUpperCase()}</p>
        <p style={{
          fontFamily: "'Playfair Display', serif", fontSize: 15,
          color: "#f0ece4", fontWeight: 500, lineHeight: 1.3,
        }}>{brand.name}</p>
      </div>
    </div>
  );
}

/* ── Stat Item ── */
function StatItem({ stat, index, theme }) {
  const [ref, visible] = useFadeIn();
  const isDark = theme === "dark";
  return (
    <div
      ref={ref}
      className="stat-item"
      style={{
        flex: "1 1 140px", textAlign: "center",
        padding: "clamp(20px,3vw,32px) 12px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(14px)",
        transition: `opacity 0.6s ease ${index * 0.12}s, transform 0.6s ease ${index * 0.12}s`,
      }}
    >
      <p style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(26px, 4.5vw, 44px)",
        color: isDark ? "#f0ece4" : "#1a1412",
        fontWeight: 700, marginBottom: 6, lineHeight: 1,
      }}>{stat.value}</p>
      <p style={{
        fontFamily: "'Montserrat', sans-serif", fontSize: 9,
        letterSpacing: "0.2em", color: isDark ? "#666" : "#a89880", fontWeight: 600,
      }}>{stat.label.toUpperCase()}</p>
    </div>
  );
}

/* ══════════════════════════════════════
   MAIN PORTFOLIO COMPONENT
══════════════════════════════════════ */
export default function Portfolio() {
  const [modalOpen, setModalOpen]   = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const [theme, setTheme]           = useState("dark");
  const [heroRef, heroVisible]      = useFadeIn();
  const [bioRef, bioVisible]        = useFadeIn();
  const [galleryRef, galleryVisible]= useFadeIn();
  const [ctaRef, ctaVisible]        = useFadeIn();

  const isDark = theme === "dark";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const C = USER_CONFIG;

  /* ── Theme tokens ── */
  const T = {
    pageBg:        isDark ? "#0a0a0a"    : "#faf8f5",
    headerBg:      isDark ? "rgba(10,10,10,0.92)"  : "rgba(250,248,245,0.94)",
    headerBorder:  isDark ? "#1c1c1c"   : "#e0d8ce",
    sectionBorder: isDark ? "#1c1c1c"   : "#e0d8ce",
    statsBg:       isDark ? "#0d0d0d"   : "#f4f0ea",
    textPrimary:   isDark ? "#f0ece4"   : "#1a1412",
    textSecondary: isDark ? "#888"      : "#917e6a",
    textMuted:     isDark ? "#444"      : "#c0b4a4",
    textDim:       isDark ? "#333"      : "#d4c8ba",
    gold:          "#c9a96e",
    goldLight:     isDark ? "#c9a96e"   : "#a07840",
    dividerLine:   isDark ? "#1c1c1c"   : "#e0d8ce",
    nameFoot:      isDark ? "#333"      : "#c0b4a4",
    footerBg:      isDark ? "transparent" : "transparent",
  };

  return (
    <>
      {/* ── Global styles ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Montserrat:wght@300;400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: ${T.pageBg}; color: ${T.textPrimary}; font-family: 'Montserrat', sans-serif; transition: background 0.4s ease, color 0.4s ease; }
        ::selection { background: #c9a96e33; }

        @keyframes livePulse {
          0%   { box-shadow: 0 0 0 0 rgba(230,57,70,0.65); }
          60%  { box-shadow: 0 0 0 9px rgba(230,57,70,0); }
          100% { box-shadow: 0 0 0 0 rgba(230,57,70,0); }
        }
        @keyframes fadeIn  { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes heroReveal { from { opacity: 0; transform: scale(1.05); } to { opacity: 1; transform: scale(1); } }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        input, textarea { font-family: 'Montserrat', sans-serif; }

        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: ${T.pageBg}; }
        ::-webkit-scrollbar-thumb { background: ${isDark ? "#2e2e2e" : "#d4c8ba"}; border-radius: 2px; }

        /* Brand gallery grid */
        .brand-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 3px;
        }
        @media (min-width: 640px) {
          .brand-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (min-width: 1024px) {
          .brand-grid { grid-template-columns: repeat(4, 1fr); }
        }

        /* Stats responsive */
        .stats-row {
          display: flex;
          flex-wrap: wrap;
        }
        .stat-item {
          border-right: 1px solid ${T.dividerLine};
        }
        @media (max-width: 600px) {
          .stat-item {
            border-right: none !important;
            border-bottom: 1px solid ${T.dividerLine};
            flex-basis: 50%;
          }
          .stat-item:nth-child(odd) {
            border-right: 1px solid ${T.dividerLine} !important;
          }
          .stat-item:nth-last-child(-n+2) {
            border-bottom: none;
          }
        }
        @media (min-width: 601px) {
          .stat-item:last-child { border-right: none; }
        }

        /* Mobile hero text adjustment */
        @media (max-width: 480px) {
          .hero-tagline { display: none; }
          .hero-rule { width: 28px; margin-bottom: 14px; }
        }

        /* CTA responsive */
        @media (max-width: 480px) {
          .cta-contacts { flex-direction: column; gap: 28px !important; align-items: center; }
        }

        /* Footer responsive */
        @media (max-width: 540px) {
          .footer-inner { flex-direction: column; align-items: center; text-align: center; gap: 12px !important; }
        }

        /* Live badge pill */
        .live-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: ${isDark ? "rgba(230,57,70,0.08)" : "rgba(230,57,70,0.06)"};
          border: 1px solid rgba(230,57,70,0.22);
          border-radius: 20px;
          padding: 5px 12px 5px 10px;
        }
      `}</style>

      {/* ── Sticky Header ── */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 clamp(16px, 4vw, 32px)",
        height: scrolled ? 58 : 0,
        overflow: "hidden",
        background: T.headerBg,
        backdropFilter: "blur(14px)",
        borderBottom: scrolled ? `1px solid ${T.headerBorder}` : "none",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        transition: "height 0.35s ease, background 0.4s ease, border-color 0.4s ease",
      }}>
        <p style={{
          fontFamily: "'Playfair Display', serif", fontSize: 15,
          color: T.textPrimary, fontWeight: 600, letterSpacing: "0.04em",
          opacity: scrolled ? 1 : 0, transition: "opacity 0.3s ease 0.1s, color 0.4s ease",
        }}>{C.name}</p>

        <div style={{ display: "flex", alignItems: "center", gap: 14, opacity: scrolled ? 1 : 0, transition: "opacity 0.3s ease 0.1s" }}>
          <ThemeToggle theme={theme} onToggle={() => setTheme(t => t === "dark" ? "light" : "dark")} />
          <button
            onClick={() => setModalOpen(true)}
            style={{
              background: "none", border: `1px solid ${T.gold}`,
              padding: "7px 18px", cursor: "pointer",
              fontFamily: "'Montserrat', sans-serif", fontSize: 10,
              letterSpacing: "0.18em", color: T.gold, fontWeight: 700,
              borderRadius: 2, transition: "background 0.25s, color 0.25s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = T.gold; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = T.gold; }}
          >CONTACT</button>
        </div>
      </header>

      {/* ── Floating theme toggle (hero) ── */}
      <div style={{
        position: "fixed",
        top: 24,
        right: "clamp(16px, 4vw, 32px)",
        zIndex: 99,
        opacity: scrolled ? 0 : 1,
        pointerEvents: scrolled ? "none" : "auto",
        transition: "opacity 0.3s ease",
      }}>
        <ThemeToggle theme={theme} onToggle={() => setTheme(t => t === "dark" ? "light" : "dark")} />
      </div>

      {/* ─────────────────────────────────────────────
          SECTION 1 — HERO
      ───────────────────────────────────────────── */}
      <section style={{ position: "relative", height: "100svh", minHeight: 580, overflow: "hidden" }}>
        {/* Hero image */}
        <div style={{ position: "absolute", inset: 0, animation: "heroReveal 1.2s ease forwards" }}>
          <img
            src={C.heroImage}
            alt={C.name}
            style={{
              width: "100%", height: "100%", objectFit: "cover",
              objectPosition: "center top",
              filter: isDark ? "brightness(0.52)" : "brightness(0.62)",
            }}
          />
        </div>

        {/* Gradient overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: isDark
            ? "linear-gradient(to bottom, rgba(10,10,10,0.08) 0%, rgba(10,10,10,0.18) 45%, rgba(10,10,10,0.92) 100%)"
            : "linear-gradient(to bottom, rgba(250,248,245,0.05) 0%, rgba(250,248,245,0.1) 45%, rgba(250,248,245,0.88) 100%)",
          transition: "background 0.4s ease",
        }} />

        {/* Gold line top */}
        <div style={{
          position: "absolute", top: 44, left: "50%", transform: "translateX(-50%)",
          width: 1, height: 56, background: "linear-gradient(to bottom, transparent, rgba(201,169,110,0.7))",
          animation: "fadeIn 1s ease 0.8s both",
        }} />

        {/* Handle */}
        <div style={{
          position: "absolute", top: 112, left: 0, right: 0,
          textAlign: "center",
          animation: "slideUp 0.9s ease 0.4s both",
        }}>
          <a href={C.instagramUrl} target="_blank" rel="noreferrer"
            style={{
              fontFamily: "'Montserrat', sans-serif", fontSize: 10,
              letterSpacing: "0.28em", color: T.gold, textDecoration: "none", fontWeight: 700,
            }}>
            {C.handle}
          </a>
        </div>

        {/* Name & tagline */}
        <div style={{
          position: "absolute", bottom: "11%", left: 0, right: 0,
          padding: "0 clamp(20px, 5vw, 48px)",
          animation: "slideUp 0.9s ease 0.6s both",
        }}>
          <div className="hero-rule" style={{ width: 40, height: 1, background: T.gold, marginBottom: 20 }} />
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(38px, 8.5vw, 100px)",
            fontWeight: 700, lineHeight: 0.93,
            color: isDark ? "#f0ece4" : "#f5f0e8",
            letterSpacing: "-0.02em",
            marginBottom: 18,
            textShadow: isDark ? "none" : "0 2px 20px rgba(0,0,0,0.25)",
          }}>
            {C.name.split(" ").map((word, i) => (
              <span key={i} style={{ display: "block", fontStyle: i === 1 ? "italic" : "normal" }}>{word}</span>
            ))}
          </h1>
          <p className="hero-tagline" style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "clamp(9px, 1.6vw, 11px)",
            letterSpacing: "0.22em", color: "rgba(240,236,228,0.75)", fontWeight: 500,
            maxWidth: 380,
          }}>{C.tagline.toUpperCase()}</p>
        </div>

        {/* Scroll cue */}
        <div style={{
          position: "absolute", bottom: 26, left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 7,
          animation: "fadeIn 1s ease 1.3s both",
        }}>
          <p style={{
            fontFamily: "'Montserrat', sans-serif", fontSize: 8,
            letterSpacing: "0.3em", color: "rgba(240,236,228,0.45)", fontWeight: 600,
          }}>SCROLL</p>
          <div style={{ width: 1, height: 30, background: "linear-gradient(to bottom, rgba(201,169,110,0.6), transparent)" }} />
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          SECTION 2 — LIVE STATS BAR
      ───────────────────────────────────────────── */}
      <section style={{
        borderTop: `1px solid ${T.sectionBorder}`,
        borderBottom: `1px solid ${T.sectionBorder}`,
        background: T.statsBg,
        transition: "background 0.4s ease, border-color 0.4s ease",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {/* Live indicator row */}
          <div style={{
            padding: "clamp(14px, 2.5vw, 20px) clamp(16px, 4vw, 32px) 0",
            display: "flex", alignItems: "center", gap: 16,
          }}>
            <div className="live-badge">
              <span style={{
                display: "inline-block", width: 8, height: 8, borderRadius: "50%",
                background: "#e63946",
                animation: "livePulse 1.6s ease-out infinite",
                flexShrink: 0,
              }} />
              <span style={{
                fontSize: 9, letterSpacing: "0.24em", color: "#e63946",
                fontFamily: "'Montserrat', sans-serif", fontWeight: 700,
              }}>LIVE</span>
            </div>
            <div style={{ flex: 1, height: 1, background: T.dividerLine }} />
            <span style={{
              fontFamily: "'Montserrat', sans-serif", fontSize: 9,
              color: T.textMuted, letterSpacing: "0.12em",
            }}>UPDATED DAILY</span>
          </div>

          {/* Stats */}
          <div className="stats-row">
            {C.stats.map((s, i) => <StatItem key={s.label} stat={s} index={i} theme={theme} />)}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          SECTION 3 — BIOGRAPHY
      ───────────────────────────────────────────── */}
      <section ref={bioRef} style={{
        maxWidth: 900, margin: "0 auto",
        padding: "clamp(64px, 10vw, 130px) clamp(20px, 5vw, 32px)",
        opacity: bioVisible ? 1 : 0,
        transform: bioVisible ? "translateY(0)" : "translateY(26px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
      }}>
        {/* Section label */}
        <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 44 }}>
          <span style={{
            fontFamily: "'Montserrat', sans-serif", fontSize: 9,
            letterSpacing: "0.3em", color: T.goldLight, fontWeight: 700,
          }}>ABOUT</span>
          <div style={{ flex: 1, height: 1, background: T.dividerLine }} />
          <span style={{
            fontFamily: "'Montserrat', sans-serif", fontSize: 10,
            letterSpacing: "0.12em", color: T.textDim,
          }}>01</span>
        </div>

        <p style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(18px, 3vw, 28px)",
          fontWeight: 400, lineHeight: 1.7,
          color: isDark ? "#d8d4cc" : "#5a4e42",
          fontStyle: "italic",
          maxWidth: 720,
          transition: "color 0.4s ease",
        }}>
          "{C.bio}"
        </p>

        {/* IG link */}
        <div style={{ marginTop: 44 }}>
          <a
            href={C.instagramUrl} target="_blank" rel="noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 12,
              fontFamily: "'Montserrat', sans-serif", fontSize: 10,
              letterSpacing: "0.2em", color: T.textPrimary,
              textDecoration: "none", fontWeight: 700,
              borderBottom: `1px solid ${T.sectionBorder}`,
              paddingBottom: 8,
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = T.gold; e.currentTarget.style.color = T.gold; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = T.sectionBorder; e.currentTarget.style.color = T.textPrimary; }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
            FOLLOW ON INSTAGRAM
          </a>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          SECTION 4 — BRAND GALLERY
      ───────────────────────────────────────────── */}
      <section ref={galleryRef} style={{
        opacity: galleryVisible ? 1 : 0,
        transform: galleryVisible ? "translateY(0)" : "translateY(26px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
      }}>
        <div style={{
          maxWidth: 1400, margin: "0 auto",
          padding: "0 clamp(16px, 4vw, 32px)",
          display: "flex", alignItems: "center", gap: 18, marginBottom: 36,
        }}>
          <span style={{
            fontFamily: "'Montserrat', sans-serif", fontSize: 9,
            letterSpacing: "0.3em", color: T.goldLight, fontWeight: 700,
          }}>COLLABORATIONS</span>
          <div style={{ flex: 1, height: 1, background: T.dividerLine }} />
          <span style={{
            fontFamily: "'Montserrat', sans-serif", fontSize: 10,
            letterSpacing: "0.12em", color: T.textDim,
          }}>02</span>
        </div>

        <div className="brand-grid" style={{ gap: 3 }}>
          {C.brands.map(b => <BrandCard key={b.id} brand={b} />)}
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          SECTION 5 — CTA / CONTACT
      ───────────────────────────────────────────── */}
      <section ref={ctaRef} style={{
        maxWidth: 860, margin: "0 auto",
        padding: "clamp(72px, 11vw, 130px) clamp(20px, 5vw, 32px)",
        opacity: ctaVisible ? 1 : 0,
        transform: ctaVisible ? "translateY(0)" : "translateY(26px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
        textAlign: "center",
      }}>
        {/* Section label */}
        <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 52 }}>
          <div style={{ flex: 1, height: 1, background: T.dividerLine }} />
          <span style={{
            fontFamily: "'Montserrat', sans-serif", fontSize: 9,
            letterSpacing: "0.3em", color: T.goldLight, fontWeight: 700,
          }}>PARTNERSHIPS</span>
          <div style={{ flex: 1, height: 1, background: T.dividerLine }} />
        </div>

        <p style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(30px, 6vw, 66px)",
          fontWeight: 700, lineHeight: 1.06,
          color: T.textPrimary,
          marginBottom: 20,
          transition: "color 0.4s ease",
        }}>
          Let's build<br />
          <em style={{ fontStyle: "italic", color: T.gold }}>something</em><br />
          beautiful.
        </p>

        <p style={{
          fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(11px, 2vw, 13px)",
          color: T.textSecondary, lineHeight: 1.85, maxWidth: 440,
          margin: "0 auto 44px",
          transition: "color 0.4s ease",
        }}>
          Available for brand campaigns, editorial content,<br />
          event appearances, and long-term partnerships.
        </p>

        <button
          onClick={() => setModalOpen(true)}
          style={{
            display: "inline-block",
            padding: "clamp(14px,2.5vw,18px) clamp(32px,5vw,52px)",
            background: "transparent",
            border: `1px solid ${T.gold}`,
            color: T.gold,
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 11, letterSpacing: "0.22em", fontWeight: 700,
            cursor: "pointer",
            transition: "background 0.3s ease, color 0.3s ease, border-color 0.3s ease",
            borderRadius: 2,
          }}
          onMouseEnter={e => { e.currentTarget.style.background = T.gold; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = T.gold; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = T.gold; e.currentTarget.style.borderColor = T.gold; }}
        >
          WORK WITH ME
        </button>

        {/* Direct contacts */}
        <div className="cta-contacts" style={{
          display: "flex", justifyContent: "center", gap: "clamp(20px, 5vw, 56px)",
          marginTop: 56,
          flexWrap: "wrap",
        }}>
          {[
            { label: "GENERAL INQUIRIES", value: C.contact.email },
            { label: "MANAGEMENT",        value: C.contact.manager },
            { label: "BASED IN",          value: C.contact.location },
          ].map(item => (
            <div key={item.label} style={{ textAlign: "center" }}>
              <p style={{
                fontFamily: "'Montserrat', sans-serif", fontSize: 8,
                letterSpacing: "0.24em", color: T.textMuted, marginBottom: 7, fontWeight: 700,
                transition: "color 0.4s ease",
              }}>{item.label}</p>
              <p style={{
                fontFamily: "'Montserrat', sans-serif", fontSize: 12,
                color: T.textSecondary, transition: "color 0.4s ease",
              }}>{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{
        borderTop: `1px solid ${T.sectionBorder}`,
        padding: "clamp(20px, 3vw, 32px) clamp(16px, 4vw, 32px)",
        transition: "border-color 0.4s ease",
      }}>
        <div className="footer-inner" style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: 14,
        }}>
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 14, color: T.textSecondary, fontWeight: 600,
            letterSpacing: "0.04em", transition: "color 0.4s ease",
          }}>{C.name}</p>
          <p style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 9, color: T.textMuted,
            letterSpacing: "0.14em", transition: "color 0.4s ease",
          }}>© {new Date().getFullYear()} · ALL RIGHTS RESERVED</p>
          <a
            href={C.instagramUrl} target="_blank" rel="noreferrer"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 9, color: T.textSecondary,
              textDecoration: "none", letterSpacing: "0.18em",
              transition: "color 0.2s",
            }}
            onMouseEnter={e => e.target.style.color = T.gold}
            onMouseLeave={e => e.target.style.color = T.textSecondary}
          >
            INSTAGRAM ↗
          </a>
        </div>
      </footer>

      {/* ── Modal ── */}
      {modalOpen && <ContactModal onClose={() => setModalOpen(false)} theme={theme} />}
    </>
  );
}
