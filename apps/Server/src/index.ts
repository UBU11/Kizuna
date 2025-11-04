import { serve } from "@hono/node-server";
import { Hono } from "hono";
const app = new Hono();
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { api } from "../api.js";
// import { api } from "../api.js";

app.use("*", clerkMiddleware({
  secretKey: api.CLERK_SECRET_KEY,
  publishableKey:api.CLERK_PUBLISHABLE_KEY,
  apiVersion: "v1",
  apiUrl: "https://api.clerk.com",
}));

app.get("/", async (c) => {
  const auth = c.get("clerk");
  const {isAuthenticated, userId} = getAuth(c);

  try {
    if(!isAuthenticated){
      c.json({
        message: "User is unauthenticated"
      },
    404
  )
    }
    const user = await auth.users.getUser(userId!);
    console.log(user);
    return c.json({
      user,
    });
  } catch (error: any) {
    return c.json(
      {
        message: error.message,
      },
      404
    );
  }

});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
