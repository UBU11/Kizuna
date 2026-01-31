import fastify from "fastify";
import dotenv from "dotenv";
import fastifyCors from "@fastify/cors";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import WShandler from "./handler/WS-Handler.ts";
import { userRoutes } from "./router/user.route.ts";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { schemas } from "./types/user.d.ts";


dotenv.config();


const server = fastify({ logger: true }).withTypeProvider<ZodTypeProvider>();

await server.register(import("@fastify/websocket"));

schemas.forEach(schema => {
  server.addSchema(schema)
})


server.register(fastifyCors, {
  origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true,
  maxAge: 86400,
});

server.register(userRoutes,{prefix:'api/users'})

server.register(WShandler, { prefix: "websocket" });


server.get("/healthcheck",()=>{
  return {
    Message: 'success'
  }
})


const listeners = ["SIGINT","SIGTERM"]

listeners.forEach((signal)=>{
  process.on(signal,async()=>{
    await server.close()
    process.exit(0)
  })
})


 console.log(server.getSchemas())





server.listen({ port: 8080, host: "0.0.0.0" }, (err: any, address) => {
  if (err) {
    server.log.error("Error starting server", err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
