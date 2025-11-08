import fastify from "fastify";
import dotenv from "dotenv";
import { auth } from "./lib/auth.ts";
import { codec, json, undefined } from "better-auth";
dotenv.config();

const server = fastify({ logger: true });

server.get("/", async (request, reply) => {
  return "Welcome :)";
});

server.route({
  method: ["GET", "POST"],
  url: "/api/auth/*",
  async handler(request, reply) {
    try {
      const url = new URL(request.url, `http://${request.headers.host}`);

      const headers = new Headers();
      Object.entries(request.headers).forEach(([key, value]) => {
        if (value) headers.append(key, value.toString());
      });

      const req = new Request(url.toString(), {
        method: request.method,
        headers,
        body: request.body ? JSON.stringify(request.body) : undefined,
      });

      const response = await auth.handler(req)

      reply.status(response.status)
      response.headers.forEach((value, key)=>{
        reply.header(key,value)
      })
      reply.send(response.body ? await response.text() : null)
    } catch (error:any) {
      server.log.error("Authentication Error:", error);
      reply.status(500).send({
        error: "Internal authentication error",
        code: "AUTH_FAILURE"
      });

    }
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
