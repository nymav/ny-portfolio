import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const MobileMenu = ({ menuOpen, setMenuOpen, handleNavClick }) => {
  const [selectedOption, setSelectedOption] = useState(0);
  const [coins, setCoins] = useState(0);
  const [showGlitch, setShowGlitch] = useState(false);

  const navLinks = [
    { id: "home", label: "🏠 MAIN MENU", color: "#00ff41" },
    { id: "projects", label: "🎮 PROJECTS", color: "#00ff41" },
    { id: "certifications", label: "🏆 ACHIEVEMENTS", color: "#ff6b35" },
    { id: "about", label: "👤 PLAYER INFO", color: "#3498db" },
  ];

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [menuOpen]);

  // Glitch effect
  useEffect(() => {
    if (menuOpen) {
      const glitchInterval = setInterval(() => {
        setShowGlitch(true);
        setTimeout(() => setShowGlitch(false), 100);
      }, 3000);
      return () => clearInterval(glitchInterval);
    }
  }, [menuOpen]);

  // Touch/keyboard navigation
  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyPress = (e) => {
      switch (e.key) {
        case "ArrowUp":
          setSelectedOption(prev => (prev - 1 + navLinks.length) % navLinks.length);
          break;
        case "ArrowDown":
          setSelectedOption(prev => (prev + 1) % navLinks.length);
          break;
        case "Enter":
        case " ":
          const selected = navLinks[selectedOption];
          setMenuOpen(false);
          handleNavClick(selected.id);
          setCoins(prev => prev + 5);
          break;
        case "Escape":
          setMenuOpen(false);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [menuOpen, selectedOption, navLinks, setMenuOpen, handleNavClick]);

  const handleMenuClick = (link, index) => {
    setSelectedOption(index);
    setCoins(prev => prev + 3);
    
    // Add a small delay for visual feedback
    setTimeout(() => {
      setMenuOpen(false);
      handleNavClick(link.id);
    }, 150);
  };

  return (
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          key="menu"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3, type: "spring" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center text-white"
          style={{
            fontFamily: "'Courier New', monospace",
            background: "linear-gradient(45deg, #0f0f23 25%, #1a1a2e 25%, #1a1a2e 50%, #0f0f23 50%, #0f0f23 75%, #1a1a2e 75%)",
            backgroundSize: "30px 30px",
            animation: "moveBackground 10s linear infinite",
          }}
        >
          {/* Retro grid overlay */}
          <div className="absolute inset-0 opacity-30">
            <div className="grid grid-cols-8 grid-rows-12 h-full w-full">
              {Array.from({ length: 96 }).map((_, i) => (
                <div key={i} className="border border-cyan-500/20"></div>
              ))}
            </div>
          </div>

          {/* Glitch effect overlay */}
          {showGlitch && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.1 }}
              className="absolute inset-0 bg-red-500/10 z-10"
            />
          )}

          {/* HUD */}
          <div className="absolute top-20 left-4 text-green-400 font-mono text-xs z-20">
            <div className="bg-black/80 p-2 rounded border border-green-400">
              <div>MODE: MENU</div>
            </div>
          </div>

          {/* Close button (styled as power button) */}
          <motion.button
            onClick={() => setMenuOpen(false)}
            className="absolute top-20 right-4 text-red-400 text-2xl z-20 bg-black/80 w-12 h-12 rounded-full border-2 border-red-400 flex items-center justify-center hover:bg-red-400/20 transition-colors"
            aria-label="Close Menu"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            ⏻
          </motion.button>

          {/* Menu Title */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, type: "spring" }}
            className="mb-8 text-center z-20"
          >
            <h2 className={`text-3xl font-bold text-green-400 mb-2 pixel-text ${showGlitch ? 'glitch' : ''}`}>
              GAME MENU
            </h2>
            <div className="text-cyan-400 text-sm">SELECT YOUR DESTINATION</div>
          </motion.div>

          {/* Navigation Options */}
          <div className="flex flex-col items-center gap-3 z-20 w-full max-w-sm px-4">
            {navLinks.map((link, i) => (
              <motion.button
                key={link.id}
                onClick={() => handleMenuClick(link, i)}
                className={`
                  relative w-full text-xl font-mono px-8 py-4 transition-all duration-200 rounded-lg
                  ${selectedOption === i 
                    ? 'bg-gradient-to-r from-yellow-600 to-yellow-500 text-black border-2 border-yellow-400 shadow-lg shadow-yellow-400/50' 
                    : 'bg-gray-800/60 text-gray-300 border-2 border-gray-600 hover:border-gray-400 hover:bg-gray-700/60'
                  }
                  ${showGlitch && i === selectedOption ? 'animate-pulse' : ''}
                `}
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  delay: i * 0.1, 
                  type: "spring",
                  stiffness: 200,
                  damping: 20
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => setSelectedOption(i)}
              >
                <span className="font-bold tracking-wider">
                  {link.label}
                </span>
                
                {/* Selected item glow effect */}
                {selectedOption === i && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 rounded-lg"
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Controls hint */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-6 text-center text-xs text-gray-400 z-20"
          >
            <div>↑↓ NAVIGATE • ENTER SELECT • ESC CLOSE</div>
            <div className="mt-1 text-cyan-400">TAP TO SELECT • SWIPE TO NAVIGATE</div>
          </motion.div>

          {/* Floating particles */}
          <div className="absolute inset-0 z-10">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-green-400 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          <style jsx>{`
            @keyframes moveBackground {
              0% { background-position: 0 0; }
              100% { background-position: 60px 60px; }
            }
            
            .pixel-text {
              text-shadow: 
                2px 2px 0px #000,
                4px 4px 0px rgba(0,0,0,0.5);
              letter-spacing: 2px;
            }
            
            .glitch {
              animation: glitch 0.3s ease-in-out;
            }
            
            @keyframes glitch {
              0% { transform: translateX(0); }
              10% { transform: translateX(-2px); }
              20% { transform: translateX(2px); }
              30% { transform: translateX(-2px); }
              40% { transform: translateX(2px); }
              50% { transform: translateX(-2px); }
              60% { transform: translateX(2px); }
              70% { transform: translateX(-2px); }
              80% { transform: translateX(2px); }
              90% { transform: translateX(-2px); }
              100% { transform: translateX(0); }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};