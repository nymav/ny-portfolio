import { useEffect, useState } from "react";

const FINAL_MESSAGE = "WELCOME, HUMAN.";
const GLYPHS =
  "𓂀ΔΣΦΛΩΨΞʘ◉◈⟁∇⊚⦿⚛⫷⫸⧗⚒☍∑𐎐𒀱⚿≡☯ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");

export const LoadingScreen = ({ onComplete }) => {
  const [display, setDisplay] = useState(Array(FINAL_MESSAGE.length).fill(" "));
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let frame = 0;
    const interval = setInterval(() => {
      setDisplay((prev) =>
        prev.map((char, i) => {
          if (frame >= i * 2) {
            return FINAL_MESSAGE[i];
          }
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
      );
      frame++;

      if (frame > FINAL_MESSAGE.length * 2.5 + 1) {
        clearInterval(interval);
        setTimeout(() => {
          setVisible(false);
          onComplete();
        }, 0);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-700 ease-in-out 
        ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
        bg-black text-purple-400 font-mono text-xl sm:text-2xl tracking-widest`}
      style={{ fontFamily: "'Space Grotesk', monospace" }}
    >
      {display.join("")}
    </div>
  );
};
