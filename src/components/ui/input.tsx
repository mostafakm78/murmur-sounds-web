import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-background dark:border-foreground bg-transparent px-3 py-1 text-base font-medium text-background dark:text-foreground shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-background dark:placeholder:text-foreground placeholder:opacity-60 placeholder:font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-background dark:focus-visible:ring-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
