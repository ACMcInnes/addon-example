import { signOut } from "@/auth";

// NOTE: does not sign out of Neto or run OAuth deauthorisation - only destroys AuthJS session in browser
// TODO: look at federated signout options, either extending signOut function or wrapping it in a custom function

export default function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({redirectTo: '/neto/login?type=signout'});
      }}
    >
      <button className="block mt-2 py-2 px-4 rounded-md text-gray-100 bg-sky-500 border-transparent">Sign Out</button>
    </form>
  );
}
