import { useEffect } from "react";

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
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-lg text-white transition-all duration-300 ${
        menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <button
        onClick={() => setMenuOpen(false)}
        className="absolute top-6 right-6 text-2xl"
        aria-label="Close Menu"
      >
        ✕
      </button>
      {navLinks.map((link, i) => (
  <button
    key={link.id}
    onClick={() => {
      setMenuOpen(false);
      if (link.id === "home") {
        handleNavClick("home");
      } else {
        handleNavClick(link.id);
      }
    }}
    className="text-xl font-semibold my-4 transition duration-300"
  >
    {link.label}
  </button>
))}
    </div>
  );
};
