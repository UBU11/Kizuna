import { github } from "better-auth/social-providers";
import { authClient } from "./auth-client";

const { data, error } = await authClient.signIn.email({
  email,
  password,
  callbackURL: "/home",
  rememberMe: true,
});

const socialProviders = await authClient.signIn.social({
  provider: github,
  callbackURL: "/home",
  errorCallbackURL: "/error",
  newUserCallbackURL: "/onboarding",
  disableRedirect: true,
});
