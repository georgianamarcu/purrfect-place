import { useGLTF } from "@react-three/drei";
import { useLayoutEffect, useMemo } from "react";
import { useControls } from "leva";
import {
  Mesh,
  MeshToonMaterial,
  DataTexture,
  NearestFilter,
  RedFormat,
} from "three";

const Room = () => {
  const { scene } = useGLTF("/room.glb");

  const toonGradient = useMemo(() => {
    const colors = new Uint8Array([0, 80, 160, 255]);
    const format = RedFormat;
    const tex = new DataTexture(colors, colors.length, 1, format);

    tex.magFilter = NearestFilter;
    tex.minFilter = NearestFilter;
    tex.generateMipmaps = false;
    tex.needsUpdate = true;
    return tex;
  }, []);

  const colors = useControls({
    secondary: { value: "#2d3a6d", label: "Walls/Ceiling" },
    main: { value: "#8e6da8", label: "Wall Objects" },
    dark_green: { value: "#224a54", label: "Dark Green" },
    yellow: { value: "#f7bcff", label: "Yellow" },
    purple: { value: "#5a4d8f", label: "Purple" },
    pencil: { value: "#c9c9ca", label: "Pencil" },
  });

  useLayoutEffect(() => {
    scene.traverse((child) => {
      if (child instanceof Mesh) {
        const matName = child.material.name;

        if (!(child.material instanceof MeshToonMaterial)) {
          child.material = new MeshToonMaterial();
        }
        const hex = colors[matName as keyof typeof colors];
        if (hex) {
          child.material.color.set(hex.slice(0, 7));
          child.material.gradientMap = toonGradient;
          child.material.needsUpdate = true;
        }
      }
    });
  }, [colors, scene, toonGradient]);

  return (
    <group>
      <primitive object={scene} />
    </group>
  );
};

export default Room;
