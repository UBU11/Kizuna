import { AuthUIProvider } from "@daveyplate/better-auth-ui";
import { authClient } from "../lib/auth/auth-client.ts";
import { useNavigate, NavLink } from "react-router-dom";

export function Providers({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  return (
    <AuthUIProvider authClient={authClient} navigate={navigate} Link={NavLink}>
      {children}
    </AuthUIProvider>
  );
}
