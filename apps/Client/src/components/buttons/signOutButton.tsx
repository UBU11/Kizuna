import { authClient } from "@/lib/auth/auth-client";

export default async function SignOutButton() {
  const onClick = await authClient.signOut({
    fetchOptions: {
      onSuccess: () => console.log("login"), //redicect to login page
    },
  });

  return <div>signOutButton</div>;
}
