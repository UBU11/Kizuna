import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { clerkMiddleware } from "@hono/clerk-auth";
const app = new Hono();
import clerkAuth from "./controller/clerkAuth.js";
import { api } from "../api.js";
// app.use("*", clerkMiddleware({}));
app.get("/", (c) => {
    // clerkAuth(c);
    return c.text("Hello Hono!");
});
serve({
    fetch: app.fetch,
    port: 3000,
}, (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
});
