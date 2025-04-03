// Import the PrismaClient from the Prisma library
import { PrismaClient } from "@prisma/client";

// Create a single PrismaClient instance and reuse it globally to avoid multiple instances
export const db = globalThis.prisma || new PrismaClient();

// In non-production environments, store the PrismaClient instance in the global object
// to prevent creating multiple instances during hot-reloading in development
if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}

// This ensures Prisma works efficiently in serverless environments where multiple instances can cause issues
