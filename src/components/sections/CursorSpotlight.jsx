import { useEffect, useRef } from "react";

export const CursorSpotlight = () => {
  const spotlightRef = useRef(null);

  useEffect(() => {
    const spotlight = spotlightRef.current;

    let requestId = null;
    let mouseX = 0;
    let mouseY = 0;

    const updateSpotlight = () => {
      if (spotlight) {
        spotlight.style.background = `radial-gradient(circle at ${mouseX}px ${mouseY}px, rgba(255, 0, 255, 0.06), transparent 120px)`;
      }
      requestId = requestAnimationFrame(updateSpotlight);
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    requestId = requestAnimationFrame(updateSpotlight);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(requestId);
    };
  }, []);

  return (
    <div
      ref={spotlightRef}
      className="pointer-events-none fixed top-0 left-0 w-full h-full z-50"
    />
  );
};
