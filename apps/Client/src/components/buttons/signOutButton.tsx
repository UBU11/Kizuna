import { authClient } from "@/lib/auth/auth-client";
import { AuthLoading } from "@daveyplate/better-auth-ui";


export default async function SignOutButton() {
  const { data: session, error, isPending } = authClient.useSession();

  if (isPending)
    return (
      <AuthLoading>
        <div>Loading....</div>
      </AuthLoading>
    );
  if (error) return <div> Error: {error.message}</div>;

  return (
    <div className="">
      <p className="">Welcome: {session?.user.name}</p>
      <button onClick={() => authClient.signOut}>Logout</button>
    </div>
  );
}
