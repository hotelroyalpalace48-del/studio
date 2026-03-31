
"use client"

import { cn } from "@/lib/utils"

/**
 * A realistic Mogra (Jasmine) flower SVG logo.
 * Designed to be delicate, multi-petaled, and organic.
 */
export function MograLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-6 h-6", className)}
    >
      {/* Outer Petals */}
      <path
        d="M50 10C55 25 70 30 85 35C70 40 65 55 60 70C55 55 40 50 25 45C40 40 45 25 50 10Z"
        fill="currentColor"
        fillOpacity="0.4"
      />
      {/* Mid-Layer Petals */}
      <path
        d="M50 20C53 32 65 35 75 38C65 41 62 53 58 65C53 53 41 50 30 47C41 44 44 32 50 20Z"
        fill="currentColor"
        fillOpacity="0.6"
      />
      {/* Inner Petal Cluster */}
      <circle cx="50" cy="42" r="8" fill="currentColor" fillOpacity="0.8" />
      <path
        d="M50 30C52 38 58 40 62 42C58 44 56 50 54 55C52 47 46 45 40 44C46 42 48 38 50 30Z"
        fill="currentColor"
      />
      {/* Stem / Sepal detail */}
      <path
        d="M48 65C48 65 45 85 45 90C45 95 55 95 55 90C55 85 52 65 52 65"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}
