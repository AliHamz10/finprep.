import { z } from "zod";

export const accountSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.enum(["current", "savings", "credit", "investment"]),
  balance: z.string().min(1, "Initial Balance is requried"),
  isDefault: z.boolean().default(false),
});
