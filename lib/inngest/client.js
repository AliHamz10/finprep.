import { Inngest } from "inngest";

// Create a client to send and receive events
export const inngest = new Inngest({
  id: "finprep",
  name: "FinPrep",
  retryFunction: async (attempt) => {
    delay: Math.pow(2, attempt) * 1000; // Exponential Backoff
    maxAttempts: 2;
  },
});
