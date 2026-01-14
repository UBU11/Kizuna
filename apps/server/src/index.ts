import fastify from "fastify";
import dotenv from "dotenv";
import fastifyCors from "@fastify/cors";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import WShandler from "./handler/WS-Handler.ts";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { z } from "zod/v4";
import type { ZodTypeProvider } from "fastify-type-provider-zod";

dotenv.config();

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle({ client: sql });

const server = fastify({ logger: true });

await server.register(import("@fastify/websocket"));

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.register(fastifyCors, {
  origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true,
  maxAge: 86400,
});

server.register(WShandler, { prefix: "websocket" });

server.listen({ port: 8080, host: "0.0.0.0" }, (err: any, address) => {
  if (err) {
    server.log.error("Error starting server", err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
