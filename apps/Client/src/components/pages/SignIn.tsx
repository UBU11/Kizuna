import { useParams } from "react-router-dom";
import { AuthView } from "@daveyplate/better-auth-ui";

export default function SIGN_IN() {
  const { pathname } = useParams();

  return (
    <main className="h-screen w-full container mx-auto flex grow flex-col items-center justify-center gap-3 self-center p-4 md:p-6">
      <AuthView pathname={pathname} view="SIGN_IN"  className="bg-violet-500" />
    </main>
  );
}
