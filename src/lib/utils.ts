import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  MASTER RULE: NO EM-DASHES (—) OR EN-DASHES (–) ANYWHERE  ║
 * ║  This is enforced at EVERY level:                           ║
 * ║    1. AI prompt (server-side instruction)                   ║
 * ║    2. Edge function post-processing (server-side strip)     ║
 * ║    3. Client-side sanitization (this function)              ║
 * ║  ALL text content MUST pass through this function.          ║
 * ╚══════════════════════════════════════════════════════════════╝
 */
export function stripDashes(obj: any): any {
  if (typeof obj === "string") return obj.replace(/\u2014/g, "-").replace(/\u2013/g, "-");
  if (Array.isArray(obj)) return obj.map(stripDashes);
  if (obj && typeof obj === "object") {
    const out: any = {};
    for (const [k, v] of Object.entries(obj)) out[k] = stripDashes(v);
    return out;
  }
  return obj;
}
