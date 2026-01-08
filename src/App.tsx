import { Canvas } from "@react-three/fiber";
import Environment from "./Environment";
import Effects from "./Effects";
import Controls from "./Controls";
import Room from "./room";
import { Cat } from "./Cat";
import { type BVHEcctrlApi } from "bvhecctrl";
import { useRef } from "react";

function App() {
  const ecctrlRef = useRef<BVHEcctrlApi | null>(null);
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
      <Cat ecctrlRef={ecctrlRef} />
      <Effects />
    </Canvas>
  );
}

export default App;
