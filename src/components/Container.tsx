import React from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
}

export function Container({
  as: Component = "div",
  className = "",
  children,
  ...props
}: ContainerProps) {
  return (
    <Component
      className={`w-full max-w-[1680px] mx-auto px-[clamp(24px,4vw,64px)] ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
