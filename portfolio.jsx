import { useState, useEffect, useRef } from "react";

// ============================================================
// USER_CONFIG — Edit this object to update all portfolio data.
// Designed for programmatic editing via bot/API.
// ============================================================
const USER_CONFIG = {
  // ── Identity ──────────────────────────────────────────────
  name: "Aanya Wanderer",
  handle: "@aanya.wanderer",
  tagline: "Content Creator · Brand Partner · Visual Storyteller",
  instagramUrl: "https://www.instagram.com/aanya.wanderer/",

  // ── Bio (keep under 50 words) ─────────────────────────────
  bio: "Somewhere between a café in Mumbai and a temple in Rajasthan, I craft stories that linger. I believe beauty lives in the unhurried — in morning chai, in old stone corridors, in the quiet magic of everyday India.",

  // ── Live Stats ────────────────────────────────────────────
  stats: [
    { label: "Total Reach",      value: "2.4M" },
    { label: "IG Followers",     value: "890K" },
    { label: "Engagement Rate",  value: "6.8%" },
    { label: "Avg. Story Views", value: "310K" },
  ],

  // ── Hero image (first real portrait) ─────────────────────
  // Using a data-URI placeholder; swap `src` with your hosted URL.
  heroImage: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=1200&q=80",

  // ── Brand Collaborations Gallery ─────────────────────────
  // grayscale → color on hover
  brands: [
    {
      id: 1,
      name: "Café Culture Collab",
      category: "Lifestyle",
      image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80",
    },
    {
      id: 2,
      name: "Festive Wear Campaign",
      category: "Fashion",
      image: "https://images.unsplash.com/photo-1583391733981-8498408ee4b6?w=600&q=80",
    },
    {
      id: 3,
      name: "Rajasthan Heritage Edit",
      category: "Travel",
      image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&q=80",
    },
    {
      id: 4,
      name: "Saree Stories",
      category: "Fashion",
      image: "https://images.unsplash.com/photo-1610189352649-c40c7aca6f69?w=600&q=80",
    },
    {
      id: 5,
      name: "Minimal Living",
      category: "Home & Decor",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
    },
    {
      id: 6,
      name: "Golden Hour Mumbai",
      category: "Lifestyle",
      image: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=600&q=80",
    },
    {
      id: 7,
      name: "Skincare Ritual",
      category: "Beauty",
      image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&q=80",
    },
    {
      id: 8,
      name: "Kitchen Chronicles",
      category: "Food",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
    },
  ],

  // ── Contact ───────────────────────────────────────────────
  contact: {
    email:    "collabs@aanyawanderer.com",
    manager:  "management@aanyawanderer.com",
    location: "Mumbai, India",
  },
};
// ============================================================

/* ── Utility: Fade-in on scroll ── */
function useFadeIn() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

/* ── Pulse dot ── */
function PulseDot() {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
      <span style={{
        display: "inline-block", width: 8, height: 8, borderRadius: "50%",
        background: "#c9a96e",
        boxShadow: "0 0 0 0 rgba(201,169,110,0.6)",
        animation: "pulse 1.8s ease-out infinite",
      }} />
      <span style={{ fontSize: 11, letterSpacing: "0.18em", color: "#c9a96e", fontFamily: "'Montserrat', sans-serif", fontWeight: 600 }}>LIVE</span>
    </span>
  );
}

