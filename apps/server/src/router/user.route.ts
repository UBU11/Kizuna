import { $ref } from "../types/user.d.ts";
import type { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { createUser } from "../handler/user.handler.ts";

export async function userRoutes(server: FastifyInstance): Promise<void> {
  server.get("/", (req: FastifyRequest, reply: FastifyReply) => {
    reply.send({
      message: "route hit",
    });
  });

  server.post(
    "/register",
    {
      schema: {
        body: $ref("createUserSchema"),
        response: {
          201: $ref("createUserResponseSchema"),
        },
      },
    },
    createUser
  );

  server.post(
    "/login",
    {
      schema: {
        body: $ref("loginSchema"),
        response: {
          201: $ref("loginResponsesSchema"),
        },
      },
    },
  ()=>{}
  );

  server.delete("/logout", () => {});

  server.log.info("user route registered");
}
