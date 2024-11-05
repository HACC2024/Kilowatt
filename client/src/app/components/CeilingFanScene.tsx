import React from "react";
import ProgressBar from "./ProgressBar";
import { Canvas } from "@react-three/fiber";
import CeilingFan from "../models/CeilingFan";
import { ApplianceSceneProps } from "../../../types";

const CeilingFanScene = ({
  status,
  monthlyKWh,
  onPercentageChange,
}: ApplianceSceneProps) => {
  return (
    <div className="flex h-full flex-row items-center justify-evenly content-center">
      <div className="w-3/4 flex items-center">
        <Canvas camera={{ position: [0, -350, 500], fov: 60 }}>
          <ambientLight intensity={2} />
          <directionalLight position={[10, 10, 10]} intensity={8} />
          <group position={[0, 20, 0]}>
            <CeilingFan status={status} />
          </group>
        </Canvas>
      </div>
      <div className="relative flex items-center justify-center w-1/2 h-5/6">
        <ProgressBar
          status={status}
          monthlyKWh={monthlyKWh}
          onPercentageChange={onPercentageChange}
        />
      </div>
    </div>
  );
};

export default CeilingFanScene;
