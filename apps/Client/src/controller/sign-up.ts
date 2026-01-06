import { authClient } from "../lib/auth/auth-client.ts";
import { useNavigate } from "react-router-dom";

type User = {
  email: string;
  name: string;
  password: string;
}

const navigate = useNavigate();

export const SignUp = async({email, password, name}: User) => {
  const { date, error } = await authClient.signUp.email(
    {
      email: email,
      password: password,
      name: name,
      callbackURL: "http://localhost:5173",
    },
    {
      onRequest: (ctx) => {
        console.log(`loading:${ctx.url}`);
      },
      onSuccess: (ctx) => {
        console.log("request is successful");
        navigate("/login");
      },

      onError: (ctx) => {
        alert(ctx.error.message);
      },
    }
  );
};
