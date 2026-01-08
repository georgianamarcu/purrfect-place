import { CameraControls } from "@react-three/drei";
import { type RefCallback, useCallback } from "react";

const initialCameraPosition = [
  1.8153088655068363, 0.2666952878156663, 1.6757173667993213,
];

const Controls = () => {
  const ControlsHandler: RefCallback<CameraControls> = useCallback(
    (controls) => {
      controls?.setPosition(
        initialCameraPosition[0],
        initialCameraPosition[1],
        initialCameraPosition[2],
        false
      );
    },
    []
  );
  return (
    <CameraControls
      makeDefault
      ref={ControlsHandler}
      minPolarAngle={0}
      maxPolarAngle={Math.PI / 2}
      maxDistance={10}
      minDistance={2}
    />
  );
};

export default Controls;
