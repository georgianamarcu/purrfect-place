import { Canvas } from "@react-three/fiber";
import Environment from "./Environment";
import Effects from "./Effects";
import Controls from "./Controls";
import Room from "./room";
import { Cat } from "./Cat";
import { type BVHEcctrlApi } from "bvhecctrl";
import { useRef } from "react";
import { KeyboardControls } from "@react-three/drei";
import LoadingScreen from "./LoadingScreen";

function App() {
  const ecctrlRef = useRef<BVHEcctrlApi | null>(null);

  const keyboardMap = [
    { name: "forward", keys: ["ArrowUp", "KeyW", "KeyZ"] },
    { name: "backward", keys: ["ArrowDown", "KeyS"] },
    { name: "leftward", keys: ["ArrowLeft", "KeyA", "KeyQ"] },
    { name: "rightward", keys: ["ArrowRight", "KeyD"] },
    { name: "jump", keys: ["Space"] },
    { name: "nap", keys: ["Enter"] },
  ];

  const resetCatPosition = () => {
    if (ecctrlRef.current?.group) {
      ecctrlRef.current.group.position.set(0, 0, 0);
    }
  };

  return (
    <>
      <LoadingScreen />
      <button
        onClick={resetCatPosition}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          zIndex: 1000,
          padding: "10px 20px",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          border: "2px solid #333",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "600",
          fontSize: "14px",
          color: "#333",
          transition: "all 0.2s ease",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 1)";
          e.currentTarget.style.transform = "scale(1.05)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        🐾 Reset Cat
      </button>
      <Canvas
        shadows
        camera={{
          fov: 45,
          near: 0.1,
          far: 1000,
        }}
      >
        <Environment />
        <Controls ecctrlRef={ecctrlRef} />
        <Room />
        <KeyboardControls map={keyboardMap}>
          <Cat ecctrlRef={ecctrlRef} />
        </KeyboardControls>
        <Effects />
      </Canvas>
    </>
  );
}

export default App;
