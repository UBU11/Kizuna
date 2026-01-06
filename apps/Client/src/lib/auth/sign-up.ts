import { authClient } from "@/lib/auth/auth-client";

const { data, error } = await authClient.signUp.email(
  {
    email,
    name,
    password,
    image,
    callbackURL: "/home",
  },
  {
    onRequest: (ctx) => {},
    onResponse: (ctx) => {},
    onError: (ctx) => {
      alert(ctx.error.message);
    },
  }
);
