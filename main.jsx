// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Global reset
const style = document.createElement("style");
style.textContent = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: #08080c; color: #fff; font-family: 'DM Sans', sans-serif; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #08080c; }
  ::-webkit-scrollbar-thumb { background: rgba(200,245,66,0.3); border-radius: 2px; }
  @media (max-width: 640px) {
    .desktop-nav { display: none !important; }
    .hamburger { display: block !important; }
  }
`;
document.head.appendChild(style);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode><App /></React.StrictMode>
);
