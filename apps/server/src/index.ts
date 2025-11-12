import fastify from "fastify";
import dotenv from "dotenv";
import { auth } from "./lib/auth.ts";
import authProxyHandler from "./handler/authProxyHandler.ts";
import WSEngine from "./handler/wsEngine.ts";
import fastifyCors from "@fastify/cors";
import websocket from "@fastify/websocket";
import { Socket } from "dgram";


dotenv.config();

const server = fastify({ logger: true });

server.register(websocket, {
  options: { maxPayload: 1048576 },
});

server.register(
  async function(server) {
    server.get("/ws/*",{websocket:true},(socket,request)=>{
      socket.on("message",()=>{
        socket.send("Hello from wildcard router")
      })
    })
  }
);

server.register(fastifyCors, {
  origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true,
  maxAge: 86400,
});

server.get("/home", async (request, reply) => {
  return "Welcome :)";
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
  console.log(data);
  reply.code(200).send({ message: "success", data: data });
  return data;
});

// server.get("/ws", { websocket: true }, (socket,request)=>{
  // socket.on("message",()=>{
    // socket.send("Hello from wildcard from single router")
  // })
// });

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
