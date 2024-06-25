import { signOut } from "@/auth";

export default function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button className="block ml-1 py-2 px-4 rounded-md text-gray-100 bg-sky-500 border-transparent">Sign Out</button>
    </form>
  );
}
