import type { HTMLAttributes, ReactNode } from "react";

type CardShadow = "inner" | "none";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  shadow?: CardShadow;
}

const Card = ({ children, className = "", shadow, ...props }: CardProps) => {
  const shadowClass =
    shadow === "inner"
      ? "shadow-inner"
      : shadow === "none"
        ? "shadow-none"
        : "shadow-card";

  return (
    <div
      {...props}
      className={`
        rounded-2xl
        bg-canvas
        border
        border-border
        p-8
        ${shadowClass}
        ${className}
      `}>
      {children}
    </div>
  );
};

export default Card;
