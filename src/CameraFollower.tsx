import React, { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import { type BVHEcctrlApi } from "bvhecctrl";

interface CameraFollowerProps {
  controlRef: React.RefObject<BVHEcctrlApi | null>;
  enabled: boolean;
}

const CameraFollower: React.FC<CameraFollowerProps> = ({
  controlRef,
  enabled,
}) => {
  const { camera } = useThree();
  const targetPosition = useRef(new Vector3());
  const targetLookAt = useRef(new Vector3());

  useFrame(() => {
    if (!enabled || !controlRef.current || !controlRef.current.group) return;

    const catPosition = controlRef.current.group.position;

    // Camera offset: behind and above the cat
    const offset = new Vector3(0, 2.5, 4);
    targetPosition.current.copy(catPosition).add(offset);

    // Look at point slightly above cat for better view
    targetLookAt.current.copy(catPosition).add(new Vector3(0, 1, 0));

    // Smooth camera movement
    camera.position.lerp(targetPosition.current, 0.08);
    camera.lookAt(targetLookAt.current);
  });

  return null;
};

export default CameraFollower;
