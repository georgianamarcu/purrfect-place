import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useProgress } from "@react-three/drei";

const iconsSet = [
  { left: "/items/keyboard_arrow_left_outline.png" },
  { right: "/items/keyboard_arrow_right_outline.png" },
  { up: "/items/keyboard_arrow_up_outline.png" },
  { down: "/items/keyboard_arrow_down_outline.png" },
  { space: "/items/keyboard_space_outline.png" },
  { enter: "/items/keyboard_enter_outline.png" },
];

const LoadingScreen = ({ onComplete }: { onComplete?: () => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const { progress } = useProgress();

  useEffect(() => {
    if (progress === 100 && !isReady) {
      const timer = setTimeout(() => {
        setIsReady(true);
        setShowButton(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [progress, isReady]);

  const handleEnterGame = () => {
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          if (onComplete) onComplete();
        },
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-screen flex flex-col items-center justify-center overflow-hidden z-50"
      style={{
        fontFamily: '"Cherry Bomb One", system-ui',
        background:
          "linear-gradient(to bottom, #2563eb 0%, #6366f1 50%, #9333ea 100%)",
      }}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-12 left-8 w-24 h-24 bg-yellow-400 rounded-full opacity-10 blur-3xl" />
        <div className="absolute bottom-20 right-12 w-32 h-32 bg-pink-400 rounded-full opacity-10 blur-3xl" />
      </div>

      {/* Content container - Column layout with gaps */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-8">
        {/* Title */}
        <h1 className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-linear-to-r from-[#FF6B9D] via-[#FF8C42] to-[#FFD93D] drop-shadow-lg">
          Purrfect place
        </h1>

        {/* Description */}
        <p className="text-xl md:text-2xl text-[#FFD93D] font-medium drop-shadow-sm">
          Help the cat find a cozy place to take a well-deserved nap.
        </p>

        {/* Controls Section */}
        <div className="bg-[#0f3460]/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-4 border-[#FF6B9D] w-full max-w-xl">
          <p className="text-sm md:text-base text-[#FFD93D] font-bold mb-6 uppercase tracking-wide text-center">
            Controls
          </p>

          <div className="space-y-4">
            {/* Movement Controls - Up and Down */}
            <div className="flex items-center justify-center gap-8">
              <div className="flex flex-col items-center">
                <img
                  src={iconsSet[2].up}
                  alt="up"
                  className="w-12 h-12 md:w-14 md:h-14 drop-shadow-lg"
                />
                <img
                  src={iconsSet[3].down}
                  alt="down"
                  className="w-12 h-12 md:w-14 md:h-14 drop-shadow-lg mt-1"
                />
                <span className="text-xs md:text-sm text-[#FFD93D] mt-2 font-semibold">
                  Move
                </span>
              </div>
              <div className="flex gap-2">
                <img
                  src={iconsSet[0].left}
                  alt="left"
                  className="w-12 h-12 md:w-14 md:h-14 drop-shadow-lg"
                />
                <img
                  src={iconsSet[1].right}
                  alt="right"
                  className="w-12 h-12 md:w-14 md:h-14 drop-shadow-lg"
                />
              </div>
            </div>

            {/* Action Controls */}
            <div className="flex items-center justify-center gap-12">
              <div className="flex flex-col items-center">
                <img
                  src={iconsSet[4].space}
                  alt="space"
                  className="w-16 h-12 md:w-20 md:h-14 drop-shadow-lg"
                />
                <span className="text-xs md:text-sm text-[#FF6B9D] mt-2 font-bold">
                  Jump
                </span>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src={iconsSet[5].enter}
                  alt="enter"
                  className="w-14 h-12 md:w-16 md:h-14 drop-shadow-lg"
                />
                <span className="text-xs md:text-sm text-[#FF8C42] mt-2 font-bold">
                  Nap
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Loading indicator or Play button */}
        {!showButton ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-3 h-3 bg-[#FF6B9D] rounded-full animate-bounce" />
            <div
              className="w-3 h-3 bg-[#FF8C42] rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            />
            <div
              className="w-3 h-3 bg-[#FFD93D] rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            />
            <span className="text-[#FFD93D] font-semibold ml-3 text-lg">
              Loading...
            </span>
          </div>
        ) : (
          <button
            onClick={handleEnterGame}
            className="w-[250px] h-[50px] px-12 py-4 bg-linear-to-r from-[#FF6B9D] via-[#FF8C42] to-[#FFD93D] text-[#1a1a2e] font-bold text-xl rounded-full shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 hover:scale-110 active:scale-95 border-4 border-white/30"
          >
            Enter the Game
          </button>
        )}
      </div>
    </div>
  );
};

export default LoadingScreen;
