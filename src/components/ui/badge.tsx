import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "outline" | "subtle";

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-primary/15 text-primary ring-1 ring-primary/30",
  outline: "border border-primary/30 text-primary",
  subtle: "bg-secondary text-secondary-foreground",
};

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium uppercase tracking-[0.12em]",
        variantStyles[variant],
        className,
      )}
      {...props}
    />
  );
}
