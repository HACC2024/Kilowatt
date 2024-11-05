import React, { Suspense } from "react";
import ProgressBar from "./ProgressBar";
import { Canvas } from "@react-three/fiber";
import ElectricOven from "../models/ElectricOven";
import { ApplianceSceneProps } from "../../../types";

const ElectricOvenScene = ({
  status,
  monthlyKWh,
  onPercentageChange,
}: ApplianceSceneProps) => {
  return (
    <div className="flex h-full flex-row items-center justify-evenly content-center">
      <div className="w-3/4 flex items-center">
        <Canvas
          camera={{ position: [1, 0.5, 1], fov: 25 }}
          style={{ width: "100%", height: "100%" }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={1} />
            <directionalLight position={[10, 0, 10]} intensity={1} />

            <group position={[-1.2, -0.75, -0.5]}>
              <ElectricOven status={status} />
            </group>
          </Suspense>
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

export default ElectricOvenScene;
