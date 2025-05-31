import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const MobileMenu = ({ menuOpen, setMenuOpen, handleNavClick }) => {
  const navLinks = [
    { id: "home", label: "Home" },
    { id: "projects", label: "Projects" },
    { id: "certifications", label: "Certifications" },
    { id: "about", label: "About" },
  ];

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [menuOpen]);

  return (
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          key="menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-lg text-white"
        >
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-6 right-6 text-2xl"
            aria-label="Close Menu"
          >
            ✕
          </button>

          <div className="flex flex-col items-center gap-6">
            {navLinks.map((link, i) => (
              <motion.button
                key={link.id}
                onClick={() => {
                  setMenuOpen(false);
                  handleNavClick(link.id);
                }}
                className="text-2xl font-semibold px-6 py-2"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08, type: "spring" }}
              >
                {link.label}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
