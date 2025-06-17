import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import {
  FaGithub,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

export const Home = ({ handleNavClick, isCollapsed = false }) => {
  const [selectedOption, setSelectedOption] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [coins, setCoins] = useState(0);
  const [showPowerUp, setShowPowerUp] = useState(false);
  const [showGlitch, setShowGlitch] = useState(false);

  // Updated menu options to match MobileMenu
  const menuOptions = [
    { id: "projects", label: "🎮 PROJECTS", color: "#00ff41" },
    { id: "certifications", label: "🏆 ACHIEVEMENTS", color: "#ff6b35" },
    { id: "about", label: "👤 PLAYER INFO", color: "#3498db" },
    { id: "contact", label: "📡 CONNECT", color: "#e74c3c" },
  ];

  const socialLinks = [
    { href: "https://github.com/nymav", icon: <FaGithub />, label: "GitHub" },
    { href: "https://linkedin.com/in/nikhil-yarra", icon: <FaLinkedinIn />, label: "LinkedIn" },
    { href: "https://instagram.com/ny.mav", icon: <FaInstagram />, label: "Instagram" },
  ];

  const isSplitScreen = typeof window !== "undefined" && window.innerWidth >= 1024 && isCollapsed;

  // Auto-start game when in split screen mode
  useEffect(() => {
    if (isSplitScreen) {
      setGameStarted(true);
      setCoins(50); // Give bonus coins for split screen mode
    }
  }, [isSplitScreen]);

  // Cursor blinking effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Power-up effect
  useEffect(() => {
    const powerUpInterval = setInterval(() => {
      setShowPowerUp(true);
      setTimeout(() => setShowPowerUp(false), 2000);
    }, 10000);
    return () => clearInterval(powerUpInterval);
  }, []);

  // Glitch effect - matching MobileMenu
  useEffect(() => {
    if (gameStarted) {
      const glitchInterval = setInterval(() => {
        setShowGlitch(true);
        setTimeout(() => setShowGlitch(false), 100);
      }, 3000);
      return () => clearInterval(glitchInterval);
    }
  }, [gameStarted]);

  // Keyboard navigation
  useEffect(() => {
    if (!gameStarted && !isSplitScreen) {
      const handleKeyPress = (e) => {
        if (e.key === "Enter" || e.key === " ") {
          setGameStarted(true);
          setCoins(prev => prev + 10);
        }
      };
      window.addEventListener("keydown", handleKeyPress);
      return () => window.removeEventListener("keydown", handleKeyPress);
    }

    const handleKeyPress = (e) => {
      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          setSelectedOption(prev => (prev - 1 + menuOptions.length) % menuOptions.length);
          break;
        case "ArrowDown":
        case "s":
        case "S":
          setSelectedOption(prev => (prev + 1) % menuOptions.length);
          break;
        case "Enter":
        case " ":
          const selected = menuOptions[selectedOption];
          if (selected.id === "contact") {
            window.open("mailto:nikhilyarra@gmail.com?subject=Portfolio Inquiry", "_blank");
          } else {
            handleNavClick(selected.id);
          }
          setCoins(prev => prev + 5);
          break;
        case "Escape":
          if (!isSplitScreen) {
            setGameStarted(false);
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [gameStarted, selectedOption, handleNavClick, menuOptions, isSplitScreen]);

  const collectCoin = () => {
    setCoins(prev => prev + 1);
  };

  const handleMenuClick = (option, index) => {
    setSelectedOption(index);
    setCoins(prev => prev + 3);
    
    // Add a small delay for visual feedback - matching MobileMenu
    setTimeout(() => {
      if (option.id === "contact") {
        window.open("mailto:nikhilyarra@gmail.com?subject=Portfolio Inquiry", "_blank");
      } else {
        handleNavClick(option.id);
      }
    }, 150);
  };

  return (
    <div
      className="w-full min-h-screen relative overflow-hidden"
      style={{
        fontFamily: "'Courier New', monospace",
        background: "linear-gradient(45deg, #0f0f23 25%, #1a1a2e 25%, #1a1a2e 50%, #0f0f23 50%, #0f0f23 75%, #1a1a2e 75%)",
        backgroundSize: "30px 30px",
        animation: "moveBackground 10s linear infinite",
      }}
    >
      {/* Retro grid background */}
      <div className="absolute inset-0 opacity-30">
        <div className="grid grid-cols-8 grid-rows-12 h-full w-full">
          {Array.from({ length: 96 }).map((_, i) => (
            <div key={i} className="border border-cyan-500/20"></div>
          ))}
        </div>
      </div>

      {/* Glitch effect overlay - matching MobileMenu */}
      {showGlitch && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.1 }}
          className="absolute inset-0 bg-red-500/10 z-10"
        />
      )}

      {/* HUD - matching MobileMenu */}
      {gameStarted && (
        <div className="absolute top-4 left-4 text-green-400 font-mono text-xs z-20">
          <div className="bg-black/80 p-2 rounded border border-green-400">
            <div>MODE: HOME</div>
            <div>COINS: {coins}</div>
          </div>
        </div>
      )}

      {/* Floating coins */}
      <AnimatePresence>
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 800), y: -50 }}
            animate={{ y: (typeof window !== "undefined" ? window.innerHeight : 600) + 50 }}
            exit={{ opacity: 0 }}
            transition={{ duration: Math.random() * 3 + 2, repeat: Infinity }}
            className="absolute text-2xl cursor-pointer"
            onClick={collectCoin}
            style={{ left: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 800) }}
          >
            🪙
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Floating particles - matching MobileMenu */}
      <div className="absolute inset-0 z-5">
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

      {/* Power-up notification */}
      <AnimatePresence>
        {showPowerUp && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="absolute top-20 right-4 bg-yellow-400 text-black p-2 rounded font-bold z-10"
          >
            ⚡ POWER UP! ⚡
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col items-center justify-center min-h-screen p-4 relative z-10">
        {!gameStarted && !isSplitScreen ? (
          // Start Screen (only show when not in split screen)
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl mb-8"
            >
              🎮
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-green-400 mb-4 pixel-text">
              NIKHIL.EXE
            </h1>
            
            <div className="text-xl text-cyan-400 mb-8 font-mono">
              <Typewriter
                words={["AI WIZARD", "ML SORCERER", "DATA ALCHEMIST"]}
                loop={0}
                cursor
                cursorStyle="_"
                typeSpeed={100}
                deleteSpeed={50}
                delaySpeed={2000}
              />
            </div>

            <motion.div
              animate={{ opacity: showCursor ? 1 : 0.3 }}
              className="text-2xl text-yellow-400 font-bold mb-8"
            >
              PRESS ENTER TO START
            </motion.div>

            <div className="text-sm text-gray-400 max-w-md">
              Welcome to my digital realm! Navigate with arrow keys, select with ENTER.
              Collect coins and explore my portfolio adventure!
            </div>
          </motion.div>
        ) : (
          // Game Menu (show when game started OR in split screen)
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-center max-w-2xl"
          >
            {/* Player Avatar */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="relative mx-auto w-32 h-32 mb-8"
            >
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-green-400 to-cyan-400 opacity-50 blur-xl"></div>
              <img
                src={`${import.meta.env.BASE_URL}pfp1.jpg`}
                alt="Player Avatar"
                className="relative z-10 w-full h-full object-cover rounded-lg border-4 border-green-400 pixelated"
                style={{ imageRendering: "pixelated" }}
              />
              <div className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs px-2 py-1 rounded font-bold">
                LVL 99
              </div>
            </motion.div>

            <h2 className={`text-3xl font-bold text-green-400 mb-2 pixel-text ${showGlitch ? 'glitch' : ''}`}>
              PLAYER: NIKHIL YARRA
            </h2>
            
            <p className="text-cyan-400 mb-8 font-mono">
              Data Science Warrior • AI Explorer • Code Ninja
            </p>

            {/* Game Menu - Updated to match MobileMenu styling */}
            <div className="flex flex-col items-center gap-3 z-20 w-full max-w-sm mx-auto mb-8">
              {menuOptions.map((option, index) => (
                <motion.button
                  key={option.id}
                  onClick={() => handleMenuClick(option, index)}
                  className={`
                    relative w-full text-xl font-mono px-8 py-4 transition-all duration-200 rounded-lg
                    ${selectedOption === index 
                      ? 'bg-gradient-to-r from-yellow-600 to-yellow-500 text-black border-2 border-yellow-400 shadow-lg shadow-yellow-400/50' 
                      : 'bg-gray-800/60 text-gray-300 border-2 border-gray-600 hover:border-gray-400 hover:bg-gray-700/60'
                    }
                    ${showGlitch && index === selectedOption ? 'animate-pulse' : ''}
                  `}
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    delay: index * 0.1, 
                    type: "spring",
                    stiffness: 200,
                    damping: 20
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={() => setSelectedOption(index)}
                >
                  <span className="font-bold tracking-wider">
                    {option.label}
                  </span>
                  
                  {/* Selected item glow effect */}
                  {selectedOption === index && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 rounded-lg"
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Social Links as Power-ups */}
            <div className="flex justify-center gap-4 mb-8">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-purple-600 border-2 border-purple-400 rounded-lg flex items-center justify-center text-white hover:bg-purple-500 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCoins(prev => prev + 2)}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>

            {/* Controls - matching MobileMenu */}
            <div className="text-xs text-gray-400 space-y-1">
              <div>↑↓ NAVIGATE • ENTER SELECT {!isSplitScreen && "• ESC BACK TO START"}</div>
              <div className="text-cyan-400">CLICK TO SELECT • HOVER TO NAVIGATE</div>
            </div>
          </motion.div>
        )}
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
        
        .pixelated {
          image-rendering: -moz-crisp-edges;
          image-rendering: -webkit-crisp-edges;
          image-rendering: pixelated;
          image-rendering: crisp-edges;
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
    </div>
  );
};