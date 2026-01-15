import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function sanitizeInput(input: string): string {
  if (!input) return "";
  return input
    .trim()
    .replace(/[<>]/g, "") // Remove potential HTML tags
    .slice(0, 500); // Limit length
}

export function getBaseUrl(): string {
  if (typeof window !== "undefined") {
    // Browser should use relative url
    return "";
  }
  if (process.env.VERCEL_URL) {
    // SSR should use vercel url
    return `https://${process.env.VERCEL_URL}`;
  }
  // Dev SSR should use localhost
  return `http://localhost:${process.env.PORT ?? 3000}`;
}
