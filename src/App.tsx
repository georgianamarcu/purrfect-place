import { Canvas } from "@react-three/fiber";
import Environment from "./Environment";
import Effects from "./Effects";
import Controls from "./Controls";
import Room from "./room";
import { Cat } from "./Cat";
import { type BVHEcctrlApi } from "bvhecctrl";
import { useRef } from "react";
import { KeyboardControls } from "@react-three/drei";

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

  return (
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
  );
}

export default App;
