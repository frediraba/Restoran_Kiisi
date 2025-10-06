import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "default" | "secondary" | "outline" | "ghost" | "link";
type ButtonSize = "sm" | "default" | "lg" | "icon";

const baseStyles =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60 focus-visible:ring-offset-background";

const variantStyles: Record<ButtonVariant, string> = {
  default:
    "bg-primary text-primary-foreground shadow-[0_12px_32px_rgba(255,125,0,0.28)] hover:bg-primary/90",
  secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
  outline:
    "border border-primary/40 bg-background text-primary shadow-sm hover:border-primary/60 hover:bg-primary/10",
  ghost: "text-primary hover:bg-primary/10",
  link: "text-primary underline-offset-4 hover:text-primary/80 hover:underline",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-xs",
  default: "h-11 px-6",
  lg: "h-12 px-8 text-base",
  icon: "h-10 w-10",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function buttonClasses({
  variant = "default",
  size = "default",
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
} = {}) {
  return cn(baseStyles, variantStyles[variant], sizeStyles[size]);
}

export function Button({
  className,
  variant = "default",
  size = "default",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonClasses({ variant, size }), className)}
      {...props}
    />
  );
}
