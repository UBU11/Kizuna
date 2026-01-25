import { email, z } from "zod";
import { buildJsonSchemas } from "fastify-zod";
import type { P } from "node_modules/better-auth/dist/shared/better-auth.BUpnjBGu.js";
import type { passkey } from "better-auth/plugins/passkey";
import type { access } from "fs";
import type { createSchema } from "better-auth/client";

const createUserSchema = z.object({
  email: z.string(),
  name: z.string(),
  password: z.string(),
});

export type createUserInput = z.infer<typeof createUserSchema>;

const createUserResponseSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
});

const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email(),
  password: z.string().min(8),
});

export type LoginUserInput = z.infer<typeof loginSchema>;

const loginResponsesSchema = z.object({
  accessToken: z.string(),
});

export const { schemas: userSchemas, $ref } = buildJsonSchemas({
  createUserSchema,
  createUserResponseSchema,
  loginSchema,
  loginResponsesSchema,
});
