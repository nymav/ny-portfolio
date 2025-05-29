import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import {
  FaGithub,
  FaLinkedinIn,
  FaInstagram,
  FaEnvelope,
  FaHome,
  FaUser,
  FaFolderOpen,
  FaCertificate,
} from "react-icons/fa";

export const Home = ({ handleNavClick, isCollapsed, collapseIntro }) => {
  const navLinks = [
    { id: "home", icon: <FaHome />, label: "Home" },
    { id: "projects", icon: <FaFolderOpen />, label: "Projects" },
    { id: "certifications", icon: <FaCertificate />, label: "Certs" },
    { id: "about", icon: <FaUser />, label: "About" },
  ];

  const socialLinks = [
    { href: "https://github.com/nymav", icon: <FaGithub />, label: "GitHub" },
    { href: "https://linkedin.com/in/nikhil-yarra", icon: <FaLinkedinIn />, label: "LinkedIn" },
    { href: "https://instagram.com/ny.mav", icon: <FaInstagram />, label: "Instagram" },
    { href: "mailto:nikhilyarra@gmail.com", icon: <FaEnvelope />, label: "Email" },
  ];

  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      id="home"
      className="flex flex-col justify-between items-center min-h-screen w-full px-4 py-10 text-white"
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
    >
      {/* Intro */}
      <div className="w-full max-w-md text-center">
        <motion.div
          className="relative mx-auto w-44 h-44 mb-6"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        >
          <div className="absolute inset-0 rounded-full bg-purple-800 blur-2xl opacity-20 scale-125" />
          <img
            src={`${import.meta.env.BASE_URL}pfp1.jpg`}
            alt="Nikhil Yarra"
            className="relative z-10 w-44 h-44 object-cover rounded-full border-4 border-white shadow-lg"
          />
        </motion.div>

        <h1 className="text-3xl font-bold mb-2">Hi, I'm Nikhil Yarra</h1>
        <h2 className="text-lg font-mono text-purple-400 mb-4">
          <Typewriter
            words={[
              "LLM & NLP Practitioner",
              "Artificial Intelligence Explorer",
              "Data Science Maverick",
              "Machine Learning Enthusiast",
            ]}
            loop={0}
            cursor
            cursorStyle="|"
            typeSpeed={60}
            deleteSpeed={40}
            delaySpeed={1200}
          />
        </h2>

        <p className="text-gray-400 text-sm leading-relaxed mb-6">
          Data Science grad building ML, DL & AI projects. Passionate about model tinkering, learning, and innovation.
        </p>

        <div className="flex flex-col gap-3 mb-8">
          <button
            onClick={() => handleNavClick("projects")}
            className="bg-white text-black py-2 px-4 rounded-md font-semibold transition hover:scale-105 hover:bg-gray-200 text-sm"
          >
            🚀 View Projects
          </button>
          <a
            href="mailto:nikhilyarra@gmail.com?subject=Portfolio Inquiry&body=Hi Nikhil,"
            className="border border-white text-white py-2 px-4 rounded-md font-semibold transition hover:scale-105 hover:bg-white hover:text-black text-sm"
          >
            ✉️ Let’s Connect
          </a>
        </div>
      </div>

      {/* Navigation Icons */}
      <div className={`grid ${isCollapsed ? 'grid-cols-2' : 'grid-cols-4'} gap-5 mt-6 mb-2`}>
        {navLinks.map((link) => (
          <div key={link.id} className="flex flex-col items-center group">
            <button
              onClick={() => handleNavClick(link.id)}
              className={`w-12 h-12 flex items-center justify-center rounded-full shadow transition hover:scale-110 ${
                activeSection === link.id
                  ? "bg-purple-600 text-white ring-2 ring-purple-300"
                  : "bg-white text-black"
              }`}
              aria-label={link.label}
            >
              {link.icon}
            </button>
            {!isCollapsed && (
              <span className="text-xs text-gray-400 mt-1">{link.label}</span>
            )}
          </div>
        ))}

        {!isCollapsed &&
          socialLinks.map((social) => (
            <div key={social.href} className="flex flex-col items-center group">
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white text-black flex items-center justify-center rounded-full shadow hover:scale-110 transition"
                aria-label={social.label}
              >
                {social.icon}
              </a>
              <span className="text-xs text-gray-400 mt-1">{social.label}</span>
            </div>
          ))}
      </div>
    </div>
  );
};
