import { Canvas } from "@react-three/fiber";
import Environment from "./Environment";
import Effects from "./Effects";
import Controls from "./Controls";
import Room from "./room";

function App() {
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
      <Controls />
      <Room />
      <Effects />
    </Canvas>
  );
}

export default App;
