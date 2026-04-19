// src/components/Projects.jsx

const projects = [
  {
    title: "AI Resume Analyzer",
    desc: "Upload your resume and get an instant AI-powered score, feedback, and improvement tips.",
    tags: ["Claude API", "React", "Firebase"],
    emoji: "🤖",
    color: "#c8f542",
  },
  {
    title: "ShopSmart Dashboard",
    desc: "Inventory & sales tracker for small businesses. Real-time updates, charts, and alerts.",
    tags: ["React", "Firebase", "Recharts"],
    emoji: "📊",
    color: "#42d4f4",
  },
  {
    title: "MediBook",
    desc: "Doctor appointment booking app with slot management, SMS reminders, and Razorpay payments.",
    tags: ["Node.js", "React", "Razorpay"],
    emoji: "🏥",
    color: "#f442a8",
  },
  {
    title: "BrandForge",
    desc: "AI-powered brand kit generator — logos, color palettes, and copy generated from a single prompt.",
    tags: ["OpenAI", "React", "Canvas API"],
    emoji: "✨",
    color: "#a442f4",
  },
];

export default function Projects() {
  return (
    <section id="projects" style={{ padding: "6rem 2rem", maxWidth: "1100px", margin: "0 auto" }}>
      <div style={{ marginBottom: "3.5rem" }}>
        <p style={{ color: "#c8f542", fontFamily: "'Space Mono', monospace", fontSize: "0.8rem", letterSpacing: "0.15em", marginBottom: "0.75rem" }}>
          &gt; SELECTED WORK
        </p>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, color: "#fff", margin: 0, letterSpacing: "-0.03em" }}>
          Projects
        </h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
        {projects.map((p) => (
          <div key={p.title}
            style={{
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "12px", padding: "1.75rem", position: "relative", overflow: "hidden",
              transition: "border-color 0.2s, transform 0.2s",
              cursor: "default",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = p.color + "55";
              e.currentTarget.style.transform = "translateY(-4px)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {/* Glow top-right */}
            <div style={{
              position: "absolute", top: "-20px", right: "-20px", width: "120px", height: "120px",
              background: `radial-gradient(circle, ${p.color}18 0%, transparent 70%)`,
              borderRadius: "50%", pointerEvents: "none",
            }} />

            <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>{p.emoji}</div>
            <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.2rem", fontWeight: 700, color: "#fff", margin: "0 0 0.6rem" }}>
              {p.title}
            </h3>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", lineHeight: 1.6, margin: "0 0 1.25rem" }}>
              {p.desc}
            </p>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {p.tags.map(t => (
                <span key={t} style={{
                  fontSize: "0.7rem", fontFamily: "'Space Mono', monospace",
                  padding: "0.25rem 0.65rem", borderRadius: "4px",
                  background: p.color + "18", color: p.color, border: `1px solid ${p.color}33`,
                }}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
