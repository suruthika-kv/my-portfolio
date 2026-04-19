// src/App.jsx
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Chatbot from "./components/Chatbot";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div style={{ background: "#08080c", minHeight: "100vh", color: "#fff" }}>
      <Navbar />
      <Hero />
      <Projects />
      <Contact />
      <Footer />
      <Chatbot />
    </div>
  );
}
