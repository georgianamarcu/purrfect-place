import { useEffect, useRef } from "react";
import { useGLTF, useAnimations, KeyboardControls } from "@react-three/drei";
import { Group, SkinnedMesh, Bone, Material, AnimationClip } from "three";
import BVHEcctrl, { type BVHEcctrlApi } from "bvhecctrl";

type CatGLTFResult = {
  nodes: {
    Cat: SkinnedMesh;
    root: Bone;
  };
  materials: {
    Mat_Gradient: Material;
  };
  animations: AnimationClip[];
};

export function Cat({
  ecctrlRef,
}: {
  ecctrlRef: React.RefObject<BVHEcctrlApi | null>;
}) {
  const group = useRef<Group>(null);
  const { nodes, materials, animations } = useGLTF(
    "/cat.glb"
  ) as unknown as CatGLTFResult;
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    Object.keys(actions).forEach((actionName) => {
      console.log(actionName);
    });
  }, [actions]);

  const keyboardMap = [
    { name: "forward", keys: ["ArrowUp", "KeyW", "KeyZ"] },
    { name: "backward", keys: ["ArrowDown", "KeyS", "KeyS"] },
    { name: "leftward", keys: ["ArrowLeft", "KeyA", "KeyQ"] },
    { name: "rightward", keys: ["ArrowRight", "KeyD"] },
    { name: "jump", keys: ["Space"] },
    { name: "lay", keys: ["Enter"] },
  ];

  return (
    <KeyboardControls map={keyboardMap}>
      <BVHEcctrl
        ref={ecctrlRef}
        colliderCapsuleArgs={[0.2, 0.01, 6, 7]}
        turnSpeed={2}
        maxWalkSpeed={1}
        jumpVel={4}
        floatHeight={0}
      >
        <group ref={group} dispose={null} scale={0.8} position={[0, -0.2, 0]}>
          <group name="Scene">
            <group name="Rig" scale={0.1}>
              <skinnedMesh
                name="Cat"
                geometry={nodes.Cat.geometry}
                material={materials.Mat_Gradient}
                skeleton={nodes.Cat.skeleton}
              />
              <primitive object={nodes.root} />
            </group>
          </group>
        </group>
      </BVHEcctrl>
    </KeyboardControls>
  );
}

useGLTF.preload("/cat.glb");
