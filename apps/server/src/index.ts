import fastify from "fastify";
import dotenv from "dotenv";
import { auth } from "./lib/auth.ts";
import authProxyHandler from "./handler/authProxyHandler.ts";
import WSEngine from "./handler/wsEngine.ts";
import fastifyCors from "@fastify/cors";
// import wsRoutes from "./router/wsRoutes.ts"

dotenv.config();

const server = fastify({ logger: true });

await server.register(import("@fastify/static"), {
  root: new URL("../public", import.meta.url).pathname,

});

await server.register(import("@fastify/websocket"), {
  options: { maxPayload: 1048576 },
});

server.register(async function (server: any) {
  server.get("/ws", { websocket: true }, WSEngine);
});

server.register(fastifyCors, {
  origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true,
  maxAge: 86400,
});

server.get("/", async (request, reply) => {
  return reply.sendFile("index.html")
});

server.route({
  method: ["GET", "POST"],
  url: "/api/auth/*",
  async handler(request, reply) {
    await authProxyHandler(request, reply, server, auth);
  },
});

server.post("/login", async (request: any, reply) => {
  const data = request.body;
  server.log.info(data);
  reply.code(200).send({ message: "success", data: data });
  return data;
});

// server.get("/ws", { websocket: true }, (socket,request)=>{
// socket.on("message",()=>{
// socket.send("Hello from wildcard from single router")
// })
// });

server.listen({ port: 8080 , host: "0.0.0.0"},(err:any, address) => {
  if (err) {
   server.log.error("Error starting server",err)
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
