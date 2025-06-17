import { useState, useEffect } from "react";
import {
  FaGithub,
  FaLinkedinIn,
  FaInstagram,
  FaEnvelope,
  FaGamepad,
  FaTimes,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export const SocialBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [glitchEffect, setGlitchEffect] = useState(false);
  const [scanLine, setScanLine] = useState(0);
  const [coins, setCoins] = useState(0);
  const [powerLevel, setPowerLevel] = useState(0);

  const socials = [
    {
      href: "https://github.com/nymav",
      icon: <FaGithub />,
      label: "GITHUB",
      color: "purple",
      emoji: "💻",
      description: "CODE REPOSITORY"
    },
    {
      href: "https://linkedin.com/in/nikhil-yarra",
      icon: <FaLinkedinIn />,
      label: "LINKEDIN",
      color: "blue",
      emoji: "💼",
      description: "PROFESSIONAL NETWORK"
    },
    {
      href: "https://instagram.com/ny.mav",
      icon: <FaInstagram />,
      label: "INSTAGRAM",
      color: "pink",
      emoji: "📸",
      description: "VISUAL CONTENT"
    },
    {
      href: "mailto:nikhilyarra@gmail.com?subject=Opportunity%20to%20Collaborate%20with%20You&body=Hi%20Nikhil,%0A%0AI%20came%20across%20your%20portfolio%20and%20would%20love%20to%20connect.",
      icon: <FaEnvelope />,
      label: "EMAIL",
      color: "green",
      emoji: "📨",
      description: "DIRECT MESSAGE"
    },
  ];

  // Glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchEffect(true);
      setTimeout(() => setGlitchEffect(false), 200);
    }, 8000);
    return () => clearInterval(glitchInterval);
  }, []);

  // Scan line effect
  useEffect(() => {
    const scanInterval = setInterval(() => {
      setScanLine(prev => (prev + 1) % 100);
    }, 80);
    return () => clearInterval(scanInterval);
  }, []);

  // Power level animation
  useEffect(() => {
    const powerInterval = setInterval(() => {
      setPowerLevel(prev => (prev + 1) % 100);
    }, 150);
    return () => clearInterval(powerInterval);
  }, []);

  const getColorClasses = (color) => {
    const colors = {
      purple: "border-purple-400 bg-purple-400/20 text-purple-400 hover:bg-purple-400/30",
      blue: "border-blue-400 bg-blue-400/20 text-blue-400 hover:bg-blue-400/30",
      pink: "border-pink-400 bg-pink-400/20 text-pink-400 hover:bg-pink-400/30",
      green: "border-green-400 bg-green-400/20 text-green-400 hover:bg-green-400/30"
    };
    return colors[color] || colors.purple;
  };

  const handleSocialClick = (social) => {
    setCoins(prev => prev + 10);
    // Add some visual feedback
    const button = document.querySelector(`[data-social="${social.label}"]`);
    if (button) {
      button.classList.add('animate-ping');
      setTimeout(() => button.classList.remove('animate-ping'), 300);
    }
  };

  return (
    <>
      {/* Mobile Floating Button */}
      <div className="md:hidden fixed bottom-20 right-4 z-[999]">
        <motion.button
          onClick={() => setIsOpen(true)}
          className="relative bg-black border-2 border-cyan-400 text-cyan-400 p-4 rounded-xl shadow-lg hover:bg-cyan-400/20 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{ fontFamily: "'Courier New', monospace" }}
        >
          <FaGamepad className="text-xl" />
          <div className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs px-2 py-1 rounded-full font-bold animate-pulse">
            {coins}
          </div>
          {/* Scan line effect */}
          <div 
            className="absolute inset-0 pointer-events-none rounded-xl"
            style={{
              background: `linear-gradient(0deg, transparent ${scanLine - 5}%, rgba(0, 255, 255, 0.3) ${scanLine}%, transparent ${scanLine + 5}%)`
            }}
          />
        </motion.button>
      </div>

      {/* Mobile Bottom Sheet */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-end justify-center md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            style={{
              background: "radial-gradient(circle at center, rgba(15, 15, 35, 0.9) 0%, rgba(0, 0, 0, 0.95) 100%)",
              backdropFilter: "blur(10px)"
            }}
          >
            <motion.div
              className="w-full max-w-sm rounded-t-2xl border-t-4 border-cyan-400 shadow-2xl relative overflow-hidden"
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                fontFamily: "'Courier New', monospace",
                background: "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%)"
              }}
            >
              {/* Retro grid background */}
              <div className="absolute inset-0 opacity-10">
                <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
                  {Array.from({ length: 64 }).map((_, i) => (
                    <div key={i} className="border border-cyan-500/20"></div>
                  ))}
                </div>
              </div>

              {/* Header */}
              <div className="flex justify-between items-center p-6 border-b border-cyan-400/30 relative">
                <div>
                  <div className={`text-xl font-bold text-cyan-400 pixel-text ${glitchEffect ? 'glitch' : ''}`}>
                    🎮 SOCIAL TERMINAL
                  </div>
                  <div className="text-xs text-green-400 mt-1">
                    NETWORK_STATUS: ONLINE • COINS: {coins}
                  </div>
                </div>
                <button
                  className="text-red-400 hover:text-red-300 border border-red-400 rounded p-2 hover:bg-red-400/20 transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  <FaTimes />
                </button>
              </div>

              {/* Power Level Bar */}
              <div className="px-6 py-2 border-b border-cyan-400/30">
                <div className="text-xs text-yellow-400 mb-1">SOCIAL_POWER: {powerLevel}%</div>
                <div className="w-full bg-gray-800 rounded-full h-2 border border-yellow-400/50">
                  <div 
                    className="bg-gradient-to-r from-yellow-400 to-orange-400 h-full rounded-full transition-all duration-300"
                    style={{ width: `${powerLevel}%` }}
                  />
                </div>
              </div>

              {/* Social Links */}
              <div className="p-6 space-y-4">
                {socials.map((social, idx) => (
                  <motion.a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-social={social.label}
                    onClick={() => handleSocialClick(social)}
                    className={`
                      flex items-center gap-4 p-4 rounded-lg border-2 transition-all duration-300
                      ${getColorClasses(social.color)}
                      hover:scale-105 cursor-pointer
                    `}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * idx }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="text-2xl">{social.emoji}</div>
                    <div className="flex-1">
                      <div className="font-bold text-sm">{social.label}</div>
                      <div className="text-xs opacity-70">{social.description}</div>
                    </div>
                    <div className="text-lg">{social.icon}</div>
                    <div className="text-xs opacity-50">+10 🪙</div>
                  </motion.a>
                ))}
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-cyan-400/30 text-center">
                <div className="text-xs text-gray-400">
                  CLICK TO CONNECT • EARN COINS • LEVEL UP
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.nav
        initial={{ x: 60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="hidden md:flex fixed top-1/2 right-6 -translate-y-1/2 z-50 flex-col gap-4"
        style={{ fontFamily: "'Courier New', monospace" }}
      >
        {/* Power Level Display */}
        <motion.div
          className="bg-black/80 border-2 border-yellow-400 rounded-lg p-3 mb-2"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="text-xs text-yellow-400 text-center mb-1">SOCIAL PWR</div>
          <div className="w-16 bg-gray-800 rounded-full h-2 border border-yellow-400/50">
            <div 
              className="bg-gradient-to-r from-yellow-400 to-orange-400 h-full rounded-full"
              style={{ width: `${powerLevel}%` }}
            />
          </div>
          <div className="text-xs text-center text-white mt-1">{coins} 🪙</div>
        </motion.div>

        {socials.map((social, idx) => (
          <motion.div
            key={social.href}
            className="relative group"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + idx * 0.1 }}
          >
            <motion.a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              data-social={social.label}
              onClick={() => handleSocialClick(social)}
              className={`
                group relative flex items-center justify-center w-16 h-16 rounded-xl
                border-2 transition-all duration-300 backdrop-blur-sm
                ${getColorClasses(social.color)}
                hover:scale-110 cursor-pointer pixel-border
              `}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className="text-xl">{social.icon}</div>
              <div className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs px-1 py-0.5 rounded-full font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                +10
              </div>
              
              {/* Scan line effect */}
              <div 
                className="absolute inset-0 pointer-events-none rounded-xl"
                style={{
                  background: `linear-gradient(0deg, transparent ${scanLine - 5}%, rgba(255, 255, 255, 0.1) ${scanLine}%, transparent ${scanLine + 5}%)`
                }}
              />
            </motion.a>

            {/* Hover tooltip */}
            <div className="absolute right-20 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
              <div className="bg-black border-2 border-cyan-400 text-cyan-400 text-xs font-bold rounded-lg px-3 py-2 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <span>{social.emoji}</span>
                  <span>{social.label}</span>
                </div>
                <div className="text-gray-400 text-xs mt-1">{social.description}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.nav>

      <style jsx>{`
        .pixel-text {
          text-shadow: 
            2px 2px 0px #000,
            4px 4px 0px rgba(0,0,0,0.5);
          letter-spacing: 1px;
        }
        
        .pixel-border {
          box-shadow: 
            0 0 20px rgba(0, 255, 255, 0.3),
            inset 0 0 20px rgba(0, 255, 255, 0.1);
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
    </>
  );
};