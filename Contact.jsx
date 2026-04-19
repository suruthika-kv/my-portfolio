// src/components/Contact.jsx
import { useState } from "react";
import { saveMessage } from "./firebase";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    try {
      await saveMessage(form);
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  const inputStyle = {
    width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "8px", padding: "0.875rem 1rem", color: "#fff", fontSize: "0.95rem",
    fontFamily: "'Space Mono', monospace", outline: "none", transition: "border-color 0.2s",
    boxSizing: "border-box",
  };

  return (
    <section id="contact" style={{ padding: "6rem 2rem", maxWidth: "700px", margin: "0 auto" }}>
      <div style={{ marginBottom: "3rem" }}>
        <p style={{ color: "#c8f542", fontFamily: "'Space Mono', monospace", fontSize: "0.8rem", letterSpacing: "0.15em", marginBottom: "0.75rem" }}>
          &gt; GET IN TOUCH
        </p>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, color: "#fff", margin: "0 0 1rem", letterSpacing: "-0.03em" }}>
          Let's Work Together
        </h2>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.95rem", lineHeight: 1.7 }}>
          Got a project in mind? Drop a message and I'll get back to you within 24 hours.
        </p>
      </div>

      {status === "sent" ? (
        <div style={{
          background: "rgba(200,245,66,0.08)", border: "1px solid rgba(200,245,66,0.3)",
          borderRadius: "12px", padding: "2.5rem", textAlign: "center",
        }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>✅</div>
          <h3 style={{ fontFamily: "'Syne', sans-serif", color: "#c8f542", margin: "0 0 0.5rem" }}>Message Sent!</h3>
          <p style={{ color: "rgba(255,255,255,0.6)", margin: 0 }}>I'll get back to you within 24 hours.</p>
          <button onClick={() => setStatus("idle")} style={{
            marginTop: "1.5rem", background: "transparent", border: "1px solid rgba(255,255,255,0.2)",
            color: "#fff", padding: "0.6rem 1.5rem", borderRadius: "6px", cursor: "pointer",
            fontFamily: "'Space Mono', monospace", fontSize: "0.85rem",
          }}>Send Another</button>
        </div>
      ) : (
        <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", fontFamily: "'Space Mono', monospace", display: "block", marginBottom: "0.4rem" }}>NAME</label>
              <input name="name" value={form.name} onChange={handle} placeholder="Your name" required style={inputStyle}
                onFocus={e => e.target.style.borderColor = "#c8f542"}
                onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
            </div>
            <div>
              <label style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", fontFamily: "'Space Mono', monospace", display: "block", marginBottom: "0.4rem" }}>EMAIL</label>
              <input name="email" type="email" value={form.email} onChange={handle} placeholder="your@email.com" required style={inputStyle}
                onFocus={e => e.target.style.borderColor = "#c8f542"}
                onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
            </div>
          </div>

          <div>
            <label style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", fontFamily: "'Space Mono', monospace", display: "block", marginBottom: "0.4rem" }}>MESSAGE</label>
            <textarea name="message" value={form.message} onChange={handle} placeholder="Tell me about your project..." required rows={5}
              style={{ ...inputStyle, resize: "vertical", minHeight: "130px" }}
              onFocus={e => e.target.style.borderColor = "#c8f542"}
              onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
          </div>

          {status === "error" && (
            <p style={{ color: "#f44", fontFamily: "'Space Mono', monospace", fontSize: "0.8rem" }}>
              Something went wrong. Check your Firebase config and try again.
            </p>
          )}

          <button type="submit" disabled={status === "sending"} style={{
            background: status === "sending" ? "rgba(200,245,66,0.4)" : "#c8f542",
            color: "#08080c", border: "none", padding: "1rem", borderRadius: "8px",
            cursor: status === "sending" ? "not-allowed" : "pointer",
            fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: "0.95rem",
            letterSpacing: "0.03em", transition: "opacity 0.2s",
          }}>
            {status === "sending" ? "Sending..." : "Send Message →"}
          </button>

          {/* Contact info */}
          <div style={{ display: "flex", gap: "2rem", marginTop: "1.5rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.06)", flexWrap: "wrap" }}>
            {[["📧", "zane@zanedev.in"], ["📍", "Chennai, India"], ["⚡", "Reply in 24h"]].map(([icon, text]) => (
              <span key={text} style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", fontFamily: "'Space Mono', monospace" }}>
                {icon} {text}
              </span>
            ))}
          </div>
        </form>
      )}
    </section>
  );
}
