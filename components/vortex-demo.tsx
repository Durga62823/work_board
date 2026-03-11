"use client";
import React from "react";
import { Vortex } from "@/components/ui/vortex";

export default function VortexDemo({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full min-h-screen overflow-hidden">
      <Vortex
        backgroundColor="transparent"
        rangeY={200}
        particleCount={500}
        baseHue={220}
        baseSpeed={0.0}
        rangeSpeed={1.5}
        baseRadius={1}
        rangeRadius={2}
        className="flex items-center flex-col justify-center w-full min-h-screen"
      >
        {children}
      </Vortex>
    </div>
  );
}
