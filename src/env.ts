import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  // Server side Envs
  server: {
    DUB_TOKEN: z.string().min(1),
    NODE_ENV: z.enum(["development", "production"]),
  },

  // Client side Envs
  clientPrefix: "VITE_",
  client: {
    VITE_DOMAIN: z.string().url(),
  },

  // runtime Envs
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
  },
});
