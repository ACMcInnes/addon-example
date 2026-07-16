import { getAuthContext } from "@/components/auth/get-auth-context";

export default async function Profile() {

  const { session, token } = await getAuthContext();

  if (!session) {
    return <p>Not authenticated</p>;
  }

  console.log(`TOKEN`)
  console.log(token)

  return (
    <div className="flex flex-col place-items-center pb-8">
      <p>G&apos;day {session.user.name}</p>
    </div>
  );
}
