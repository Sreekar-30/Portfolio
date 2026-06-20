"use client";

import React from "react";

interface LogoItem {
  node: React.ReactNode;
  title: string;
}

interface LogoLoopProps {
  logos: LogoItem[];
}

export default function LogoLoop({ logos }: LogoLoopProps) {
  const duplicated = [...logos, ...logos];

  return (
    <div className="logo-container">
      <div className="logo-track">
        {duplicated.map((logo, index) => (
          <div key={index} className="logo-item" title={logo.title}>
            {logo.node}
          </div>
        ))}
      </div>
    </div>
  );
}