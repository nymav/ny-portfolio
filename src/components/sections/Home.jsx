import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import {
  FaGithub,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import {
  PiBracketsCurlyBold,
  PiCertificateBold,
  PiHouseBold,
  PiUserBold,
} from "react-icons/pi";

export const Home = ({ handleNavClick, isCollapsed = false }) => {
  const navLinks = [
    { id: "home", icon: <PiHouseBold />, label: "Home" },
    { id: "projects", icon: <PiBracketsCurlyBold />, label: "Projects" },
    { id: "certifications", icon: <PiCertificateBold />, label: "Certs" },
    { id: "about", icon: <PiUserBold />, label: "Me" },
  ];

  const socialLinks = [
    { href: "https://github.com/nymav", icon: <FaGithub />, label: "Git" },
    { href: "https://linkedin.com/in/nikhil-yarra", icon: <FaLinkedinIn />, label: "LIn" },
    { href: "https://instagram.com/ny.mav", icon: <FaInstagram />, label: "Insta" },
  ];

  const iconVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        type: "spring",
        stiffness: 100,
      },
    }),
  };

  const isSplitScreen =
    typeof window !== "undefined" && window.innerWidth >= 1024 && isCollapsed;

  useEffect(() => {
    const handleKeyPress = (e) => {
      const ignoredKeys = ["Shift", "Control", "Alt", "Meta", "Escape", "Tab"];
      if (!ignoredKeys.includes(e.key)) {
        handleNavClick(isSplitScreen ? "home" : "projects");
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleNavClick, isSplitScreen]);

  return (
    <aside
      id="home"
      className="w-full min-h-screen text-white py-10 px-4 sm:px-6 relative overflow-hidden"
      style={{
        fontFamily: "'Space Grotesk', sans-serif",
        background: isCollapsed
          ? "#0d001a"
          : "radial-gradient(ellipse at top, #3b0066 0%, #0d001a 60%, #000000 100%)",
        backgroundAttachment: "fixed",
      }}
    >
      <div
        className={`$ {
          isSplitScreen
            ? "flex flex-col items-center text-center gap-4 max-w-xs mx-auto"
            : "max-w-6xl mx-auto flex flex-col items-center gap-8"
        }`}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="relative mx-auto w-32 h-32 sm:w-48 sm:h-48 mb-6"
        >
          <div className="absolute inset-0 rounded-full bg-purple-800 blur-2xl opacity-40 scale-150" />
          <img
            src={`${import.meta.env.BASE_URL}pfp1.jpg`}
            alt="Nikhil Yarra"
            className="relative z-10 w-full h-full object-cover rounded-full border-4 border-white shadow-2xl"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold mb-1"
        >
          Hi, I’m Nikhil Yarra
        </motion.h1>

        <h2 className="text-sm sm:text-base text-purple-400 font-mono mb-2">
          <Typewriter
            words={["AI + LLM Explorer", "Machine Learning Enthusiast", "Data Science Maverick"]}
            loop={0}
            cursor
            cursorStyle="|"
            typeSpeed={50}
            deleteSpeed={40}
            delaySpeed={1000}
          />
        </h2>

        <p className="text-sm text-gray-300 leading-relaxed px-2 sm:px-0 max-w-xl">
          Data Science grad building ML, DL & AI projects. Passionate about model tinkering, learning, and innovation.
        </p>

        {!isCollapsed && (
          <motion.div
            initial="hidden"
            animate="visible"
            className="flex flex-wrap justify-center gap-6 mt-6 max-w-md"
          >
            {[...navLinks, ...socialLinks].map((item, index) => {
              const isExternal = item.href !== undefined;
              return (
                <motion.div
                  key={index}
                  custom={index}
                  variants={iconVariants}
                  whileHover={{ scale: 1.15 }}
                  className="group flex flex-col items-center"
                >
                  {isExternal ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 flex items-center justify-center border border-purple-400 rounded-full shadow-md hover:shadow-purple-500/30 transition"
                    >
                      {item.icon}
                    </a>
                  ) : (
                    <button
                      onClick={() => handleNavClick(item.id)}
                      className="w-12 h-12 flex items-center justify-center border border-purple-400 rounded-full shadow-md hover:shadow-purple-500/30 transition"
                    >
                      {item.icon}
                    </button>
                  )}
                  <span className="mt-1 text-xs text-gray-300 group-hover:text-white">
                    {item.label}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <button
            onClick={() => handleNavClick("projects")}
            className="bg-purple-600 text-white border border-purple-400 py-2 px-4 rounded-md text-sm font-semibold transition hover:bg-black hover:border-white"
          >
            🚀 View Projects
          </button>
          <a
            href="mailto:nikhilyarra@gmail.com?subject=Portfolio Inquiry"
            className="bg-black text-white border border-purple-400 py-2 px-4 rounded-md text-sm font-semibold transition hover:bg-purple-600 hover:text-white text-center"
          >
            ✉️ Let’s Connect
          </a>
        </div>

        <motion.div
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
          className="mt-12 text-sm text-purple-400 font-mono text-center"
        >
          ⌨️ {isSplitScreen ? "Press any key to go Home" : "Press any key to Begin"}
        </motion.div>
      </div>
    </aside>
  );
};
