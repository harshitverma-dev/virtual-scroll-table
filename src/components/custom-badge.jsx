import { cn } from "@/lib/utils"

export function CustomBadge({ variant = "default", className, children }) {
  const baseClasses =
    "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"

  const variantClasses = {
    default: "bg-primary text-primary-foreground hover:bg-primary/80",
    outline: "border border-current bg-background text-foreground",
  }

  return <span className={cn(baseClasses, variantClasses[variant], className)}>{children}</span>
}
