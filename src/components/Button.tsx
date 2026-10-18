import React from "react";
import Link from "next/link";

export type ButtonVariant = "solid-red" | "solid-ivory" | "outline" | "text-arrow";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
}

type ButtonAsButton = ButtonBaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = ButtonBaseProps & {
  href: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({
  variant = "solid-red",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center font-sans tracking-[0.14em] uppercase transition-all duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] rounded-[2px] cursor-pointer focus-visible:outline-2 focus-visible:outline-foreground";

  // Solid buttons darken slightly on hover (brightness-90)
  const variantClasses: Record<ButtonVariant, string> = {
    "solid-red":
      "bg-accent text-on-accent hover:brightness-90 active:scale-[0.99] px-6 py-3 text-label font-medium border border-accent",
    "solid-ivory":
      "bg-foreground text-background hover:brightness-90 active:scale-[0.99] px-6 py-3 text-label font-medium border border-foreground",
    outline:
      "bg-transparent border border-line text-foreground hover:border-foreground px-6 py-3 text-label font-medium",
    "text-arrow":
      "bg-transparent text-foreground hover:text-accent-text p-0 text-label font-medium gap-2 group",
  };

  const isLink = typeof (props as ButtonAsLink).href === "string";

  if (isLink) {
    const { href, ...anchorProps } = props as ButtonAsLink;
    return (
      <Link
        href={href}
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        {...anchorProps}
      >
        <span>{children}</span>
        {variant === "text-arrow" && (
          <span
            className="transition-transform duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 inline-block"
            aria-hidden="true"
          >
            &rarr;
          </span>
        )}
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...buttonProps}
    >
      <span>{children}</span>
      {variant === "text-arrow" && (
        <span
          className="transition-transform duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 inline-block"
          aria-hidden="true"
        >
          &rarr;
        </span>
      )}
    </button>
  );
}
