import { authClient } from "@/lib/auth/auth-client";

const { data, error } = await authClient.signUp.email(
  {
    email:"example.com",
    name:"test",
    password:"****",
    image:"image.png",
    callbackURL: "/home",
  },
  {
    onRequest: (ctx) => {ctx},
    onResponse: (ctx) => {ctx},
    onError: (ctx) => {
      alert(ctx.error.message);
    },
  }
);



