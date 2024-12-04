
import { signIn } from "@/auth"
 
export default function SignIn({
    webstore
  }: {
    webstore: string;
  }) {

  return (
    <form
      action={async () => {
        //"use server"
        await signIn('neto', {}, { store_domain: webstore });
      }}
    >
      <button type="submit" className="block mt-2 py-2 px-4 rounded-md text-gray-100 bg-indigo-600 hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400 border-transparent">Signin with Neto</button>
    </form>
  )
} 

/*
import { signIn } from "@/auth"
import { redirect } from "next/navigation";
 
export default async function AuthenticateWebstore(webstore: string) {
    try {
        const auth = await signIn('neto', {}, { store_domain: webstore });
  
        console.log(`AUTH RESPONSE:`);
        console.log(auth);
  
      } catch (e) {
        return `Authentication failed. ${e}`;
      }
  
      redirect(`/dashboard`);
} 

*/