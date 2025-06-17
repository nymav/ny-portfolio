import { useState, useEffect } from "react";
import "./index.css";
import LoadingScreen  from "./components/LoadingScreen";
import { MobileMenu } from "./components/MobileMenu";
import { Home } from "./components/sections/Home";
import { About } from "./components/sections/About";
import { Projects } from "./components/sections/Projects";
import  Certifications  from "./components/sections/Certifications";
import { CursorSpotlight } from "./components/sections/CursorSpotlight";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [scrollToId, setScrollToId] = useState(null);

  const handleNavClick = (id) => {
    if (id === "home") {
      setShowIntro(true);
      setScrollToId("top");
    } else {
      setShowIntro(false);
      setTimeout(() => {
        const target = document.getElementById(`${id}-anchor`);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    }
  };

  useEffect(() => {
    if (scrollToId === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setScrollToId(null);
    }
  }, [scrollToId]);

  return (
    <>
      {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}
  
      <div
        className={`w-full min-h-screen text-white font-mono transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{
          scrollBehavior: "smooth",
          fontFamily: "'Courier New', monospace",
          background: "linear-gradient(45deg, #0f0f23 25%, #1a1a2e 25%, #1a1a2e 50%, #0f0f23 50%, #0f0f23 75%, #1a1a2e 75%)",
          backgroundSize: "20px 20px",
          backgroundAttachment: "fixed",
          backgroundRepeat: "repeat",
          animation: "moveBackground 20s linear infinite",
        }}
      >
        {/* Retro grid overlay */}
        <div className="fixed inset-0 opacity-10 pointer-events-none z-0">
          <div className="grid grid-cols-12 grid-rows-12 h-full w-full">
            {Array.from({ length: 144 }).map((_, i) => (
              <div key={i} className="border border-cyan-500/30"></div>
            ))}
          </div>
        </div>
  
        {/* Floating digital particles */}
        <div className="fixed inset-0 pointer-events-none z-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-green-400 rounded-full opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
  
        {/* Mobile Header */}
        {!showIntro && (
          <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-black/90 text-green-400 flex items-center justify-between px-4 py-3 shadow-lg border-b border-green-400/30">
            <h1 className="text-lg font-bold pixel-text">NIKHIL.EXE</h1>
            <button 
              onClick={() => setMenuOpen(true)} 
              className="text-2xl text-yellow-400 hover:text-yellow-300 transition-colors" 
              aria-label="Open Menu"
            >
              ⚡
            </button>
          </header>
        )}
  
        {/* Home Fullscreen Intro */}
        {showIntro ? (
          <div className="w-full h-screen flex items-center justify-center overflow-hidden relative z-10">
            <Home handleNavClick={handleNavClick} />
          </div>
        ) : (
          <div className="flex flex-col md:flex-row min-h-screen overflow-hidden relative z-10">
            {/* Sidebar */}
            <aside
              className="hidden md:flex w-[300px] min-w-[280px] h-screen sticky top-0 overflow-y-auto border-r border-green-400/30"
              style={{
                background: "rgba(15, 15, 35, 0.9)",
                backdropFilter: "blur(10px)",
              }}
            >
              <Home handleNavClick={handleNavClick} isCollapsed />
            </aside>
  
            {/* Scrollable Main Content */}
            <main className="flex-1 overflow-y-auto h-screen relative">
              {/* Scanline effect */}
              <div className="fixed inset-0 pointer-events-none z-10 opacity-10">
                <div className="w-full h-full bg-gradient-to-b from-transparent via-green-400/20 to-transparent animate-pulse"></div>
              </div>
  
              <MobileMenu
                menuOpen={menuOpen}
                setMenuOpen={setMenuOpen}
                handleNavClick={handleNavClick}
              />
  
              <CursorSpotlight />
  
              <div className="space-y-6 px-4 pt-8 pb-12 relative z-20">
                {/* Section Headers with Retro Style */}
                <div id="projects-anchor" className="h-1"></div>
                <section id="projects">
                  <div className="mb-6 text-center">
                    <h2 className="text-3xl font-bold text-green-400 pixel-text mb-2">
                      🎮 PROJECTS.EXE
                    </h2>
                    <div className="w-32 h-1 bg-gradient-to-r from-green-400 to-cyan-400 mx-auto rounded"></div>
                  </div>
                  <Projects />
                </section>
  
                <div id="certifications-anchor" className="h-1"></div>
                <section id="certifications">
                  <div className="mb-6 text-center">
                    <h2 className="text-3xl font-bold text-yellow-400 pixel-text mb-2">
                      🏆 ACHIEVEMENTS.EXE
                    </h2>
                    <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto rounded"></div>
                  </div>
                  <Certifications />
                </section>
  
                <div id="about-anchor" className="h-1"></div>
                <section id="about">
                  <div className="mb-6 text-center">
                    <h2 className="text-3xl font-bold text-cyan-400 pixel-text mb-2">
                      👤 PLAYER_INFO.EXE
                    </h2>
                    <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 mx-auto rounded"></div>
                  </div>
                  <About />
                </section>
              </div>
            </main>
          </div>
        )}
  
        {/* CSS Animations */}
        <style jsx>{`
          @keyframes moveBackground {
            0% { background-position: 0 0; }
            100% { background-position: 40px 40px; }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
          }
          
          .pixel-text {
            text-shadow: 
              2px 2px 0px #000,
              4px 4px 0px rgba(0,0,0,0.5);
            letter-spacing: 2px;
          }
          
          /* Retro glow effect */
          section {
            border-radius: 8px;
            background: rgba(0, 0, 0, 0.3);
            border: 1px solid rgba(0, 255, 65, 0.2);
            backdrop-filter: blur(5px);
            box-shadow: 
              0 0 20px rgba(0, 255, 65, 0.1),
              inset 0 0 20px rgba(0, 255, 65, 0.05);
          }
          
          /* Scrollbar styling */
          ::-webkit-scrollbar {
            width: 8px;
          }
          
          ::-webkit-scrollbar-track {
            background: rgba(15, 15, 35, 0.5);
          }
          
          ::-webkit-scrollbar-thumb {
            background: linear-gradient(45deg, #00ff41, #00ccff);
            border-radius: 4px;
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(45deg, #00ccff, #00ff41);
          }
        `}</style>
      </div>
    </>
  );
}

export default App;