/* ── Modal ── */
function ContactModal({ onClose }) {
  const [sent, setSent] = useState(false);
  const handleSubmit = (e) => { e.preventDefault(); setSent(true); };
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(10,10,10,0.82)", backdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "20px",
        animation: "fadeIn 0.25s ease",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "#141414", border: "1px solid #2a2a2a",
          borderRadius: 2, padding: "52px 44px", maxWidth: 480, width: "100%",
          animation: "slideUp 0.3s ease",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: 20, right: 24,
            background: "none", border: "none", color: "#666", fontSize: 22,
            cursor: "pointer", lineHeight: 1,
          }}
        >×</button>

        {!sent ? (
          <>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, color: "#f0ece4", marginBottom: 6, fontWeight: 700 }}>
              Work With Me
            </p>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12, color: "#888", letterSpacing: "0.08em", marginBottom: 36 }}>
              For brand partnerships & collaborations
            </p>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { name: "name",    placeholder: "Your Name",         type: "text" },
                { name: "brand",   placeholder: "Brand / Company",   type: "text" },
                { name: "email",   placeholder: "Email Address",     type: "email" },
              ].map(f => (
                <input
                  key={f.name}
                  type={f.type}
                  placeholder={f.placeholder}
                  required
                  style={{
                    background: "#1c1c1c", border: "1px solid #2e2e2e",
                    borderRadius: 1, padding: "14px 18px",
                    color: "#f0ece4", fontFamily: "'Montserrat', sans-serif", fontSize: 13,
                    outline: "none", transition: "border-color 0.2s",
                  }}
                  onFocus={e => e.target.style.borderColor = "#c9a96e"}
                  onBlur={e => e.target.style.borderColor = "#2e2e2e"}
                />
              ))}
              <textarea
                placeholder="Tell me about your campaign…"
                rows={4}
                style={{
                  background: "#1c1c1c", border: "1px solid #2e2e2e",
                  borderRadius: 1, padding: "14px 18px",
                  color: "#f0ece4", fontFamily: "'Montserrat', sans-serif", fontSize: 13,
                  outline: "none", resize: "vertical", transition: "border-color 0.2s",
                }}
                onFocus={e => e.target.style.borderColor = "#c9a96e"}
                onBlur={e => e.target.style.borderColor = "#2e2e2e"}
              />
              <button
                type="submit"
                style={{
                  marginTop: 8, padding: "16px", background: "#c9a96e",
                  border: "none", borderRadius: 1, cursor: "pointer",
                  fontFamily: "'Montserrat', sans-serif", fontWeight: 700,
                  fontSize: 12, letterSpacing: "0.2em", color: "#0a0a0a",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={e => e.target.style.opacity = "0.88"}
                onMouseLeave={e => e.target.style.opacity = "1"}
              >
                SEND INQUIRY
              </button>
            </form>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "24px 0" }}>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: "#c9a96e", marginBottom: 16 }}>✦</p>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: "#f0ece4", marginBottom: 10 }}>Message Received</p>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12, color: "#888", letterSpacing: "0.08em" }}>
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
      }}
    >
      <img
        src={brand.image}
        alt={brand.name}
        style={{
          width: "100%", height: "100%", objectFit: "cover",
          filter: hovered ? "grayscale(0%) brightness(0.92)" : "grayscale(100%) brightness(0.75)",
          transform: hovered ? "scale(1.04)" : "scale(1)",
          transition: "filter 0.55s ease, transform 0.55s ease",
          display: "block",
        }}
      />
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 55%)",
        opacity: hovered ? 1 : 0.6,
        transition: "opacity 0.4s ease",
      }} />
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "20px 18px",
        transform: hovered ? "translateY(0)" : "translateY(4px)",
        transition: "transform 0.35s ease",
      }}>
        <p style={{
          fontFamily: "'Montserrat', sans-serif", fontSize: 9,
          letterSpacing: "0.22em", color: "#c9a96e", marginBottom: 5, fontWeight: 600,
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
function StatItem({ stat, index }) {
  const [ref, visible] = useFadeIn();
  return (
    <div
      ref={ref}
      style={{
        flex: "1 1 160px", textAlign: "center",
        padding: "28px 12px",
        borderRight: index < 3 ? "1px solid #222" : "none",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`,
      }}
    >
      <p style={{
        fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 5vw, 42px)",
        color: "#f0ece4", fontWeight: 700, marginBottom: 6, lineHeight: 1,
      }}>{stat.value}</p>
      <p style={{
        fontFamily: "'Montserrat', sans-serif", fontSize: 10,
        letterSpacing: "0.2em", color: "#666", fontWeight: 500,
      }}>{stat.label.toUpperCase()}</p>
    </div>
  );
}

/* ══════════════════════════════════════
   MAIN PORTFOLIO COMPONENT
══════════════════════════════════════ */
export default function Portfolio() {
  const [modalOpen, setModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [heroRef, heroVisible] = useFadeIn();
  const [bioRef, bioVisible] = useFadeIn();
  const [galleryRef, galleryVisible] = useFadeIn();
  const [ctaRef, ctaVisible] = useFadeIn();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const C = USER_CONFIG;

  return (
    <>
      {/* ── Global styles ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Montserrat:wght@300;400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #0a0a0a; color: #f0ece4; font-family: 'Montserrat', sans-serif; }
        ::selection { background: #c9a96e33; }

        @keyframes pulse {
          0%   { box-shadow: 0 0 0 0 rgba(201,169,110,0.6); }
          70%  { box-shadow: 0 0 0 10px rgba(201,169,110,0); }
          100% { box-shadow: 0 0 0 0 rgba(201,169,110,0); }
        }
        @keyframes fadeIn  { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes heroReveal { from { opacity: 0; transform: scale(1.04); } to { opacity: 1; transform: scale(1); } }

        input, textarea { font-family: 'Montserrat', sans-serif; }

        /* Scrollbar */
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: #2e2e2e; }

        /* Responsive grid for brand gallery */
        .brand-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2px;
        }
        @media (min-width: 768px) {
          .brand-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        /* Stats responsive */
        .stats-row {
          display: flex;
          flex-wrap: wrap;
        }
        @media (max-width: 600px) {
          .stats-row > * {
            border-right: none !important;
            border-bottom: 1px solid #222;
            flex-basis: 50%;
          }
          .stats-row > *:nth-child(odd) {
            border-right: 1px solid #222 !important;
          }
        }
      `}</style>

      {/* ── Sticky Header ── */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 28px",
        height: scrolled ? 56 : 0,
        overflow: "hidden",
        background: "rgba(10,10,10,0.92)",
        backdropFilter: "blur(12px)",
        borderBottom: scrolled ? "1px solid #1c1c1c" : "none",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        transition: "height 0.35s ease, border-bottom 0.35s ease",
      }}>
        <p style={{
          fontFamily: "'Playfair Display', serif", fontSize: 16,
          color: "#f0ece4", fontWeight: 600, letterSpacing: "0.04em",
          opacity: scrolled ? 1 : 0, transition: "opacity 0.3s ease 0.1s",
        }}>{C.name}</p>
        <button
          onClick={() => setModalOpen(true)}
          style={{
            background: "none", border: "1px solid #c9a96e",
            padding: "7px 20px", cursor: "pointer",
            fontFamily: "'Montserrat', sans-serif", fontSize: 10,
            letterSpacing: "0.18em", color: "#c9a96e", fontWeight: 600,
            opacity: scrolled ? 1 : 0, transition: "opacity 0.3s ease 0.1s",
            borderRadius: 0,
          }}
        >CONTACT</button>
      </header>

      {/* ─────────────────────────────────────────────
          SECTION 1 — HERO
      ───────────────────────────────────────────── */}
      <section style={{ position: "relative", height: "100svh", minHeight: 600, overflow: "hidden" }}>
        {/* Hero image */}
        <div style={{
          position: "absolute", inset: 0,
          animation: "heroReveal 1.2s ease forwards",
        }}>
          <img
            src={C.heroImage}
            alt={C.name}
            style={{
              width: "100%", height: "100%", objectFit: "cover",
              objectPosition: "center top",
              filter: "brightness(0.55)",
            }}
          />
        </div>

        {/* Gradient overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(10,10,10,0.1) 0%, rgba(10,10,10,0.2) 50%, rgba(10,10,10,0.88) 100%)",
        }} />

        {/* Decorative gold line */}
        <div style={{
          position: "absolute", top: 40, left: "50%", transform: "translateX(-50%)",
          width: 1, height: 60, background: "linear-gradient(to bottom, transparent, #c9a96e88)",
          animation: "fadeIn 1s ease 0.8s both",
        }} />

        {/* Top handle */}
        <div style={{
          position: "absolute", top: 116, left: 0, right: 0,
          textAlign: "center",
          animation: "slideUp 0.9s ease 0.4s both",
        }}>
          <a href={C.instagramUrl} target="_blank" rel="noreferrer"
            style={{
              fontFamily: "'Montserrat', sans-serif", fontSize: 11,
              letterSpacing: "0.28em", color: "#c9a96e", textDecoration: "none",
              fontWeight: 600,
            }}>
            {C.handle}
          </a>
        </div>

        {/* Main name & tagline */}
        <div style={{
          position: "absolute", bottom: "12%", left: 0, right: 0,
          padding: "0 32px",
          animation: "slideUp 0.9s ease 0.6s both",
        }}>
          {/* Thin rule */}
          <div style={{ width: 40, height: 1, background: "#c9a96e", marginBottom: 20 }} />

          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(42px, 9vw, 100px)",
            fontWeight: 700, lineHeight: 0.92,
            color: "#f0ece4",
            letterSpacing: "-0.02em",
            marginBottom: 18,
          }}>
            {C.name.split(" ").map((word, i) => (
              <span key={i} style={{ display: "block", fontStyle: i === 1 ? "italic" : "normal" }}>{word}</span>
            ))}
          </h1>

          <p style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "clamp(9px, 1.8vw, 12px)",
            letterSpacing: "0.22em", color: "#aaa", fontWeight: 500,
            maxWidth: 420,
          }}>{C.tagline.toUpperCase()}</p>
        </div>

        {/* Scroll cue */}
        <div style={{
          position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
          animation: "fadeIn 1s ease 1.2s both",
        }}>
          <p style={{
            fontFamily: "'Montserrat', sans-serif", fontSize: 9,
            letterSpacing: "0.28em", color: "#555", fontWeight: 500,
          }}>SCROLL</p>
          <div style={{ width: 1, height: 32, background: "linear-gradient(to bottom, #555, transparent)" }} />
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          SECTION 2 — LIVE STATS BAR
      ───────────────────────────────────────────── */}
      <section style={{
        borderTop: "1px solid #1c1c1c",
        borderBottom: "1px solid #1c1c1c",
        background: "#0d0d0d",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {/* Live indicator */}
          <div style={{
            padding: "18px 32px 0",
            display: "flex", alignItems: "center", gap: 16,
          }}>
            <PulseDot />
            <div style={{ flex: 1, height: 1, background: "#1c1c1c" }} />
          </div>

          {/* Stats */}
          <div className="stats-row">
            {C.stats.map((s, i) => <StatItem key={s.label} stat={s} index={i} />)}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          SECTION 3 — BIOGRAPHY
      ───────────────────────────────────────────── */}
      <section ref={bioRef} style={{
        maxWidth: 900, margin: "0 auto",
        padding: "clamp(80px, 12vw, 140px) 32px",
        opacity: bioVisible ? 1 : 0,
        transform: bioVisible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
      }}>
        {/* Section label */}
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 48 }}>
          <span style={{
            fontFamily: "'Montserrat', sans-serif", fontSize: 10,
            letterSpacing: "0.28em", color: "#c9a96e", fontWeight: 600,
          }}>ABOUT</span>
          <div style={{ flex: 1, height: 1, background: "#1c1c1c" }} />
          <span style={{
            fontFamily: "'Montserrat', sans-serif", fontSize: 10,
            letterSpacing: "0.1em", color: "#333",
          }}>01</span>
        </div>

        <p style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(20px, 3.5vw, 30px)",
          fontWeight: 400,
          lineHeight: 1.65,
          color: "#d8d4cc",
          fontStyle: "italic",
          maxWidth: 760,
        }}>
          "{C.bio}"
        </p>

        {/* IG link pill */}
        <div style={{ marginTop: 48 }}>
          <a
            href={C.instagramUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 12,
              fontFamily: "'Montserrat', sans-serif", fontSize: 11,
              letterSpacing: "0.18em", color: "#f0ece4",
              textDecoration: "none", fontWeight: 600,
              borderBottom: "1px solid #333",
              paddingBottom: 8,
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#c9a96e"; e.currentTarget.style.color = "#c9a96e"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#333"; e.currentTarget.style.color = "#f0ece4"; }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
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
        transform: galleryVisible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
      }}>
        {/* Section label */}
        <div style={{
          maxWidth: 1400, margin: "0 auto",
          padding: "0 32px",
          display: "flex", alignItems: "center", gap: 20, marginBottom: 40,
        }}>
          <span style={{
            fontFamily: "'Montserrat', sans-serif", fontSize: 10,
            letterSpacing: "0.28em", color: "#c9a96e", fontWeight: 600,
          }}>COLLABORATIONS</span>
          <div style={{ flex: 1, height: 1, background: "#1c1c1c" }} />
          <span style={{
            fontFamily: "'Montserrat', sans-serif", fontSize: 10,
            letterSpacing: "0.1em", color: "#333",
          }}>02</span>
        </div>

        <div className="brand-grid" style={{ gap: 2 }}>
          {C.brands.map(b => <BrandCard key={b.id} brand={b} />)}
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          SECTION 5 — CTA / CONTACT
      ───────────────────────────────────────────── */}
      <section ref={ctaRef} style={{
        maxWidth: 900, margin: "0 auto",
        padding: "clamp(80px, 12vw, 140px) 32px",
        opacity: ctaVisible ? 1 : 0,
        transform: ctaVisible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
        textAlign: "center",
      }}>
        {/* Section label */}
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 60 }}>
          <div style={{ flex: 1, height: 1, background: "#1c1c1c" }} />
          <span style={{
            fontFamily: "'Montserrat', sans-serif", fontSize: 10,
            letterSpacing: "0.28em", color: "#c9a96e", fontWeight: 600,
          }}>PARTNERSHIPS</span>
          <div style={{ flex: 1, height: 1, background: "#1c1c1c" }} />
        </div>

        <p style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(32px, 6vw, 68px)",
          fontWeight: 700, lineHeight: 1.05,
          color: "#f0ece4",
          marginBottom: 20,
        }}>
          Let's build<br /><em style={{ fontStyle: "italic", color: "#c9a96e" }}>something</em><br />beautiful.
        </p>

        <p style={{
          fontFamily: "'Montserrat', sans-serif", fontSize: 13,
          color: "#666", lineHeight: 1.8, maxWidth: 480,
          margin: "0 auto 48px",
        }}>
          Available for brand campaigns, editorial content,<br />
          event appearances, and long-term partnerships.
        </p>

        <button
          onClick={() => setModalOpen(true)}
          style={{
            display: "inline-block",
            padding: "18px 52px",
            background: "transparent",
            border: "1px solid #c9a96e",
            color: "#c9a96e",
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 11, letterSpacing: "0.22em", fontWeight: 700,
            cursor: "pointer",
            transition: "background 0.3s ease, color 0.3s ease",
            borderRadius: 0,
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "#c9a96e"; e.currentTarget.style.color = "#0a0a0a"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#c9a96e"; }}
        >
          WORK WITH ME
        </button>

        {/* Direct contacts */}
        <div style={{
          display: "flex", justifyContent: "center", gap: "clamp(24px, 6vw, 64px)",
          marginTop: 60,
          flexWrap: "wrap",
        }}>
          {[
            { label: "GENERAL INQUIRIES", value: C.contact.email },
            { label: "MANAGEMENT",        value: C.contact.manager },
            { label: "BASED IN",          value: C.contact.location },
          ].map(item => (
            <div key={item.label} style={{ textAlign: "center" }}>
              <p style={{
                fontFamily: "'Montserrat', sans-serif", fontSize: 9,
                letterSpacing: "0.22em", color: "#555", marginBottom: 8, fontWeight: 600,
              }}>{item.label}</p>
              <p style={{
                fontFamily: "'Montserrat', sans-serif", fontSize: 12,
                color: "#999",
              }}>{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          FOOTER
      ───────────────────────────────────────────── */}
      <footer style={{
        borderTop: "1px solid #1c1c1c",
        padding: "32px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: 16,
        maxWidth: "100%",
      }}>
        <p style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 14, color: "#333", fontWeight: 600,
          letterSpacing: "0.04em",
        }}>{C.name}</p>
        <p style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: 10, color: "#333",
          letterSpacing: "0.12em",
        }}>© {new Date().getFullYear()} · ALL RIGHTS RESERVED</p>
        <a
          href={C.instagramUrl}
          target="_blank" rel="noreferrer"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 10, color: "#555",
            textDecoration: "none", letterSpacing: "0.16em",
            transition: "color 0.2s",
          }}
          onMouseEnter={e => e.target.style.color = "#c9a96e"}
          onMouseLeave={e => e.target.style.color = "#555"}
        >
          INSTAGRAM ↗
        </a>
      </footer>

      {/* ── Modal ── */}
      {modalOpen && <ContactModal onClose={() => setModalOpen(false)} />}
    </>
  );
}
