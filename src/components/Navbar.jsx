import { useEffect, useState } from "react";
import {
  FaHome,
  FaUser,
  FaFolderOpen,
  FaEnvelope,
  FaCertificate,
} from "react-icons/fa";
import { motion } from "framer-motion";

export const Navbar = () => {
  const links = [
    { id: "home", icon: <FaHome />, label: "Home" },
    { id: "projects", icon: <FaFolderOpen />, label: "Projects" },
    { id: "certifications", icon: <FaCertificate />, label: "Certs" },
    { id: "about", icon: <FaUser />, label: "About" },
    
  ];

  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      const sectionOffsets = links.map(({ id }) => {
        const el = document.getElementById(id);
        return {
          id,
          offset: el?.offsetTop ?? Number.POSITIVE_INFINITY,
        };
      });

      const current = sectionOffsets.findLast(
        (section) => scrollY >= section.offset - 120
      );

      if (current && current.id !== activeSection) {
        setActiveSection(current.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  return (
    <>
      {/* 🖥 Desktop Sidebar */}
      <motion.nav
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="hidden md:flex fixed top-1/2 left-6 -translate-y-1/2 z-50 flex-col gap-4"
      >
        {links.map((link, idx) => (
          <motion.a
            key={link.id}
            href={`#${link.id}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + idx * 0.1 }}
            className={`group relative flex items-center justify-center w-12 h-12 rounded-full
              ${
                activeSection === link.id
                  ? "bg-black text-white scale-110"
                  : "bg-white text-gray-800"
              }
              border border-gray-200 shadow hover:shadow-lg hover:scale-105 transition-all duration-300`}
          >
            <span className="text-lg">{link.icon}</span>
            <span className="absolute left-14 bg-black text-white text-xs font-medium rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {link.label}
            </span>
          </motion.a>
        ))}
      </motion.nav>

      {/* 📱 Mobile Bottom Navbar */}
      <motion.nav
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 flex justify-around items-center py-2 shadow-md"
      >
        {links.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className={`flex flex-col items-center text-xs font-medium transition-all duration-300
              ${
                activeSection === link.id
                  ? "text-black scale-110"
                  : "text-gray-500"
              }`}
          >
            <span className="text-lg">{link.icon}</span>
            {link.label}
          </a>
        ))}
      </motion.nav>
    </>
  );
};