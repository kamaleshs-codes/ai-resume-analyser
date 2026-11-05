import { type ButtonHTMLAttributes, type ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const Button = ({ children, className = "", ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={`
        w-full
        rounded-xl
        bg-accent
        px-4
        py-3
        font-semibold
        text-text-btn
        shadow-(--shadow-button)
        transition-all
        duration-200
        hover:bg-accent-hover
        hover:-translate-y-0.5
        active:translate-y-0
        active:scale-[0.98]
        focus:outline-none
        focus:ring-2
        focus:ring-accent/30
        ${className}
      `}>
      {children}
    </button>
  );
};

export default Button;
