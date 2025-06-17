import { useEffect, useRef, useState } from "react";

export const CursorSpotlight = () => {
  const spotlightRef = useRef(null);
  const [glitchActive, setGlitchActive] = useState(false);
  const [scanlineOffset, setScanlineOffset] = useState(0);

  useEffect(() => {
    const spotlight = spotlightRef.current;

    let requestId = null;
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    // Smooth cursor following with slight delay for retro feel
    const updateSpotlight = () => {
      if (spotlight) {
        // Smooth interpolation for retro cursor lag effect
        targetX += (mouseX - targetX) * 0.15;
        targetY += (mouseY - targetY) * 0.15;

        // Create retro gaming spotlight with multiple layers
        const baseGlow = `radial-gradient(circle at ${targetX}px ${targetY}px, 
          rgba(0, 255, 65, 0.15) 0%, 
          rgba(0, 255, 255, 0.08) 40%, 
          rgba(255, 255, 0, 0.04) 80%, 
          transparent 120px)`;

        const scanlineEffect = glitchActive 
          ? `, repeating-linear-gradient(0deg, 
              transparent ${scanlineOffset}px, 
              rgba(0, 255, 65, 0.03) ${scanlineOffset + 1}px, 
              transparent ${scanlineOffset + 2}px)`
          : '';

        const glitchOverlay = glitchActive 
          ? `, radial-gradient(circle at ${targetX + Math.sin(Date.now() * 0.01) * 5}px ${targetY + Math.cos(Date.now() * 0.01) * 5}px, 
              rgba(255, 0, 0, 0.08) 0%, 
              transparent 60px)`
          : '';

        spotlight.style.background = baseGlow + scanlineEffect + glitchOverlay;
        
        // Update scanline animation
        setScanlineOffset(prev => (prev + 0.5) % 4);
      }
      requestId = requestAnimationFrame(updateSpotlight);
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    // Random glitch effect
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 4000);

    window.addEventListener("mousemove", handleMouseMove);
    requestId = requestAnimationFrame(updateSpotlight);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(requestId);
      clearInterval(glitchInterval);
    };
  }, [glitchActive, scanlineOffset]);

  return (
    <>
      {/* Main spotlight */}
      <div
        ref={spotlightRef}
        className="pointer-events-none fixed top-0 left-0 w-full h-full z-50"
      />
      
      {/* Retro grid overlay that follows cursor */}
      <div 
        className="pointer-events-none fixed top-0 left-0 w-full h-full z-40 opacity-20"
        style={{
          background: `
            linear-gradient(90deg, transparent 0%, transparent 49.5%, rgba(0, 255, 65, 0.1) 50%, transparent 50.5%, transparent 100%),
            linear-gradient(0deg, transparent 0%, transparent 49.5%, rgba(0, 255, 65, 0.1) 50%, transparent 50.5%, transparent 100%)
          `,
          backgroundSize: '20px 20px',
          animation: 'gridPulse 3s ease-in-out infinite alternate'
        }}
      />

      {/* Retro scan lines */}
      <div 
        className="pointer-events-none fixed top-0 left-0 w-full h-full z-30 opacity-30"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 255, 65, 0.02) 2px,
            rgba(0, 255, 65, 0.02) 4px
          )`,
          animation: 'scanlines 0.1s linear infinite'
        }}
      />

      {/* Glitch effect overlay */}
      {glitchActive && (
        <div 
          className="pointer-events-none fixed top-0 left-0 w-full h-full z-45"
          style={{
            background: `
              repeating-linear-gradient(
                90deg,
                transparent,
                transparent 2px,
                rgba(255, 0, 0, 0.05) 2px,
                rgba(255, 0, 0, 0.05) 4px,
                transparent 4px,
                transparent 6px,
                rgba(0, 255, 255, 0.05) 6px,
                rgba(0, 255, 255, 0.05) 8px
              )
            `,
            animation: 'glitchShift 0.1s linear infinite'
          }}
        />
      )}

      <style jsx>{`
        @keyframes gridPulse {
          0% { opacity: 0.1; }
          100% { opacity: 0.3; }
        }

        @keyframes scanlines {
          0% { transform: translateY(0); }
          100% { transform: translateY(4px); }
        }

        @keyframes glitchShift {
          0% { transform: translateX(0); }
          25% { transform: translateX(-2px); }
          50% { transform: translateX(2px); }
          75% { transform: translateX(-1px); }
          100% { transform: translateX(1px); }
        }
      `}</style>
    </>
  );
};