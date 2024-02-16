"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";

import { getWebstore } from "@/components/callback/form-action-webstore";

const initialState = {
  message: "",
  webstore: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" aria-disabled={pending} className="inline-block ml-1 py-2 px-4 rounded-md text-gray-100 bg-sky-500 border-transparent">
      Submit
    </button>
  );
}

export default function LoginForm() {
  const [formState, formAction] = useFormState(getWebstore, initialState);

  const searchParams = useSearchParams();
  const hasType = searchParams.has("type");

  if (hasType) {
    const loginType = searchParams.get("type");

    if (loginType == "webstore") {
      if (formState?.webstore) {
        return (
          <>
            <p>Webstore confirmed</p>

                <Link
                  href={`/neto/callback/?store_domain=${formState?.webstore}`}
                  className="text-sky-500"
                >
                  Start oAuth?
                </Link>
          </>
        );
      } else {
        return (
          <>
            <form action={formAction}>
              <input type="text" id="webstore" name="webstore" className="mt-1 w-8/12 inline-block rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 dark:bg-gray-600 dark:focus:border-gray-100 dark:focus:bg-zinc-900"/>
              <SubmitButton />
              <p aria-live="polite" className="text-sky-500" role="status">
                {formState?.message}
              </p>
            </form>
            <div className="w-full md:w-7/12 mt-4 h-40 text-center">
            <details className="open:bg-white dark:open:bg-slate-900 open:ring-1 open:ring-black/5 dark:open:ring-white/10 open:shadow-lg p-6 rounded-lg">
              <summary className="text-sm leading-6 text-slate-900 dark:text-white font-semibold select-none">
                Cookie Policy
              </summary>
              <div className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400 text-left">
                <p>This app uses cookies to keep track of your login status. These cookies are not used for tracking or advertising and all information is securely encoded.</p>
                <p className="mt-2">By entered your Neto webstore domain above you consent to your webstore data being collected. See our full terms of use for full details.</p>
              </div>
            </details>
            </div>
          </>
        );
      }
    } else {
      return (
        <>
          <p>
            Login type issue, please try again or return{" "}
            <Link href={`/`} className="text-sky-500">
              Home
            </Link>
          </p>
          <p>
            <Link href="/neto/callback" className="text-sky-500">
              Restart oAuth?
            </Link>
          </p>
        </>
      );
    }
  } else {
    return (
      <>
        <p>
          Could not log you in at this time, return{" "}
          <Link href={`/`} className="text-sky-500">
            Home
          </Link>
        </p>
        <p>
          <Link href="/neto/callback" className="text-sky-500">
            Restart oAuth?
          </Link>
        </p>
      </>
    );
  }
}
