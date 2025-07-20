'use client'

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils" // optional utility for merging classNames
import { ReactNode } from "react"

interface GradientButtonProps {
  children: ReactNode
  onClick?: () => void
  className?: string
  type?: "button" | "submit" | "reset"
}

export const GradientButton = ({
  children,
  onClick,
  className = "",
  type = "button",
}: GradientButtonProps) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      className={cn(
        "bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold px-6 py-3 rounded transition-all duration-300 hover:scale-105 hover:shadow-2xl",
        className
      )}
    >
      {children}
    </Button>
  )
}
