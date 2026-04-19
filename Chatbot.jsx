// src/components/Chatbot.jsx
import { useState, useRef, useEffect } from "react";
import { askAI } from "../lib/gemini";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hey! I'm Zane's AI assistant. Ask me about his work, rates, or projects 👋" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");

    const userMsg = { role: "user", content: text };
    const next = [...messages, userMsg];
    setMessages(next);
    setLoading(true);

    try {
      // Only pass actual conversation (skip first assistant greeting from API)
      const apiMsgs = next.filter((_, i) => i > 0 || next[0].role === "user");
      const reply = await askAI(apiMsgs);
      setMessages([...next, { role: "assistant", content: reply }]);
    } catch {
      setMessages([...next, { role: "assistant", content: "Oops, something went wrong. Try again!" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating button */}
      <button onClick={() => setOpen(!open)} style={{
        position: "fixed", bottom: "2rem", right: "2rem", zIndex: 200,
        width: "56px", height: "56px", borderRadius: "50%",
        background: "#c8f542", border: "none", cursor: "pointer",
        fontSize: "1.4rem", boxShadow: "0 4px 24px rgba(200,245,66,0.4)",
        transition: "transform 0.2s, box-shadow 0.2s",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
        onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.1)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
        aria-label="Open chat"
      >
        {open ? "✕" : "💬"}
      </button>

      {/* Chat window */}
      {open && (
        <div style={{
          position: "fixed", bottom: "5.5rem", right: "2rem", zIndex: 200,
          width: "340px", maxHeight: "480px",
          background: "#0f0f18", border: "1px solid rgba(200,245,66,0.2)",
          borderRadius: "16px", display: "flex", flexDirection: "column",
          boxShadow: "0 24px 60px rgba(0,0,0,0.6)",
          overflow: "hidden",
        }}>
          {/* Header */}
          <div style={{
            padding: "1rem 1.25rem", borderBottom: "1px solid rgba(255,255,255,0.06)",
            display: "flex", alignItems: "center", gap: "0.75rem",
            background: "rgba(200,245,66,0.05)",
          }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#c8f542", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}>🤖</div>
            <div>
              <div style={{ fontFamily: "'Space Mono', monospace", color: "#fff", fontSize: "0.85rem", fontWeight: 700 }}>Zane's Assistant</div>
              <div style={{ color: "#c8f542", fontSize: "0.7rem", fontFamily: "'Space Mono', monospace" }}>● Online</div>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "1rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {messages.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{
                  maxWidth: "80%", padding: "0.65rem 0.9rem", borderRadius: "12px",
                  fontSize: "0.85rem", lineHeight: 1.5,
                  background: m.role === "user" ? "#c8f542" : "rgba(255,255,255,0.06)",
                  color: m.role === "user" ? "#08080c" : "rgba(255,255,255,0.85)",
                  fontFamily: m.role === "user" ? "'Space Mono', monospace" : "inherit",
                  borderBottomRightRadius: m.role === "user" ? "4px" : "12px",
                  borderBottomLeftRadius: m.role === "assistant" ? "4px" : "12px",
                }}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div style={{ padding: "0.65rem 1rem", background: "rgba(255,255,255,0.06)", borderRadius: "12px", borderBottomLeftRadius: "4px", color: "rgba(255,255,255,0.5)", fontSize: "0.85rem" }}>
                  typing…
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{ padding: "0.75rem", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: "0.5rem" }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send()}
              placeholder="Ask me anything..."
              style={{
                flex: 1, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px", padding: "0.6rem 0.85rem", color: "#fff",
                fontSize: "0.85rem", outline: "none", fontFamily: "inherit",
              }}
            />
            <button onClick={send} disabled={loading} style={{
              background: "#c8f542", border: "none", borderRadius: "8px",
              width: "36px", height: "36px", cursor: loading ? "not-allowed" : "pointer",
              fontSize: "1rem", display: "flex", alignItems: "center", justifyContent: "center",
              opacity: loading ? 0.5 : 1,
            }}>→</button>
          </div>
        </div>
      )}
    </>
  );
}
