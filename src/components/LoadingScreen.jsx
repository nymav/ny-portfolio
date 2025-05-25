import { useEffect, useState } from "react";

const FINAL_MESSAGE = "WELCOME, HUMAN.";
const GLYPHS = "𓂀ΔΣΦΛΩΨΞʘ◉◈⟁∇⊚⦿⚛⫷⫸⧗⚒☍∑𐎐𒀱⚿≡☯ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");

export const LoadingScreen = ({ onComplete }) => {
  const [display, setDisplay] = useState(Array(FINAL_MESSAGE.length).fill(" "));
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let frame = 0;
    const interval = setInterval(() => {
      setDisplay((prev) =>
        prev.map((char, i) => {
          if (frame >= i * 2) {
            return FINAL_MESSAGE[i]; // lock in final letter
          }
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
      );
      frame++;

      if (frame > FINAL_MESSAGE.length * 4 + 10) {
        clearInterval(interval);
        setTimeout(() => {
          setVisible(false);
          onComplete();
        }, 1000);
      }
    }, 100); // frame speed

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-700 ease-in-out 
        ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
        bg-black text-[#00ffcc] font-mono text-xl sm:text-2xl tracking-widest`}
    >
      {display.join("")}
    </div>
  );
};
