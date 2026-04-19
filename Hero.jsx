// src/components/Hero.jsx
import { useEffect, useState } from "react";

const roles = ["Full-Stack Developer", "AI Integration Engineer", "React Specialist", "Freelance Builder"];

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIdx];
    let timeout;
    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 30);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIdx((i) => (i + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIdx]);

  return (
    <section id="about" style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      padding: "0 2rem", paddingTop: "80px",
      position: "relative", overflow: "hidden",
    }}>
      {/* Background grid */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        backgroundImage: `
          linear-gradient(rgba(200,245,66,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(200,245,66,0.04) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
      }} />

      {/* Glow */}
      <div style={{
        position: "absolute", top: "20%", left: "5%", width: "500px", height: "500px",
        background: "radial-gradient(circle, rgba(200,245,66,0.08) 0%, transparent 70%)",
        borderRadius: "50%", zIndex: 0, pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "900px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <p style={{ color: "#c8f542", fontFamily: "'Space Mono', monospace", fontSize: "0.85rem", letterSpacing: "0.15em", marginBottom: "1.5rem" }}>
          &gt; AVAILABLE FOR FREELANCE WORK
        </p>

        <h1 style={{
          fontSize: "clamp(2.8rem, 7vw, 5.5rem)", fontFamily: "'Syne', sans-serif",
          fontWeight: 800, lineHeight: 1.05, color: "#fff", margin: "0 0 1rem",
          letterSpacing: "-0.03em",
        }}>
          Hi, I'm<br />
          <span style={{ color: "#c8f542" }}>Zane Mercer</span>
        </h1>

        <div style={{ fontSize: "clamp(1rem, 2.5vw, 1.4rem)", color: "rgba(255,255,255,0.5)", fontFamily: "'Space Mono', monospace", marginBottom: "2.5rem", minHeight: "2rem" }}>
          <span style={{ color: "rgba(255,255,255,0.8)" }}>{displayed}</span>
          <span style={{ color: "#c8f542", animation: "blink 1s step-end infinite" }}>|</span>
        </div>

        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "1.05rem", maxWidth: "560px", lineHeight: 1.7, marginBottom: "3rem" }}>
          I build fast, production-ready web apps and AI-powered tools for startups and businesses. Clean code. Real results. Delivered on time.
        </p>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <button onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              background: "#c8f542", color: "#08080c", border: "none",
              padding: "0.875rem 2rem", borderRadius: "4px", cursor: "pointer",
              fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: "0.9rem",
              letterSpacing: "0.03em", transition: "transform 0.15s, box-shadow 0.15s",
            }}
            onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 24px rgba(200,245,66,0.3)"; }}
            onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "none"; }}
          >
            View My Work →
          </button>
          <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.2)",
              padding: "0.875rem 2rem", borderRadius: "4px", cursor: "pointer",
              fontFamily: "'Space Mono', monospace", fontSize: "0.9rem", transition: "border-color 0.2s",
            }}
            onMouseEnter={e => e.target.style.borderColor = "#c8f542"}
            onMouseLeave={e => e.target.style.borderColor = "rgba(255,255,255,0.2)"}
          >
            Contact Me
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: "3rem", marginTop: "4rem", flexWrap: "wrap" }}>
          {[["15+", "Projects Shipped"], ["3", "Years Experience"], ["100%", "Client Satisfaction"]].map(([n, l]) => (
            <div key={l}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "2rem", fontWeight: 800, color: "#c8f542" }}>{n}</div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", fontFamily: "'Space Mono', monospace" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </section>
  );
}
