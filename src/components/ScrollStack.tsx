"use client";

import React from "react";

interface ScrollStackProps {
  children: React.ReactNode;
  className?: string;
}

interface ScrollStackItemProps {
  children: React.ReactNode;
  itemClassName?: string;
}

export function ScrollStackItem({
  children,
  itemClassName = "",
}: ScrollStackItemProps) {
  return (
    <div
      className={`sticky top-24 rounded-[40px] overflow-hidden ${itemClassName}`}
    >
      {children}
    </div>
  );
}

export default function ScrollStack({
  children,
  className = "",
}: ScrollStackProps) {
  return (
    <div className={`space-y-10 ${className}`}>
      {children}
    </div>
  );
}