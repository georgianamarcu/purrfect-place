import { useGLTF } from "@react-three/drei";
import { useLayoutEffect, useMemo } from "react";
import { useControls } from "leva";
import {
  Mesh,
  Material,
  MeshStandardMaterial,
  MeshBasicMaterial,
  MeshPhongMaterial,
  MeshLambertMaterial,
} from "three";

const Room = () => {
  const { scene } = useGLTF("/room.glb");

  // Find materials by name
  const materials = useMemo(() => {
    const materialMap = new Map<string, Material>();
    scene.traverse((child) => {
      if (child instanceof Mesh && child.material) {
        const material = Array.isArray(child.material)
          ? child.material[0]
          : child.material;
        if (material.name) {
          materialMap.set(material.name, material);
        }
      }
    });
    return materialMap;
  }, [scene]);

  // Create Leva controls for each material
  const colors = useControls({
    main: { value: "#425084FF", label: "Main" },
    secondary: { value: "#7D53A6FF", label: "Secondary" },
    dark_green: { value: "#155E8BFF", label: "Dark Green" },
    yellow: { value: "#FEBA48FF", label: "Yellow" },
    purple: { value: "#800080", label: "Purple" },
    pencil: { value: "#000000", label: "Pencil" },
  });

  // Update material colors when controls change
  useLayoutEffect(() => {
    Object.entries(colors).forEach(([name, color]) => {
      const material = materials.get(name);
      if (
        material &&
        (material instanceof MeshStandardMaterial ||
          material instanceof MeshBasicMaterial ||
          material instanceof MeshPhongMaterial ||
          material instanceof MeshLambertMaterial)
      ) {
        material.color.set(color);
      }
    });
  }, [colors, materials]);

  return (
    <group>
      <primitive object={scene} />
    </group>
  );
};

export default Room;
