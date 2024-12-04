import { redirect } from "next/navigation";
import Link from "next/link";

import LoginForm from "@/components/callback/login-form";
import { auth } from "@/auth";

export default async function Login() {
  const session = await auth();

  if (session) {
    console.log(`already logged in, redirecting to dashboard`);
    redirect(`/dashboard`);
  } else {
    return (
      <>
        <div>
          <h2 className="text-center text-2xl font-semibold">- Login -</h2>
          <p className="mt-4">
            Enter your webstore to get started, or return{" "}
            <Link href="/" className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400">
              Home
            </Link>
            .
          </p>
          <br />
          <LoginForm />
        </div>
        <div>
          <p>
            Want to provide feedback?{" "}
            <Link href="/contact" className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400">
              Contact Us
            </Link>
          </p>
        </div>
      </>
    );
  }
}
