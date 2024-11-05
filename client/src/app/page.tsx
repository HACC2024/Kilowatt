"use client";
import React from "react";
import { useState, useEffect } from "react";
import { socket } from "../socket";
import { Canvas } from "@react-three/fiber";
import Volcano from "../app/models/Volcano";
import { OrbitControls } from "@react-three/drei";
import AirConditionerScene from "./components/AirConditionerScene";
import RefrigeratorScene from "./components/RefrigeratorScene";
import CeilingFanScene from "./components/CeilingFanScene";
import ElectricOvenScene from "./components/ElectricOvenScene";
import TelevisionScene from "./components/TelevisionScene";
import WasherDryerScene from "./components/WasherDryerScene";
import PorchLightScene from "./components/PorchLightScene";
import CeilingLightScene from "./components/CeilingLightScene";
import Sky from "./models/Sky";

type ApplianceStatus = {
  ac: boolean;
  refrigerator: boolean;
  ceilingFan: boolean;
  oven: boolean;
  tv: boolean;
  washerDryer: boolean;
  porchLight: boolean;
  ceilingLight: boolean;
};

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const [applianceStatus, setApplianceStatus] = useState<ApplianceStatus>({
    ac: false,
    refrigerator: false,
    ceilingFan: false,
    oven: false,
    tv: false,
    washerDryer: false,
    porchLight: false,
    ceilingLight: false,
  });

  // monthly kWh
  const energyConsumedPerMonth = {
    ac: 302.67,
    refrigerator: 45.5,
    ceilingFan: 2.67,
    oven: 28.08,
    tv: 17.25,
    washerDryer: 64.08,
    porchLight: 18.25,
    ceilingLight: 58.17,
  };

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    socket.on("applianceStatuses", (data) => {
      setApplianceStatus(data);
    });
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("ac unit");
    };
  }, []);

  return (
    <>
      <div className="h-screen w-screen flex flex-row justify-evenly bg-slate-200">
        <div className="w-2/5 flex h-full flex-row items-center justify-around gap-x-5 mr-10 ml-10">
          <div className="w-1/2 h-full flex flex-col justify-evenly">
            <div
              className={`m-2 pl-5 ${
                applianceStatus.ac
                  ? "bg-emerald-500 bg-opacity-40"
                  : "bg-slate-300"
              } rounded-3xl`}
            >
              <AirConditionerScene
                status={applianceStatus.ac}
                monthlyKWh={energyConsumedPerMonth.ac}
              />
            </div>
            <div
              className={`m-2 pl-5 ${
                applianceStatus.refrigerator
                  ? "bg-emerald-500 bg-opacity-40"
                  : "bg-slate-300"
              } rounded-3xl`}
            >
              <RefrigeratorScene
                status={applianceStatus.refrigerator}
                monthlyKWh={energyConsumedPerMonth.refrigerator}
              />
            </div>
            <div
              className={`m-2 pl-5 ${
                applianceStatus.ceilingFan
                  ? "bg-emerald-500 bg-opacity-40"
                  : "bg-slate-300"
              } rounded-3xl`}
            >
              <CeilingFanScene
                status={applianceStatus.ceilingFan}
                monthlyKWh={energyConsumedPerMonth.ceilingFan}
              />
            </div>

            <div
              className={`m-2 pl-5 ${
                applianceStatus.oven
                  ? "bg-emerald-500 bg-opacity-40"
                  : "bg-slate-300"
              } rounded-3xl`}
            >
              <ElectricOvenScene
                status={applianceStatus.oven}
                monthlyKWh={energyConsumedPerMonth.oven}
              />
            </div>
          </div>
          <div className="w-1/2 h-full flex flex-col justify-evenly">
            <div
              className={`m-2 pl-5 ${
                applianceStatus.tv
                  ? "bg-emerald-500 bg-opacity-40"
                  : "bg-slate-300"
              } rounded-3xl`}
            >
              <TelevisionScene
                status={applianceStatus.tv}
                monthlyKWh={energyConsumedPerMonth.tv}
              />
            </div>
            <div
              className={`m-2 pl-5 ${
                applianceStatus.washerDryer
                  ? "bg-emerald-500 bg-opacity-40"
                  : "bg-slate-300"
              } rounded-3xl`}
            >
              <WasherDryerScene
                status={applianceStatus.washerDryer}
                monthlyKWh={energyConsumedPerMonth.washerDryer}
              />
            </div>
            <div
              className={`m-2 pl-5 ${
                applianceStatus.porchLight
                  ? "bg-emerald-500 bg-opacity-40"
                  : "bg-slate-300"
              } rounded-3xl`}
            >
              <PorchLightScene
                status={applianceStatus.porchLight}
                monthlyKWh={energyConsumedPerMonth.porchLight}
              />
            </div>
            <div
              className={`m-2 pl-5 ${
                applianceStatus.ceilingLight
                  ? "bg-emerald-500 bg-opacity-40"
                  : "bg-slate-300"
              } rounded-3xl`}
            >
              <CeilingLightScene
                status={applianceStatus.ceilingLight}
                monthlyKWh={energyConsumedPerMonth.ceilingLight}
              />
            </div>
          </div>
        </div>

        <div className="w-3/5">
          <div className="absolute z-10">
            <p>Status: {isConnected ? "connected" : "disconnected"}</p>
            <p>Transport: {transport}</p>
            <p>AC: {applianceStatus.ac ? "on" : "off"}</p>
            <p>Refrigerator: {applianceStatus.refrigerator ? "on" : "off"}</p>
            <p>Ceiling Fan: {applianceStatus.ceilingFan ? "on" : "off"}</p>
            <p>Oven: {applianceStatus.oven ? "on" : "off"}</p>
            <p>TV: {applianceStatus.tv ? "on" : "off"}</p>
            <p>WasherDryer: {applianceStatus.washerDryer ? "on" : "off"}</p>
            <p>PorchLight: {applianceStatus.porchLight ? "on" : "off"}</p>
            <p>CeilingLight: {applianceStatus.ceilingLight ? "on" : "off"}</p>
          </div>
          <div className="h-full z-0">
            <Canvas camera={{ position: [-60, 10, 80], fov: 50 }}>
              <ambientLight intensity={2} />
              <group position={[0, -10, 0]} scale={0.25}>
                <Sky />
              </group>
              <group position={[0, -15, 0]} scale={0.7}>
                <directionalLight position={[5, 10, 5]} intensity={1} />
                <Volcano />
              </group>
              <OrbitControls />
            </Canvas>
          </div>
        </div>
      </div>
    </>
  );
}
