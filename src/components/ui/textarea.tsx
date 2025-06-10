import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[150px] w-full rounded-md border border-background dark:border-foreground bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-background dark:placeholder:text-foreground placeholder:opacity-60 placeholder:font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-background dark:focus-visible:ring-foreground disabled:cursor-not-allowed text-background dark:text-foreground disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
