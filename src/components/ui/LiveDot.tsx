'use client'

import { cn } from "@/lib/utils"

interface LiveDotProps {
  className?: string
  label?: string
  size?: "sm" | "md" | "lg"
}

export const LiveDot = ({ className, label = "Live", size = "sm" }: LiveDotProps) => {
  const sizeMap = {
    sm: "w-2 h-2",
    md: "w-3 h-3",
    lg: "w-4 h-4",
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <div
        className={cn(
          "bg-red-500 rounded-full animate-pulse",
          sizeMap[size]
        )}
      />
      {label && <span className="text-sm text-red-400 font-medium">{label}</span>}
    </div>
  )
}
