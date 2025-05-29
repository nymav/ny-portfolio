import { useState, useEffect } from "react";
import "./index.css";
import { LoadingScreen } from "./components/LoadingScreen";
import { MobileMenu } from "./components/MobileMenu";
import { Home } from "./components/sections/Home";
import { About } from "./components/sections/About";
import { Projects } from "./components/sections/Projects";
import { Certifications } from "./components/sections/Certifications";
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
        className={`w-full min-h-screen bg-black text-white font-sans transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ scrollBehavior: "smooth" }}
      >
        {/* Mobile Top Nav */}
        {!showIntro && (
          <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-black/90 text-white flex items-center justify-between px-4 py-3 shadow">
            <h1 className="text-lg font-bold">Nikhil Yarra</h1>
            <button onClick={() => setMenuOpen(true)} className="text-2xl" aria-label="Open Menu">
              ☰
            </button>
          </header>
        )}

        {showIntro ? (
          <div className="w-full h-screen flex items-center justify-center">
            <Home handleNavClick={handleNavClick} />
          </div>
        ) : (
          <div className="flex flex-col md:flex-row min-h-screen">
            {/* Desktop Sidebar */}
            <aside
              className="hidden md:flex w-[300px] min-w-[280px] p-6 border-r border-gray-700 overflow-y-auto sticky top-0 h-screen text-white"
              style={{
                background: "radial-gradient(circle at top, #1a002f 0%, #000000 100%)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundAttachment: "fixed",
              }}
            >
              <Home handleNavClick={handleNavClick} isCollapsed />
            </aside>

            <main className="flex-1 overflow-y-auto pt-[60px] md:pt-0">
              {/* Mobile Nav Overlay */}
              <MobileMenu
  menuOpen={menuOpen}
  setMenuOpen={setMenuOpen}
  handleNavClick={handleNavClick}
/>
              <CursorSpotlight />

              <div className="space-y-6 px-4 pt-8 pb-12">
                <div id="projects-anchor" className="h-1"></div>
                <section id="projects"><Projects /></section>

                <div id="certifications-anchor" className="h-1"></div>
                <section id="certifications"><Certifications /></section>

                <div id="about-anchor" className="h-1"></div>
                <section id="about"><About /></section>
              </div>
            </main>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
