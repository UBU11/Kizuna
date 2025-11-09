import fastify from "fastify";
import dotenv from "dotenv";
import { auth } from "./lib/auth.ts";
import authProxyHandler from "./handler/authProxyHandler.ts";
import fastifyCors from "@fastify/cors";
dotenv.config();

const server = fastify({ logger: true });

server.register(fastifyCors, {
  origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true,
  maxAge: 86400,
});

server.get("/", async (request, reply) => {
  return "Welcome :)";
});

server.route({
  method: ["GET", "POST"],
  url: "/api/auth/*",
  async handler(request, reply) {
    await authProxyHandler(request, reply, server, auth);
  },
});

server.get("/ping", async (request, reply) => {
  return "pong\n";
});

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
