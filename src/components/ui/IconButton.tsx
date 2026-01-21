import * as React from "react";
import { cn } from "@/lib/utils";

export interface IconButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "danger" | "active" | "ghost";
    size?: "sm" | "md" | "lg";
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
    ({ className, variant = "default", size = "md", children, ...props }, ref) => {
        const variants = {
            default: "bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700",
            danger: "bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white border border-red-500/20",
            active: "bg-blue-600 text-white shadow-lg shadow-blue-500/30",
            ghost: "bg-transparent text-slate-400 hover:text-white hover:bg-slate-800/50",
        };

        const sizes = {
            sm: "h-8 w-8 p-1.5 rounded-lg",
            md: "h-12 w-12 p-3 rounded-2xl",
            lg: "h-14 w-14 p-3.5 rounded-3xl",
        };

        return (
            <button
                ref={ref}
                type="button"
                className={cn(
                    "inline-flex items-center justify-center transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50 disabled:pointer-events-none",
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            >
                {children}
            </button>
        );
    }
);
IconButton.displayName = "IconButton";

export { IconButton };
