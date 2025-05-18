import { useEffect } from "react";

export const MobileMenu = ({ menuOpen, setMenuOpen }) => {
  return (
    <div
      className={`fixed top-0 left-0 w-full z-40 flex flex-col items-center justify-center transition-all duration-500 ease-in-out backdrop-blur-md bg-white/80 dark:bg-black/70
        ${
          menuOpen
            ? "h-screen opacity-100 pointer-events-auto"
            : "h-0 opacity-0 pointer-events-none"
        }`}
    >
      <button
        onClick={() => setMenuOpen(false)}
        className="absolute top-6 right-6 text-gray-800 dark:text-white text-2xl focus:outline-none"
        aria-label="Close Menu"
      >
        ✕
      </button>

      {["home", "about", "projects", "contact"].map((id, index) => (
        <a
          key={id}
          href={`#${id}`}
          onClick={() => setMenuOpen(false)}
          className={`text-lg md:text-xl font-medium text-gray-800 dark:text-white my-3 transition-transform duration-300 transform ${
            menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
          style={{ transitionDelay: `${index * 75}ms` }}
        >
          {id.charAt(0).toUpperCase() + id.slice(1)}
        </a>
      ))}
    </div>
  );
};