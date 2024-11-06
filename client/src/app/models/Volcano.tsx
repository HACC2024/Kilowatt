/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: Animateria (https://sketchfab.com/Animateria)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/volcano-island-lowpoly-4a6591dc9fee40d8bfda8350683af9af
Title: Volcano Island Lowpoly
*/

import React, { useRef, useEffect, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three/src/Three.js";
import { useSpring, a, easings } from "@react-spring/three";

const Volcano = (props: any) => {
  const [isTilted, setIsTilted] = useState(true);
  const { nodes, materials } = useGLTF("/volcano_island_lowpoly.glb");

  const ref: any = useRef();

  const { position, rotation } = useSpring({
    position: isTilted ? [0, -5, 0] : [0, 0, 0],
    rotation: isTilted ? [Math.PI / 15, 0, 0] : [0, 0, 0], // Tilts 30 degrees on X-axis when `isTilted` is true
    config: {
      duration: 600, // Adjust duration to sync position and rotation
      easing: easings.easeInOutCubic, // Smooth ease-in-out effect
    },
  });

  useFrame(() => {
    ref.current.rotation.y += 0.001;
  });

  return (
    <group {...props} dispose={null} ref={ref}>
      <a.group // must specify each axis separately to avoid typescript error
        // underscore placeholders ignore unused values
        rotation-x={rotation.to((x) => x)}
        rotation-y={rotation.to((_, y) => y)}
        rotation-z={rotation.to((_, __, z) => z)}
        position={position.to((x, y, z) => [x, y, z])}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.Clouds_Clouds_0 as Mesh).geometry}
          material={materials.Clouds}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.5}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.hammock_hammock_0 as Mesh).geometry}
          material={materials.hammock}
          position={[180.509, 1151.676, 5904.325]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.5}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.Tequila_Bottle_Tequila_Bottle_0 as Mesh).geometry}
          material={materials.Tequila_Bottle}
          position={[3492.547, 1112.371, 3620.925]}
          rotation={[-1.38, 0.112, -0.022]}
          scale={0.5}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.skeleton_skeleton_0 as Mesh).geometry}
          material={materials.skeleton}
          position={[3541.67, 1110.094, 3568.021]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.5}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.Pyramid_Pyramid_0 as Mesh).geometry}
          material={materials.Pyramid}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.5}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.Island_Grass_Island_Grass_0 as Mesh).geometry}
          material={materials.Island_Grass}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.5}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.shrubbery_shrubbery_0 as Mesh).geometry}
          material={materials.shrubbery}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.5}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.Lava_bubble_Lava_bubble_0 as Mesh).geometry}
          material={materials.Lava_bubble}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.5}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.Volcanic_lava_Volcanic_lava_0 as Mesh).geometry}
          material={materials.Volcanic_lava}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.5}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.Palm_tree_2_Palm_tree_2_0 as Mesh).geometry}
          material={materials.Palm_tree_2}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.5}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.Palm_tree_1_Palm_tree_1_0 as Mesh).geometry}
          material={materials.Palm_tree_1}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.5}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.Volacano_Sand_Volacano_Sand_0 as Mesh).geometry}
          material={materials.Volacano_Sand}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.5}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.Volcano_Grass_Volcano_Grass_0 as Mesh).geometry}
          material={materials.Volcano_Grass}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.5}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.Volcano_Base_Volcano_Base_0 as Mesh).geometry}
          material={materials.Volcano_Base}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.5}
        />
      </a.group>
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.Ocean_Ocean_0 as Mesh).geometry}
        material={materials.Ocean}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.5}
      />
    </group>
  );
};

useGLTF.preload("/volcano_island_lowpoly.glb");

export default Volcano;
