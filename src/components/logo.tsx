
"use client"

import { cn } from "@/lib/utils"

export function MograLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-6 h-6", className)}
    >
      <path d="M50 85C50 85 50 65 50 55C50 45 50 35 50 25" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      <path d="M50 75C40 75 30 70 25 60C25 60 40 55 50 65" fill="currentColor" />
      <path d="M50 75C60 75 70 70 75 60C75 60 60 55 50 65" fill="currentColor" />
      <path d="M50 15C35 15 25 25 25 40C25 55 35 65 50 65C65 65 75 55 75 40C75 25 65 15 50 15ZM50 48C45.5817 48 42 44.4183 42 40C42 35.5817 45.5817 32 50 32C54.4183 32 58 35.5817 58 40C58 44.4183 54.4183 48 50 48Z" fill="currentColor" />
      <path d="M25 40C15 40 10 30 10 20C10 10 20 10 25 20C25 30 25 40 25 40Z" fill="currentColor" />
      <path d="M75 40C85 40 90 30 90 20C90 10 80 10 75 20C75 30 75 40 75 40Z" fill="currentColor" />
    </svg>
  )
}
