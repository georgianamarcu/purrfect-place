import { CameraControls } from "@react-three/drei";
import { useRef } from "react";
import { useEcctrlStore, type BVHEcctrlApi, type StoreState } from "bvhecctrl";
import { useFrame } from "@react-three/fiber";

const Controls = ({
  ecctrlRef,
}: {
  ecctrlRef: React.RefObject<BVHEcctrlApi | null>;
}) => {
  const camControlRef = useRef<CameraControls | null>(null);
  const colliderMeshesArray = useEcctrlStore(
    (state: StoreState) => state.colliderMeshesArray
  );

  useFrame(() => {
    if (ecctrlRef.current?.group && camControlRef.current) {
      const catPos = ecctrlRef.current.group.position;
      camControlRef.current.moveTo(catPos.x, catPos.y + 0.6, catPos.z, true);
    }
  });

  return (
    <CameraControls
      ref={camControlRef}
      colliderMeshes={colliderMeshesArray}
      smoothTime={0.1}
      makeDefault
      minPolarAngle={0}
      maxPolarAngle={Math.PI / 2}
      maxDistance={10}
      minDistance={2}
    />
  );
};

export default Controls;
