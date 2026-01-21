import * as React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost" | "destructive" | "glass" | "outline";
    size?: "sm" | "md" | "lg" | "icon";
    isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", isLoading, children, ...props }, ref) => {
        const variants = {
            primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20 border border-blue-500/50",
            secondary: "bg-slate-700 text-slate-100 hover:bg-slate-600 border border-slate-600",
            ghost: "bg-transparent text-slate-300 hover:bg-slate-800/50 hover:text-white",
            destructive: "bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-500/20",
            glass: "glass text-white hover:bg-white/10 border-white/10",
            outline: "bg-transparent border border-current hover:bg-slate-100/5",
        };

        const sizes = {
            sm: "h-8 px-3 text-xs rounded-lg",
            md: "h-10 px-4 py-2 rounded-xl",
            lg: "h-12 px-6 text-lg rounded-2xl",
            icon: "h-10 w-10 p-2 rounded-full flex items-center justify-center",
        };

        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center font-medium transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-slate-900",
                    variants[variant],
                    sizes[size],
                    className
                )}
                disabled={isLoading || props.disabled}
                {...props}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {children}
            </button>
        );
    }
);
Button.displayName = "Button";

export { Button };
