import React from "react";
import { Container } from "./Container";

interface BandSectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
}

export function BandSection({
  as: Component = "section",
  className = "",
  containerClassName = "",
  children,
  ...props
}: BandSectionProps) {
  return (
    <Component
      className={`w-full border-y border-line bg-surface py-12 sm:py-16 md:py-20 ${className}`}
      {...props}
    >
      <Container className={containerClassName}>{children}</Container>
    </Component>
  );
}
