import { useState, useEffect } from "react";
import "./index.css";
import { motion, useScroll, useTransform } from "framer-motion";

import { LoadingScreen } from "./components/LoadingScreen";
import { Navbar } from "./components/Navbar";
import { MobileMenu } from "./components/MobileMenu";
import { Home } from "./components/sections/Home";
import { About } from "./components/sections/About";
import { Projects } from "./components/sections/Projects";
import { Certifications } from "./components/sections/Certifications";
import { SocialBar } from "./components/sections/SocialBar";
import { CursorSpotlight } from "./components/sections/CursorSpotlight";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);

  const { scrollYProgress } = useScroll();
  const scrollProgress = useTransform(scrollYProgress, (value) =>
    Math.round(value * 100)
  );

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}

      <div
        className={`w-full min-h-screen transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        } bg-black text-white font-sans relative overflow-hidden`}
      >
        {/* Navigation */}
        <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

        {/* Floating UI */}
        <SocialBar />
        <CursorSpotlight />

        {/* Sections */}
        <section className="min-h-screen flex items-center justify-center bg-black px-6 py-12">
          <div className="max-w-6xl w-full">
            <Home />
          </div>
        </section>

        <section className="min-h-screen flex items-center justify-center bg-black px-6 py-12">
          <div className="max-w-6xl w-full">
            <Projects />
          </div>
        </section>

        <section className="min-h-screen flex items-center justify-center bg-black px-6 py-12">
          <div className="max-w-6xl w-full">
            <Certifications />
          </div>
        </section>

        <section className="min-h-screen flex items-center justify-center bg-black px-6 py-12">
          <div className="max-w-6xl w-full">
            <About />
          </div>
        </section>
      </div>
    </>
  );
}

export default App;
