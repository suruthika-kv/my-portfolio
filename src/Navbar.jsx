// src/components/Navbar.jsx
import React from "react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = ["About", "Projects", "Contact"];

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "1rem 2rem",
      background: scrolled ? "rgba(8,8,12,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      transition: "all 0.3s ease",
      display: "flex", alignItems: "center", justifyContent: "space-between",
    }}>
      <span style={{ fontFamily: "'Space Mono', monospace", color: "#c8f542", fontSize: "1.1rem", letterSpacing: "-0.02em" }}>
        suruthika.dev
      </span>

      {/* Desktop links */}
      <div style={{ display: "flex", gap: "2rem" }} className="desktop-nav">
        {links.map(l => (
          <button key={l} onClick={() => scrollTo(l)}
            style={{ background: "none", border: "none", color: "rgba(255,255,255,0.6)", cursor: "pointer", fontSize: "0.875rem", fontFamily: "'Space Mono', monospace", letterSpacing: "0.05em", transition: "color 0.2s" }}
            onMouseEnter={e => e.target.style.color = "#c8f542"}
            onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.6)"}
          >{l}</button>
        ))}
        <button onClick={() => scrollTo("Contact")} style={{
          background: "#c8f542", color: "#08080c", border: "none", padding: "0.5rem 1.25rem",
          borderRadius: "4px", cursor: "pointer", fontFamily: "'Space Mono', monospace",
          fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.05em",
        }}>Hire Me</button>
      </div>

      {/* Mobile hamburger */}
      <button onClick={() => setMenuOpen(!menuOpen)} style={{ display: "none", background: "none", border: "none", color: "#fff", cursor: "pointer", fontSize: "1.4rem" }} className="hamburger">
        {menuOpen ? "✕" : "☰"}
      </button>

      {menuOpen && (
        <div style={{
          position: "fixed", top: "64px", left: 0, right: 0,
          background: "rgba(8,8,12,0.98)", padding: "1.5rem",
          display: "flex", flexDirection: "column", gap: "1rem",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}>
          {links.map(l => (
            <button key={l} onClick={() => scrollTo(l)}
              style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", fontSize: "1rem", fontFamily: "'Space Mono', monospace", textAlign: "left", padding: "0.5rem 0" }}>
              {l}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
