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
      setScrollToId("top"); // scroll to top
    } else {
      setShowIntro(false);
      setTimeout(() => {
        const target = document.getElementById(id);
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
        {showIntro ? (
          <div className="w-full h-screen flex items-center justify-center">
            <Home handleNavClick={handleNavClick} />
          </div>
        ) : (
          <div className="flex h-screen">
            <aside
              className="w-[300px] min-w-[280px] p-6 border-r border-gray-700 overflow-y-auto sticky top-0 h-screen text-white"
              style={{
                background: "radial-gradient(circle at top, #1a002f 0%, #000000 100%)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundAttachment: "fixed",
              }}
            >
              <Home handleNavClick={handleNavClick} isCollapsed />
            </aside>

            <main className="flex-1 overflow-y-auto">
              <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
              <CursorSpotlight />

              <div className="space-y-6 px-4 pt-8 pb-12">

                <section id="projects"><Projects /></section>
                <section id="certifications"><Certifications /></section>
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
