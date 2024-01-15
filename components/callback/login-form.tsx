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
    <button type="submit" aria-disabled={pending}>
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
            <p>Could not confirm store, please enter below</p>
            <form action={formAction}>
              <input type="text" id="webstore" name="webstore" />
              <SubmitButton />
              <p aria-live="polite" className="text-sky-500" role="status">
                {formState?.message}
              </p>
            </form>
          </>
        );
      }
    } else {
      return (
        <>
          <p>
            Login type issue, please try again or return
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
          Could not log you in at this time, return
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
