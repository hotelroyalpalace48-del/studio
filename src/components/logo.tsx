
"use client"

import { cn } from "@/lib/utils"

/**
 * Mogra Design Studio Logo
 * A minimalist, symmetric floral silhouette matching the brand identity.
 */
export function MograLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-6 h-6", className)}
    >
      {/* Stem */}
      <rect x="47" y="82" width="6" height="12" rx="3" />
      
      {/* Symmetrical Leaves */}
      <path d="M50 82 C30 82, 22 68, 22 62 C22 55, 35 52, 50 62 C65 52, 78 55, 78 62 C78 68, 70 82, 50 82 Z" />
      
      {/* Symmetrical 3-Lobed Flower Head */}
      <path d="M50 62 C22 62, 18 45, 18 35 C18 20, 35 15, 50 15 C65 15, 82 20, 82 35 C82 45, 78 62, 50 62 Z" />
      
      {/* Central Circle Cutout */}
      <circle cx="50" cy="38" r="8" fill="hsl(var(--background))" />
    </svg>
  )
}
