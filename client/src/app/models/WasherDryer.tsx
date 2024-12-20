/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: CloudHub (https://sketchfab.com/cloudhub)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/mielewasheranddryer-5688602a90504ea2aff1691772e4db8c
Title: Miele+washer+and+dryer
*/

import React from "react";
import { useGLTF } from "@react-three/drei";
import { useSpring, a } from "@react-spring/three";

interface applianceStatusProps {
  status: boolean;
}

const WasherDryer = ({ status }: applianceStatusProps) => {
  const { scene } = useGLTF("/mielewasheranddryer.glb");

  const { rotation } = useSpring({
    from: { rotation: [0, 0, 0] },
    to: { rotation: status ? [0, 0.2, 0] : [0, 0, 0] },
    config: { duration: 5000, tension: 170, friction: 20 },
    loop: true,
  });

  return (
    <a.mesh
      rotation-x={rotation.to((x) => x)}
      rotation-y={rotation.to((_, y) => y)}
      rotation-z={rotation.to((_, __, z) => z)}
    >
      <primitive object={scene} />
    </a.mesh>
  );
};

useGLTF.preload("/mielewasheranddryer.glb");
export default WasherDryer;
