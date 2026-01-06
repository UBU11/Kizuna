import fastify from "fastify";
import dotenv from "dotenv";
import { auth } from "@/lib/auth.ts";
import authProxyHandler from "./handler/authProxyHandler.ts";
import fastifyCors from "@fastify/cors";
import { addAbortListener } from "events";

dotenv.config();

const server = fastify({ logger: true });

const response = await auth.api.signInEmail({
  body: {
    email,
    password,
  },
  asResponse: true,
});

server.register(fastifyCors, {
  origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true,
  maxAge: 86400,
});

server.route({
  method: ["GET", "POST"],
  url: "/api/auth/*",
  async handler(request, reply) {
    await authProxyHandler(request, reply, server, auth);
  },
});

server.get("/check", async (request: any, reply) => {
  const session = await auth.api.getSession({
    headers: request.raw.headers,
  });
});

server.post("/login", async (request, reply) => {
  const data = request.body;
  server.log.info(data);
  reply.code(200).send({ message: "success", data: data });
  return data;
});

server.listen({ port: 8080, host: "0.0.0.0" }, (err: any, address) => {
  if (err) {
    server.log.error("Error starting server", err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
