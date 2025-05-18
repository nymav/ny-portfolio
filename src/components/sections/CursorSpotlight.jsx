import { useEffect, useState } from "react";

export const CursorSpotlight = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      className="pointer-events-none fixed top-0 left-0 w-full h-full z-50"
      style={{
        background: `radial-gradient(circle at ${position.x}px ${position.y}px, rgba(255, 0, 255, 0.06), transparent 120px)`,
      }}
    />
  );
};