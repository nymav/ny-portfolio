import { useEffect, useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(0);
  const [coins, setCoins] = useState(0);
  const [experience, setExperience] = useState(0);
  const [showPowerUp, setShowPowerUp] = useState(false);
  const [glitchEffect, setGlitchEffect] = useState(false);
  const [scanLine, setScanLine] = useState(0);
  const [activeFilter, setActiveFilter] = useState("all");
  const [windowDimensions, setWindowDimensions] = useState({ width: 1000, height: 1000 });

  const projects = [
    {
      title: "DRAX TBS - AI-Powered Tutoring System",
      description: "Built RAG-based tutoring API that processes PDF textbooks and provides intelligent tutoring through conversational AI.",
      tech: ["Python", "FastAPI", "ChromaDB", "Sentence Transformers", "SQLite", "LM Studio"],
      link: "https://github.com/nymav/drax_tbs",
      category: "ai-ml",
      difficulty: "LEGENDARY",
      icon: "🎓"
    },
    {
      title: "Flight Data Analysis with MapReduce",
      description: "Analyzed 22 years of flight data using MapReduce jobs to rank airlines and airports.",
      tech: ["Hadoop", "MapReduce", "Java", "AWS EMR"],
      link: "https://github.com/nymav/Fligh-Data-Analysis-with-MapReduce",
      category: "big-data",
      difficulty: "LEGENDARY",
      icon: "✈️"
    },
    {
      title: "Web Scraping Neural Development Research",
      description: "Extracted metadata from articles using R and visualized keyword trends.",
      tech: ["R", "rvest", "dplyr", "ggplot2"],
      link: "https://github.com/nymav/Web-Scraping-Articles",
      category: "data-science",
      difficulty: "EPIC",
      icon: "🧠"
    },
    {
      title: "Face Emotion Detection Using CNNs",
      description: "Compared VGG, ResNet, DenseNet for facial emotion recognition with SMOTE.",
      tech: ["Python", "TensorFlow", "Keras", "OpenCV", "SMOTE"],
      link: "https://github.com/nymav/Face-Emotion-Detection-Using-CNNs",
      category: "ai-ml",
      difficulty: "LEGENDARY",
      icon: "😊"
    },
    {
      title: "Causal Inference in Healthcare",
      description: "Estimated treatment effects using DoWhy and SHAP on MIMIC-III data.",
      tech: ["Python", "DoWhy", "EconML", "SHAP"],
      category: "ai-ml",
      difficulty: "LEGENDARY",
      icon: "🏥"
    },
    {
      title: "Bank Campaign Response Prediction",
      description: "Built XGBoost & SVM models to predict marketing outcomes with SHAP insights.",
      tech: ["Python", "XGBoost", "SVM", "SHAP"],
      link: "https://github.com/nymav/Predictive-Modeling-for-Optimizing-Bank-Marketing-Campaigns-Using-Machine-Learning",
      category: "ai-ml",
      difficulty: "EPIC",
      icon: "🏦"
    },
    {
      title: "Apple Stock Price Forecasting",
      description: "Predicted Apple stock prices using LSTM and smoothing techniques.",
      tech: ["TensorFlow", "LSTM", "SQL", "Pandas"],
      category: "ai-ml",
      difficulty: "EPIC",
      icon: "📈"
    },
    {
      title: "DDoS Attack Detection Tool",
      description: "Built a tool using AdaBoost & Naive Bayes to detect DDoS with 40% load cut.",
      tech: ["Scikit-learn", "AdaBoost", "PyQt"],
      link: "https://github.com/nymav/DDoS-Attack-Detection-using-Machine-Learning",
      category: "cybersecurity",
      difficulty: "LEGENDARY",
      icon: "🛡️"
    },
    {
      title: "Sentiment Analysis on Uber & Ola",
      description: "Classified tweets using Word2Vec and CNN for ride-sharing sentiment.",
      tech: ["Word2Vec", "CNN", "TensorFlow"],
      link: "https://github.com/nymav/Sentiment-Analysis-on-Uber-and-Ola",
      category: "ai-ml",
      difficulty: "EPIC",
      icon: "🚗"
    },
    {
      title: "Role-Based VIP Access Portal (Flask + MySQL)",
      description: "Built a role-based VIP login system using Flask and MySQL, featuring user authentication, dashboard views, and secure backend logic.",
      tech: ["Flask", "Python", "SQLAlchemy", "MySQL", "HTML/CSS"],
      category: "web-dev",
      difficulty: "RARE",
      icon: "🔐"
    },
    {
      title: "Diet of the Deep – Fish Trophic Data Analysis",
      description: "Exploratory analysis on 54K+ freshwater fish diet records using R and Python to reveal trophic patterns, gaps, and sampling bias.",
      tech: ["Python", "R", "Tidyverse", "GeoPandas", "Data Visualization"],
      category: "data-science",
      difficulty: "EPIC",
      icon: "🐟"
    },
    {
      title: "DaChat - CSV Chat + ML Predictions",
      description: "A Streamlit app that lets you chat with your CSV data and get AI-powered price predictions. Features natural language CSV queries, ML property price predictions, and LM Studio integration.",
      tech: ["Python", "Streamlit", "Pandas", "Scikit-learn", "LM Studio"],
      category: "ai-ml",
      difficulty: "LEGENDARY",
      link: "https://github.com/nymav/DaChat",
      icon: "💬"
    },
    {
      title: "synapshowcase - Developer Portfolio Template",
      description: "A vibrant, glowing React + Vite + Tailwind CSS portfolio template designed for AI/ML projects with gaming aesthetics, smooth transitions, and dark-themed UI.",
      tech: ["React", "Vite", "Tailwind CSS", "Framer Motion", "JavaScript"],
      category: "web-dev",
      difficulty: "EPIC",
      link: "https://github.com/nymav/synapshowcase",
      icon: "🎮"
    }
  ];

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    if (typeof window !== 'undefined') {
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Filter projects based on active filter
  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") {
      return projects;
    }
    return projects.filter(project => project.category === activeFilter);
  }, [activeFilter]);
  
  const stats = useMemo(() => {
    return {
      "ai-ml": projects.filter(p => p.category === "ai-ml").length,
      "data-science": projects.filter(p => p.category === "data-science").length,
      "cybersecurity": projects.filter(p => p.category === "cybersecurity").length,
      "web-dev": projects.filter(p => p.category === "web-dev").length,
      "big-data": projects.filter(p => p.category === "big-data").length
    };
  }, []);

  // Reset selected project when filter changes
  useEffect(() => {
    setSelectedProject(0);
  }, [activeFilter]);

  // Experience counter effect
  useEffect(() => {
    const interval = setInterval(() => {
      setExperience(prev => (prev + 1) % 100);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  // Power-up effect
  useEffect(() => {
    const powerUpInterval = setInterval(() => {
      setShowPowerUp(true);
      setTimeout(() => setShowPowerUp(false), 2000);
    }, 12000);
    return () => clearInterval(powerUpInterval);
  }, []);

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
    }, 50);
    return () => clearInterval(scanInterval);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      const totalProjects = filteredProjects.length;
      
      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          e.preventDefault();
          if (totalProjects > 0) {
            setSelectedProject(prev => (prev - 1 + totalProjects) % totalProjects);
          }
          break;
        case "ArrowDown":
        case "s":
        case "S":
          e.preventDefault();
          if (totalProjects > 0) {
            setSelectedProject(prev => (prev + 1) % totalProjects);
          }
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          if (totalProjects > 0 && filteredProjects[selectedProject] && filteredProjects[selectedProject].link) {
            window.open(filteredProjects[selectedProject].link, "_blank");
            setCoins(prev => prev + 15);
          }
          break;
        case "1":
          setActiveFilter("ai-ml");
          break;
        case "2":
          setActiveFilter("data-science");
          break;
        case "3":
          setActiveFilter("cybersecurity");
          break;
        case "4":
          setActiveFilter("web-dev");
          break;
        case "5":
          setActiveFilter("big-data");
          break;
        case "0":
          setActiveFilter("all");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [filteredProjects, selectedProject]);

  const collectCoin = useCallback(() => {
    setCoins(prev => prev + 1);
  }, []);

  const getDifficultyColor = useCallback((difficulty) => {
    switch (difficulty) {
      case "LEGENDARY": return "text-orange-400 border-orange-400 bg-orange-900 bg-opacity-20";
      case "EPIC": return "text-purple-400 border-purple-400 bg-purple-900 bg-opacity-20";
      case "RARE": return "text-blue-400 border-blue-400 bg-blue-900 bg-opacity-20";
      default: return "text-gray-400 border-gray-400 bg-gray-900 bg-opacity-20";
    }
  }, []);

  const getCategoryColor = useCallback((category) => {
    switch (category) {
      case "ai-ml": return "text-green-400";
      case "data-science": return "text-blue-400";
      case "cybersecurity": return "text-red-400";
      case "web-dev": return "text-cyan-400";
      case "big-data": return "text-yellow-400";
      default: return "text-purple-400";
    }
  }, []);

  const getTitleColorForFilter = useCallback(() => {
    if (activeFilter === "all") {
      return "text-purple-400";
    }
    return getCategoryColor(activeFilter);
  }, [activeFilter, getCategoryColor]);

  const getCategoryButtonClasses = useCallback((categoryKey, isActive) => {
    const baseClasses = "px-3 py-2 rounded border-2 font-mono transition-all duration-200";
    
    if (isActive) {
      switch (categoryKey) {
        case "ai-ml":
          return `${baseClasses} border-green-400 bg-green-900 bg-opacity-20 text-green-400 transform scale-105`;
        case "data-science":
          return `${baseClasses} border-blue-400 bg-blue-900 bg-opacity-20 text-blue-400 transform scale-105`;
        case "cybersecurity":
          return `${baseClasses} border-red-400 bg-red-900 bg-opacity-20 text-red-400 transform scale-105`;
        case "web-dev":
          return `${baseClasses} border-cyan-400 bg-cyan-900 bg-opacity-20 text-cyan-400 transform scale-105`;
        case "big-data":
          return `${baseClasses} border-yellow-400 bg-yellow-900 bg-opacity-20 text-yellow-400 transform scale-105`;
        case "all":
          return `${baseClasses} border-purple-400 bg-purple-900 bg-opacity-20 text-purple-400 transform scale-105`;
        default:
          return `${baseClasses} border-gray-400 bg-gray-900 bg-opacity-20 text-gray-400 transform scale-105`;
      }
    }
    
    return `${baseClasses} border-gray-600 text-gray-300 hover:border-gray-400`;
  }, []);

  const handleProjectClick = useCallback((index, e) => {
    // Only set as selected, don't open link automatically
    setSelectedProject(index);
    e.stopPropagation();
  }, []);

  const handleLaunchClick = useCallback((project, e) => {
    e.stopPropagation();
    if (project.link) {
      window.open(project.link, "_blank");
      setCoins(prev => prev + 15);
    }
  }, []);

  return (
    <>
      <style>
        {`
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
        `}
      </style>
      <section
        id="projects"
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
              <div key={`grid-${i}`} className="border border-cyan-500 border-opacity-30"></div>
            ))}
          </div>
        </div>

        {/* Scan line effect */}
        <div 
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: `linear-gradient(0deg, transparent ${scanLine - 1}%, rgba(0, 255, 65, 0.1) ${scanLine}%, transparent ${scanLine + 1}%)`
          }}
        />

        {/* Floating coins */}
        <AnimatePresence>
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={`coin-${i}`}
              initial={{ x: Math.random() * windowDimensions.width, y: -50 }}
              animate={{ y: windowDimensions.height + 50 }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: Math.random() * 4 + 3, 
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute text-xl cursor-pointer z-20 hover:scale-125 transition-transform"
              onClick={collectCoin}
              style={{ left: Math.random() * (windowDimensions.width - 50) }}
            >
              🛠️
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Power-up notification */}
        <AnimatePresence>
          {showPowerUp && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute top-4 right-4 bg-yellow-400 text-black p-2 rounded font-bold z-30"
            >
              🚀 PROJECT MASTERY! 🚀
            </motion.div>
          )}
        </AnimatePresence>

        {/* HUD */}
        <div className="absolute top-4 left-4 text-green-400 font-mono text-sm z-30">
          <div className="bg-black bg-opacity-80 p-2 rounded border border-green-400">
            <div>XP: {experience}%</div>
            <div>STATUS: PROJECT EXPLORER</div>
            <div>TOTAL: {projects.length} PROJECTS</div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-6xl relative z-20 pt-20">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h2 className={`text-4xl md:text-6xl font-bold mb-4 pixel-text ${glitchEffect ? 'glitch' : ''}`}>
              <span className="text-green-400">🛠️</span>{" "}
              <span className="text-purple-400">PROJECT</span>{" "}
              <span className="text-cyan-400">ARSENAL</span>
            </h2>
            <div className="text-xl text-yellow-400">◤ CODE • BUILD • DEPLOY ◥</div>
          </motion.div>

          {/* Stats Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-black bg-opacity-40 backdrop-blur border-2 border-purple-400 rounded-xl p-4 mb-8"
          >
            <div className="text-center">
              <div className="text-sm font-semibold text-purple-400 mb-2">📊 PROJECT STATS</div>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 text-xs">
                <div className="bg-green-900 bg-opacity-20 border border-green-400 rounded p-2">
                  <div className="text-green-400 font-bold">🤖 AI/ML</div>
                  <div className="text-white">{stats["ai-ml"]} Projects</div>
                </div>
                <div className="bg-blue-900 bg-opacity-20 border border-blue-400 rounded p-2">
                  <div className="text-blue-400 font-bold">📊 DATA SCI</div>
                  <div className="text-white">{stats["data-science"]} Projects</div>
                </div>
                <div className="bg-red-900 bg-opacity-20 border border-red-400 rounded p-2">
                  <div className="text-red-400 font-bold">🔐 SECURITY</div>
                  <div className="text-white">{stats["cybersecurity"]} Projects</div>
                </div>
                <div className="bg-cyan-900 bg-opacity-20 border border-cyan-400 rounded p-2">
                  <div className="text-cyan-400 font-bold">🌐 WEB DEV</div>
                  <div className="text-white">{stats["web-dev"]} Projects</div>
                </div>
                <div className="bg-yellow-900 bg-opacity-20 border border-yellow-400 rounded p-2">
                  <div className="text-yellow-400 font-bold">💾 BIG DATA</div>
                  <div className="text-white">{stats["big-data"]} Projects</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Game Menu Style Filters */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-black bg-opacity-60 border-2 border-gray-700 rounded-lg p-4 mb-8"
          >
            <div className="text-sm font-semibold text-purple-400 mb-3">🎮 SELECT PROJECT CATEGORY:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2 text-xs">
              {[
                  { key: "ai-ml", label: "🤖 AI/ML MASTER", keyNum: "6" },
                  { key: "data-science", label: "📊 DATA WIZARD", keyNum: "3" },
                  { key: "cybersecurity", label: "🔐 CYBER GUARD", keyNum: "1" },
                  { key: "web-dev", label: "🌐 WEB NINJA", keyNum: "2" },
                  { key: "big-data", label: "💾 BIG DATA", keyNum: "1" },
                  { key: "all", label: "🌟 ALL PROJECTS", keyNum: "13" }
                
              ].map((category) => (
                <motion.button
                  key={category.key}
                  onClick={() => {
                    setActiveFilter(category.key);
                    setCoins(prev => prev + 2);
                  }}
                  className={getCategoryButtonClasses(category.key, activeFilter === category.key)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {category.label}
                  <div className="text-xs opacity-60">[{category.keyNum}]</div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid gap-6"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={`${project.title}-${activeFilter}-${index}`}
                className={`
                  border-2 rounded-xl p-5 transition-all duration-300 bg-black bg-opacity-40 backdrop-blur cursor-pointer relative
                  ${selectedProject === index 
                    ? 'border-yellow-400 bg-yellow-900 bg-opacity-20 shadow-lg shadow-yellow-400/20' 
                    : 'border-gray-700 hover:border-purple-400'
                  }
                `}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04, duration: 0.4 }}
                onClick={(e) => handleProjectClick(index, e)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                {selectedProject === index && (
                  <div className="absolute -top-2 -left-2 bg-yellow-400 text-black text-xs px-2 py-1 rounded font-bold animate-pulse">
                    SELECTED
                  </div>
                )}
                
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{project.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className={`text-lg sm:text-xl font-bold pixel-text ${getTitleColorForFilter()}`}>
                        {project.title}
                      </h3>
                      <span className={`text-xs px-2 py-1 rounded border ${getDifficultyColor(project.difficulty)} font-bold`}>
                        {project.difficulty}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-300 mb-3">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.tech.map((tech, i) => (
                        <span
                          key={`${tech}-${i}`}
                          className="bg-gray-800 text-gray-300 text-xs px-3 py-1 rounded-full border border-gray-600"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-400">
                        CATEGORY: <span className="text-cyan-400 uppercase">{project.category.replace('-', ' ')}</span>
                      </div>
                      
                      <div>
                        {project.link ? (
                          <button
                            onClick={(e) => handleLaunchClick(project, e)}
                            className="text-sm text-purple-400 hover:text-white transition flex items-center gap-2 bg-purple-900 bg-opacity-20 border border-purple-400 px-3 py-1 rounded hover:bg-purple-900 hover:bg-opacity-40"
                          >
                            <span>🎯 Launch Project</span>
                            <span className="animate-bounce">→</span>
                          </button>
                        ) : (
                          <span className="text-sm text-gray-500 italic">
                            🔒 Private Repository
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* No Results */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center mt-8 bg-red-900 bg-opacity-40 border-2 border-red-600 rounded-lg p-6"
            >
              <div className="text-4xl mb-2">❌</div>
              <p className="text-red-400 font-mono">
                PROJECT SEARCH FAILED: No projects in this category
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Try selecting a different category or view all projects
              </p>
            </motion.div>
          )}

          {/* Controls Guide */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12 text-gray-400 text-xs border-t border-gray-700 pt-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div>↑↓ NAVIGATE • ENTER LAUNCH</div>
              <div>1-5 QUICK CATEGORIES • 9 SHOW ALL</div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};