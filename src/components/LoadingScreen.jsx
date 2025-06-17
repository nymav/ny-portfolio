import { useEffect, useState } from "react";

const FINAL_MESSAGE = "INITIALIZING PORTFOLIO SYSTEM...";
const GLYPHS =
  "01101001011010010110110101101001011010010110110101101001ΔΣΦΛΩΨΞ⚡⚛◉◈⟁∇⊚⦿⧗⚒☍∑♦♠♣♥██▓▒░▄▀▐▌║═╬╔╗╚╝ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");

const BOOT_SEQUENCE = [
  "SYSTEM BOOT...",
  "LOADING NEURAL NETWORK...",
  "CHECKING QUANTUM PROCESSORS...",
  "INITIALIZING GRAPHICS ENGINE...",
  "CONNECTING TO MAINFRAME...",
  "DECRYPTING USER DATA...",
  "LAUNCHING PORTFOLIO MATRIX..."
];

export default function LoadingScreen({ onComplete }) {
  const [display, setDisplay] = useState(Array(FINAL_MESSAGE.length).fill(" "));
  const [visible, setVisible] = useState(true);
  const [bootStep, setBootStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [scanLine, setScanLine] = useState(0);
  const [glitchEffect, setGlitchEffect] = useState(false);
  const [showMatrix, setShowMatrix] = useState(true);

  // Matrix rain effect
  const [matrixColumns, setMatrixColumns] = useState([]);

  useEffect(() => {
    // Initialize matrix columns
    const columns = Array.from({ length: 20 }, (_, i) => ({
      chars: Array.from({ length: 15 }, () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)]),
      offset: Math.random() * 100,
      speed: 1 + Math.random() * 2 // Faster matrix
    }));
    setMatrixColumns(columns);

    // Matrix animation - faster
    const matrixInterval = setInterval(() => {
      setMatrixColumns(prev => 
        prev.map(col => ({
          ...col,
          chars: col.chars.map(() => GLYPHS[Math.floor(Math.random() * GLYPHS.length)]),
          offset: (col.offset + col.speed) % 120
        }))
      );
    }, 50); // Faster refresh

    return () => clearInterval(matrixInterval);
  }, []);

  // Scan line effect - faster
  useEffect(() => {
    const scanInterval = setInterval(() => {
      setScanLine(prev => (prev + 5) % 100); // Much faster scan
    }, 20);
    return () => clearInterval(scanInterval);
  }, []);

  // Glitch effect - more frequent
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchEffect(true);
      setTimeout(() => setGlitchEffect(false), 100);
    }, 800); // More frequent glitch
    return () => clearInterval(glitchInterval);
  }, []);

  // Boot sequence - much faster
  useEffect(() => {
    const bootInterval = setInterval(() => {
      setBootStep(prev => {
        if (prev < BOOT_SEQUENCE.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 300); // 5x faster boot sequence

    return () => clearInterval(bootInterval);
  }, []);

  // Progress bar - much faster
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev < 100) {
          return prev + 3; // 4x faster progress
        }
        return prev;
      });
    }, 40); // Faster updates

    return () => clearInterval(progressInterval);
  }, []);

  // Main text animation - much faster
  useEffect(() => {
    let frame = 0;
    const interval = setInterval(() => {
      setDisplay((prev) =>
        prev.map((char, i) => {
          if (frame >= i + 20) { // Much earlier start
            return FINAL_MESSAGE[i];
          }
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
      );
      frame++;

      if (frame > FINAL_MESSAGE.length + 30) { // Much shorter total time
        clearInterval(interval);
        setTimeout(() => {
          setShowMatrix(false);
          setTimeout(() => {
            setVisible(false);
            onComplete?.();
          }, 200); // Faster fade out
        }, 300); // Shorter final delay
      }
    }, 35); // Faster text animation

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-all duration-500 ease-in-out overflow-hidden
        ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
      `}
      style={{
        fontFamily: "'Courier New', monospace",
        background: "linear-gradient(45deg, #0f0f23 25%, #1a1a2e 25%, #1a1a2e 50%, #0f0f23 50%, #0f0f23 75%, #1a1a2e 75%)",
        backgroundSize: "40px 40px",
        animation: "moveBackground 5s linear infinite", // Faster background
      }}
    >
      {/* Matrix rain background */}
      {showMatrix && (
        <div className="absolute inset-0 overflow-hidden opacity-20">
          {matrixColumns.map((column, colIndex) => (
            <div
              key={colIndex}
              className="absolute text-green-400 text-xs font-mono"
              style={{
                left: `${colIndex * 5}%`,
                top: `${-column.offset}%`,
                transform: `translateY(${column.offset}%)`,
              }}
            >
              {column.chars.map((char, charIndex) => (
                <div
                  key={charIndex}
                  className="block leading-4"
                  style={{
                    opacity: Math.max(0, 1 - charIndex * 0.1),
                  }}
                >
                  {char}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Scan line effect */}
      <div 
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: `linear-gradient(0deg, transparent ${scanLine - 1}%, rgba(0, 255, 65, 0.15) ${scanLine}%, transparent ${scanLine + 1}%)`
        }}
      />

      {/* Retro grid overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-16 grid-rows-12 h-full w-full">
          {Array.from({ length: 192 }).map((_, i) => (
            <div key={i} className="border border-cyan-500/20"></div>
          ))}
        </div>
      </div>

      {/* Main container */}
      <div className="relative z-20 flex flex-col items-center space-y-6">
        {/* Boot sequence */}
        <div className="text-center space-y-2">
          <div className="text-green-400 text-sm font-bold pixel-text">
            🖥️ NIKHIL.EXE LOADING...
          </div>
          <div className="text-cyan-400 text-xs animate-pulse">
            {BOOT_SEQUENCE[bootStep]}
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-80 max-w-[90vw]">
          <div className="flex justify-between text-xs text-yellow-400 mb-2">
            <span>PROGRESS</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-none h-4 border-2 border-yellow-400">
            <div 
              className="bg-gradient-to-r from-yellow-400 to-orange-400 h-full transition-all duration-75 relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Main text display */}
        <div className="text-center space-y-4">
          <div className={`text-2xl sm:text-4xl md:text-5xl font-bold text-purple-400 pixel-text tracking-wider ${glitchEffect ? 'glitch' : ''}`}>
            {display.join("")}
          </div>
          
          {/* Blinking cursor */}
          <div className="text-2xl text-green-400 animate-pulse">█</div>
        </div>

        {/* System stats */}
        <div className="grid grid-cols-2 gap-4 text-xs text-green-400 font-mono">
          <div className="bg-black/60 border border-green-400 rounded p-3">
            <div className="text-green-400 font-bold">CPU</div>
            <div className="text-white">INTEL BRAIN v2.0</div>
          </div>
          <div className="bg-black/60 border border-blue-400 rounded p-3">
            <div className="text-blue-400 font-bold">RAM</div>
            <div className="text-white">UNLIMITED IDEAS</div>
          </div>
          <div className="bg-black/60 border border-purple-400 rounded p-3">
            <div className="text-purple-400 font-bold">GPU</div>
            <div className="text-white">CREATIVITY ENGINE</div>
          </div>
          <div className="bg-black/60 border border-yellow-400 rounded p-3">
            <div className="text-yellow-400 font-bold">STORAGE</div>
            <div className="text-white">∞ PROJECTS</div>
          </div>
        </div>

        {/* Loading indicators */}
        <div className="flex space-x-2">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"
              style={{
                animationDelay: `${i * 0.05}s`, // Faster sequence
                animationDuration: '0.5s' // Faster pulse
              }}
            />
          ))}
        </div>

        {/* Warning message */}
        <div className="text-xs text-red-400 animate-pulse text-center">
          ⚠️ WARNING: EPIC PORTFOLIO DETECTED ⚠️<br/>
          PREPARE FOR MIND-BLOWING EXPERIENCE
        </div>
      </div>

      <style jsx>{`
        @keyframes moveBackground {
          0% { background-position: 0 0; }
          100% { background-position: 80px 80px; }
        }
        
        .pixel-text {
          text-shadow: 
            2px 2px 0px #000,
            4px 4px 0px rgba(0,0,0,0.5),
            0 0 20px currentColor;
          letter-spacing: 3px;
        }
        
        .glitch {
          animation: glitch 0.2s ease-in-out;
        }
        
        @keyframes glitch {
          0% { transform: translateX(0); }
          10% { transform: translateX(-3px) scaleX(0.98); }
          20% { transform: translateX(3px) scaleX(1.02); }
          30% { transform: translateX(-2px) scaleX(0.99); }
          40% { transform: translateX(2px) scaleX(1.01); }
          50% { transform: translateX(-1px) scaleX(0.995); }
          60% { transform: translateX(1px) scaleX(1.005); }
          70% { transform: translateX(-3px) scaleX(0.98); }
          80% { transform: translateX(3px) scaleX(1.02); }
          90% { transform: translateX(-1px) scaleX(0.995); }
          100% { transform: translateX(0) scaleX(1); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}