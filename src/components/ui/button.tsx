import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "default" | "secondary" | "outline" | "ghost" | "link";
type ButtonSize = "sm" | "default" | "lg" | "icon";

const baseStyles =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60 focus-visible:ring-offset-background";

const variantStyles: Record<ButtonVariant, string> = {
  default: "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  outline: "border border-input bg-background text-foreground hover:bg-muted hover:text-foreground",
  ghost: "text-muted-foreground hover:bg-muted hover:text-foreground",
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
