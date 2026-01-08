import { useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { Group, SkinnedMesh, Bone, Material, AnimationClip } from "three";

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

export function Cat() {
  const group = useRef<Group>(null);
  const { nodes, materials, animations } = useGLTF(
    "/cat.glb"
  ) as unknown as CatGLTFResult;
  const { actions } = useAnimations(animations, group);

  return (
    <group ref={group} dispose={null} scale={0.5}>
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
  );
}

useGLTF.preload("/cat.glb");
