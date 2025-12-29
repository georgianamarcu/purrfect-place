import { Canvas } from "@react-three/fiber";
import { CameraControls, Center } from "@react-three/drei";
import Room from "./room/index";
import Environment from "./Environment";
import Effects from "./Effects";

function App() {
  return (
    <Canvas shadows>
      <Center>
        <Room />
      </Center>
      <Environment />
      <Effects />
      <CameraControls makeDefault />
    </Canvas>
  );
}

export default App;
