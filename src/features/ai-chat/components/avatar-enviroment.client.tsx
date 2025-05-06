"use client";

import BoyAvatar from "@/components/shared/model/boy-avatar";
import { Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";

type AvatarEnviromentProps = {
  isSpeaking: boolean;
};

const AvatarEnviroment = ({ isSpeaking }: AvatarEnviromentProps) => {
  return (
    <div className="w-full h-full bg-gradient-to-b from-blue-50 to-blue-100">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <BoyAvatar isSpeaking={isSpeaking} position={[0, -4, 5]} scale={3} />
        <Environment preset="sunset" />
      </Canvas>
    </div>
  );
};

export default AvatarEnviroment;
