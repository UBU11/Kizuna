import type { FastifyReply, FastifyRequest } from "fastify";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import type { createUserInput } from "@/types/user.js";
import { user } from "../models/auth-schema.ts";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import "dotenv/config";

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle({ client: sql });

const saltRound = 12;



export async function createUser(
  req: FastifyRequest<{
    Body: createUserInput;
  }>,
  reply: FastifyReply,
) {
  const { password, email, name } = req.body;

  const userDB = await db.select().from(user).where(eq(user.email, email));

  if (userDB) {
    return reply.code(401).send({
      message: "User already exists with this email",
    });
  }

  try {
    const hash = await bcrypt.hash(password, saltRound);
    const userDB = await db
      .insert(user)
      .values({
        id:"1",
        password: hash,
        name,
        email,
      })
      .returning({ insertedId: user.id })
      .onConflictDoNothing({ target: user.id });
  } catch (error) {
    return reply.code(500).send(`error: ${error}`)
  }
}
