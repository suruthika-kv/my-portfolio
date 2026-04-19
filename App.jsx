// src/App.jsx
import Navbar from "./Navbar.jsx";
import Hero from "./Hero.jsx";
import Projects from "./Projects.jsx";
import Contact from "./Contact.jsx";
import Chatbot from "./Chatbot.jsx";


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
