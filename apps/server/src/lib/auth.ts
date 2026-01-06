import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../config/DB_Config.ts";
import dotenv from "dotenv"
dotenv.config()

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn:true
  },
  socialProviders: {
    github: {
      clientId: process.env?.GITHUB_CLIENT_ID as string,
      clientKey: process.env?.GITHUB_CLIENT_SECRET as string,
    },
  },

  trustedOrigins: ["http://localhost:3000", "http://localhost:8080", "http://localhost:5173"],
});
