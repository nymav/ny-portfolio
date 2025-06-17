import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export const About = () => {
  const [selectedStat, setSelectedStat] = useState(0);
  const [experience, setExperience] = useState(0);
  const [showPowerUp, setShowPowerUp] = useState(false);
  const [glitchEffect, setGlitchEffect] = useState(false);

  const playerStats = [
    { label: "CODING LEVEL", value: 95, color: "#00ff41", icon: "💻" },
    { label: "ML MASTERY", value: 90, color: "#ff6b35", icon: "🧠" },
    { label: "DATA WIZARDRY", value: 88, color: "#3498db", icon: "📊" },
    { label: "AI SORCERY", value: 85, color: "#e74c3c", icon: "🤖" },
  ];

  const skillCategories = [
    {
      title: "🔬 AI & ML ARSENAL",
      skills: ["Python", "Pandas", "NumPy", "Scikit-Learn", "TensorFlow", "PyTorch", "OpenCV", "XGBoost", "Matplotlib", "Seaborn"],
      color: "#00ff41"
    },
    {
      title: "⚙️ DATA ENGINEERING TOOLS",
      skills: ["SQL", "MongoDB", "AWS", "Apache Spark", "Flask", "Docker", "Git"],
      color: "#ff6b35"
    }
  ];

  const achievements = [
    {
      title: "🎓 EDUCATION UNLOCKED",
      items: [
        { name: "MS in Data Science", location: "NJIT (2024)", rarity: "LEGENDARY" },
        { name: "B.Tech in CSE", location: "GITAM", rarity: "EPIC" },
        { name: "Specialized Studies", location: "ML, DL, RL, AI, Cloud, Big Data", rarity: "RARE" }
      ]
    },
    {
      title: "💼 QUEST COMPLETIONS",
      items: [
        { 
          name: "Data Analytics Intern", 
          location: "Phoenix Global",
          description: "Built sentiment analysis dashboard using AWS, Pandas, and Plotly. Automated reporting pipelines.",
          rarity: "EPIC"
        },
        { 
          name: "Technical Team Member", 
          location: "CYSEC, GITAM",
          description: "ML-based threat detection using OSINT. Supported CTF events and cybersecurity research.",
          rarity: "RARE"
        }
      ]
    }
  ];

  // Experience counter effect
  useEffect(() => {
    const interval = setInterval(() => {
      setExperience(prev => (prev + 1) % 100);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Power-up effect
  useEffect(() => {
    const powerUpInterval = setInterval(() => {
      setShowPowerUp(true);
      setTimeout(() => setShowPowerUp(false), 2000);
    }, 8000);
    return () => clearInterval(powerUpInterval);
  }, []);

  // Glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchEffect(true);
      setTimeout(() => setGlitchEffect(false), 200);
    }, 5000);
    return () => clearInterval(glitchInterval);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      switch (e.key) {
        case "ArrowLeft":
        case "a":
        case "A":
          setSelectedStat(prev => (prev - 1 + playerStats.length) % playerStats.length);
          break;
        case "ArrowRight":
        case "d":
        case "D":
          setSelectedStat(prev => (prev + 1) % playerStats.length);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [playerStats.length]);

  return (
    <section
      id="about"
      className="w-full min-h-screen py-8 px-4 text-white relative overflow-hidden"
      style={{
        fontFamily: "'Courier New', monospace",
        background: "linear-gradient(45deg, #0f0f23 25%, #1a1a2e 25%, #1a1a2e 50%, #0f0f23 50%, #0f0f23 75%, #1a1a2e 75%)",
        backgroundSize: "20px 20px",
        animation: "moveBackground 20s linear infinite",
      }}
    >
      {/* Retro grid background */}
      <div className="absolute inset-0 opacity-20">
        <div className="grid grid-cols-12 grid-rows-12 h-full w-full">
          {Array.from({ length: 144 }).map((_, i) => (
            <div key={i} className="border border-cyan-500/30"></div>
          ))}
        </div>
      </div>

      {/* Power-up notification */}
      <AnimatePresence>
        {showPowerUp && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="absolute top-4 right-4 bg-yellow-400 text-black p-2 rounded font-bold z-10"
          >
            ⚡ SKILL UP! ⚡
          </motion.div>
        )}
      </AnimatePresence>

      {/* HUD */}
      <div className="absolute top-4 left-4 text-green-400 font-mono text-sm z-10">
        <div className="bg-black/80 p-2 rounded border border-green-400">
          <div>XP: {experience}%</div>
          <div>STATUS: PLAYER INFO</div>
          <div>CLASS: DATA WIZARD</div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl relative z-10 pt-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className={`text-4xl md:text-6xl font-bold mb-4 pixel-text ${glitchEffect ? 'glitch' : ''}`}>
            <span className="text-green-400">PLAYER</span>{" "}
            <span className="text-cyan-400">PROFILE</span>
          </h2>
          <div className="text-xl text-yellow-400">◤ ANALYZING DATA WIZARD ◥</div>
        </motion.div>

        {/* Player Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-black/40 border-2 border-green-400 rounded-lg p-6 mb-8 backdrop-blur"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-32 h-32 rounded-full border-4 border-cyan-400 p-1"
              >
                <div className="w-full h-full bg-gradient-to-br from-green-400 to-cyan-400 rounded-full flex items-center justify-center text-4xl">
                  🧙‍♂️
                </div>
              </motion.div>
              <div className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs px-2 py-1 rounded font-bold">
                LVL 99
              </div>
            </div>

            {/* Player Info */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold text-green-400 mb-2 pixel-text">
                NIKHIL YARRA
              </h3>
              <p className="text-cyan-400 mb-4 font-mono">
                Data Science Graduate • AI Explorer • ML Enthusiast
              </p>
              <div className="text-gray-300 text-sm">
                <div>🏫 NJIT Alumni | 🎯 Specialized in AI/ML/DL</div>
                <div>🌟 Quest: Transform data into actionable insights</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Player Stats */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <h3 className="text-2xl font-bold text-purple-400 mb-4 pixel-text">
            📊 PLAYER STATISTICS
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {playerStats.map((stat, index) => (
              <motion.div
                key={index}
                className={`
                  border-2 rounded-xl p-5 transition-all duration-300 bg-black bg-opacity-40 backdrop-blur cursor-pointer relative
                  ${selectedStat === index 
                    ? 'border-yellow-400 bg-yellow-900 bg-opacity-20 shadow-lg shadow-yellow-400/20' 
                    : 'border-gray-700 hover:border-purple-400'
                  }
                `}
                onClick={() => setSelectedStat(index)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <div className="text-sm text-gray-400 mb-2">{stat.label}</div>
                  <div className="relative bg-gray-700 rounded-full h-2 mb-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${stat.value}%` }}
                      transition={{ delay: index * 0.1, duration: 1 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: stat.color }}
                    />
                  </div>
                  <div className="text-xl font-bold" style={{ color: stat.color }}>
                    {stat.value}%
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-2 text-xs text-gray-400">
            ← → NAVIGATE STATS • CLICK TO SELECT
          </div>
        </motion.div>

        {/* Skills Inventory */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h3 className="text-2xl font-bold text-purple-400 mb-4 pixel-text">
            🎒 SKILL INVENTORY
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {skillCategories.map((category, catIndex) => (
              <div
                key={catIndex}
                className="bg-black/40 border-2 border-gray-600 rounded-lg p-4"
              >
                <h4 className="text-lg font-bold mb-3" style={{ color: category.color }}>
                  {category.title}
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skillIndex}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: catIndex * 0.1 + skillIndex * 0.05 }}
                      className="bg-gray-800 border border-gray-600 rounded px-2 py-1 text-xs text-center hover:border-yellow-400 hover:bg-yellow-400/10 transition-colors cursor-pointer"
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {achievements.map((section, sectionIndex) => (
            <div key={sectionIndex} className="bg-black/40 border-2 border-gray-600 rounded-lg p-6">
              <h3 className="text-2xl font-bold text-purple-400 mb-4 pixel-text">
                {section.title}
              </h3>
              <div className="space-y-4">
                {section.items.map((item, itemIndex) => (
                  <motion.div
                    key={itemIndex}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: sectionIndex * 0.1 + itemIndex * 0.05 }}
                    className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:border-yellow-400/50 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                      <h4 className="text-white font-bold">{item.name}</h4>
                      <div className="flex items-center gap-2">
                        <span className="text-cyan-400 text-sm">@ {item.location}</span>
                        <span 
                          className={`
                            text-xs px-2 py-1 rounded-full font-bold
                            ${item.rarity === 'LEGENDARY' ? 'bg-orange-500 text-black' : 
                              item.rarity === 'EPIC' ? 'bg-purple-500 text-white' : 
                              'bg-blue-500 text-white'}
                          `}
                        >
                          {item.rarity}
                        </span>
                      </div>
                    </div>
                    {item.description && (
                      <p className="text-gray-400 text-sm">{item.description}</p>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12 text-gray-400 text-sm"
        >
          <div className="border-t border-gray-700 pt-4">
            STATUS: Ready for new challenges • NEXT QUEST: Building AI solutions
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes moveBackground {
          0% { background-position: 0 0; }
          100% { background-position: 40px 40px; }
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
    </section>
  );
};