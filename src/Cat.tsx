import { useRef, useEffect } from "react";
import { useGLTF, useAnimations, useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import {
  Group,
  SkinnedMesh,
  Bone,
  Material,
  AnimationClip,
  LoopOnce,
} from "three";
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
  const [, get] = useKeyboardControls();
  const napConfigured = useRef(false);
  const napKeyPressed = useRef(false);
  const napPlayed = useRef(false);

  useEffect(() => {
    if (actions.nap && !napConfigured.current) {
      const napAction = actions.nap;
      napAction.setLoop(LoopOnce, 1);
      // eslint-disable-next-line
      napAction.clampWhenFinished = true;
      napConfigured.current = true;
    }
  }, [actions]);

  useFrame(() => {
    const { forward, backward, leftward, rightward, jump, nap } = get();
    const isMoving = forward || backward || leftward || rightward;
    const isMovingOrJumping = isMoving || jump;

    if (!nap && napKeyPressed.current) {
      napKeyPressed.current = false;
      napPlayed.current = false;
    }

    // Reset nap animation if movement or jump keys are pressed
    if (isMovingOrJumping && actions.nap) {
      if (actions.nap.isRunning()) {
        actions.nap.stop();
      }
      actions.nap.reset();
      napPlayed.current = false;
      napKeyPressed.current = false;
    }

    if ((isMoving || nap) && actions.move) {
      if (!actions.move.isRunning()) {
        actions.move.reset();
        actions.move.play();
      }
    } else if (actions.move?.isRunning()) {
      actions.move.stop();
    }

    if (jump && actions.jump) {
      if (!actions.jump.isRunning()) {
        actions.jump.reset();
        actions.jump.play();
      }
    } else if (actions.jump?.isRunning()) {
      actions.jump.stop();
    }

    if (nap && actions.nap && !isMovingOrJumping) {
      if (!napKeyPressed.current && !napPlayed.current) {
        napKeyPressed.current = true;
        napPlayed.current = true;
        actions.nap.reset();
        actions.nap.play();
      }
    }
  });

  return (
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
  );
}

useGLTF.preload("/cat.glb");
