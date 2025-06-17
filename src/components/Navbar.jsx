import { useEffect, useState } from "react";
import {
  FaHome,
  FaUser,
  FaFolderOpen,
  FaEnvelope,
  FaCertificate,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar = ({ isMobileMenuOpen = false }) => {
  const links = [
    { id: "home", icon: <FaHome />, label: "Home", hotkey: "H", color: "cyan" },
    { id: "projects", icon: <FaFolderOpen />, label: "Projects", hotkey: "P", color: "purple" },
    { id: "certifications", icon: <FaCertificate />, label: "Certs", hotkey: "C", color: "green" },
    { id: "about", icon: <FaUser />, label: "About", hotkey: "A", color: "yellow" },
  ];

  const [activeSection, setActiveSection] = useState("home");
  const [navCoins, setNavCoins] = useState(0);
  const [scanEffect, setScanEffect] = useState(false);
  const [powerUp, setPowerUp] = useState(false);
  const [experience, setExperience] = useState(0);

  // Experience counter
  useEffect(() => {
    const interval = setInterval(() => {
      setExperience(prev => (prev + 1) % 100);
    }, 200);
    return () => clearInterval(interval);
  }, []);

  // Scan effect
  useEffect(() => {
    const scanInterval = setInterval(() => {
      setScanEffect(true);
      setTimeout(() => setScanEffect(false), 500);
    }, 5000);
    return () => clearInterval(scanInterval);
  }, []);

  // Power-up effect on navigation
  const handleNavClick = (sectionId) => {
    setNavCoins(prev => prev + 5);
    setPowerUp(true);
    setTimeout(() => setPowerUp(false), 1000);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      const link = links.find(l => l.hotkey.toLowerCase() === e.key.toLowerCase());
      if (link) {
        document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' });
        handleNavClick(link.id);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

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

  const getColorClasses = (color, isActive) => {
    const colors = {
      cyan: isActive ? "text-cyan-400 border-cyan-400 bg-cyan-400/20 shadow-cyan-400/50" : "text-cyan-300 border-cyan-600",
      purple: isActive ? "text-purple-400 border-purple-400 bg-purple-400/20 shadow-purple-400/50" : "text-purple-300 border-purple-600",
      green: isActive ? "text-green-400 border-green-400 bg-green-400/20 shadow-green-400/50" : "text-green-300 border-green-600",
      yellow: isActive ? "text-yellow-400 border-yellow-400 bg-yellow-400/20 shadow-yellow-400/50" : "text-yellow-300 border-yellow-600",
    };
    return colors[color] || colors.cyan;
  };

  return (
    <>
      {/* 🖥 Desktop Gaming Sidebar */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ 
          x: 0, 
          opacity: isMobileMenuOpen ? 0 : 1,
          pointerEvents: isMobileMenuOpen ? 'none' : 'auto'
        }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="hidden md:block fixed top-1/2 left-4 -translate-y-1/2 z-50"
        style={{ fontFamily: "'Courier New', monospace" }}
      >
        {/* HUD Panel */}
        <motion.div
          className="bg-black/80 border-2 border-green-400 rounded-lg p-3 mb-4 backdrop-blur"
          initial={{ scale: 0 }}
          animate={{ scale: isMobileMenuOpen ? 0 : 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-green-400 text-xs font-bold mb-1">⚡ NAV STATUS</div>
          <div className="text-yellow-400 text-xs">COINS: {navCoins}</div>
          <div className="text-cyan-400 text-xs">XP: {experience}%</div>
          <div className="text-purple-400 text-xs">MODE: EXPLORER</div>
        </motion.div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-3">
          {links.map((link, idx) => (
            <motion.div
              key={link.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ 
                opacity: isMobileMenuOpen ? 0 : 1, 
                x: isMobileMenuOpen ? -30 : 0 
              }}
              transition={{ delay: 0.3 + idx * 0.1 }}
              className="relative group"
            >
              <motion.a
                href={`#${link.id}`}
                onClick={() => handleNavClick(link.id)}
                className={`
                  relative flex items-center justify-center w-14 h-14 rounded-lg border-2
                  ${getColorClasses(link.color, activeSection === link.id)}
                  bg-black/60 backdrop-blur transition-all duration-300 hover:scale-110
                  ${activeSection === link.id ? 'shadow-lg scale-110' : 'hover:bg-gray-800/40'}
                  ${scanEffect ? 'animate-pulse' : ''}
                `}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Scan line effect */}
                {scanEffect && (
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent animate-pulse" />
                )}
                
                {/* Active indicator */}
                {activeSection === link.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"
                  />
                )}
                
                <span className="text-xl z-10 relative">{link.icon}</span>
                
                {/* Hotkey indicator */}
                <div className="absolute -bottom-1 -right-1 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center border border-gray-600">
                  {link.hotkey}
                </div>
              </motion.a>

              {/* Tooltip */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileHover={{ opacity: 1, x: 0 }}
                className="absolute left-16 top-1/2 -translate-y-1/2 bg-black/90 text-white text-sm font-mono rounded px-3 py-2 border border-gray-600 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none"
              >
                <div className="flex items-center gap-2">
                  <span className="text-white">{link.label}</span>
                  <span className="text-gray-400 text-xs">[{link.hotkey}]</span>
                </div>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-gray-600"></div>
              </motion.div>
            </motion.div>
          ))}
        </nav>

        {/* Power-up notification */}
        <AnimatePresence>
          {powerUp && !isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0, y: -20 }}
              className="absolute -right-20 top-1/2 -translate-y-1/2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded"
            >
              +5 XP!
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* 📱 Mobile Gaming Bottom Navbar */}
      <AnimatePresence>
        {!isMobileMenuOpen && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed bottom-0 left-0 right-0 z-50"
            style={{ fontFamily: "'Courier New', monospace" }}
          >
            {/* Mobile HUD */}
            <div className="bg-black/90 border-t-2 border-green-400 px-4 py-2">
              <div className="flex justify-between items-center text-xs">
                <div className="text-green-400 font-bold">⚡ NAV: ACTIVE</div>
                <div className="text-yellow-400">COINS: {navCoins}</div>
                <div className="text-cyan-400">XP: {experience}%</div>
              </div>
            </div>

            {/* Mobile Navigation */}
            <nav className="bg-black/95 backdrop-blur border-t border-gray-800 flex justify-around items-center py-3">
              {links.map((link, idx) => (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => handleNavClick(link.id)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * idx }}
                  className={`
                    relative flex flex-col items-center text-xs font-bold transition-all duration-300
                    ${activeSection === link.id 
                      ? `${getColorClasses(link.color, true).split(' ')[0]} scale-110` 
                      : 'text-gray-400 hover:text-white'
                    }
                  `}
                  whileTap={{ scale: 0.9 }}
                >
                  {/* Active indicator */}
                  {activeSection === link.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 w-2 h-2 bg-yellow-400 rounded-full"
                    />
                  )}
                  
                  <span className="text-lg mb-1">{link.icon}</span>
                  <span className="text-xs">{link.label}</span>
                  
                  {/* Hotkey for mobile */}
                  <div className="absolute -top-1 -right-1 bg-gray-800 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center border border-gray-600 opacity-60">
                    {link.hotkey}
                  </div>
                </motion.a>
              ))}
            </nav>

            {/* Mobile power-up notification */}
            <AnimatePresence>
              {powerUp && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-400 text-black text-sm font-bold px-3 py-2 rounded-lg border-2 border-yellow-300"
                >
                  🎮 +5 COINS!
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gaming-style CSS */}
      <style jsx>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        
        .scan-line {
          animation: scan 2s linear infinite;
        }
      `}</style>
    </>
  );
};