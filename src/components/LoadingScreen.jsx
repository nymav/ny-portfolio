import { useEffect, useState } from "react";

export const LoadingScreen = ({ onComplete }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(false);
      onComplete();
    }, 500); // slightly quicker
    return () => clearTimeout(timeout);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-all duration-500 ease-in-out 
        ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
        bg-gradient-to-br from-[#f5f7fa] via-[#c3cfe2] to-[#d1d8e0] text-[#1a1a1a]`}
    >
      <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-6">
        Booting up...
      </h1>

      {/* Spinner */}
      <div className="w-10 h-10 border-4 border-gray-400 border-t-transparent rounded-full animate-spin" />
    </div>
  );
};