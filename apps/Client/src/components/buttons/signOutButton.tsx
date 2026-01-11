import { authClient } from "@/lib/auth/auth-client";
import { useEffect } from "react";

export default async function SignOutButton() {
  const { data: session, error, isPending } = authClient.useSession();

  if (isPending) return <div>Loading....</div>;
  if (error) return <div> Error: {error.message}</div>;

  return (
    <div className="">
      <p className="">Welcome: {session?.user.name}</p>
      <button onClick={() => authClient.signOut}>Logout</button>
    </div>
  );
}
