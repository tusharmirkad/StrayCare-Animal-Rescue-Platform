import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

// Use ClerkExpressRequireAuth for consistent token-based auth on API routes
export const requireAuth = ClerkExpressRequireAuth();
