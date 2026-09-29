"use client";

import { useForm, ValidationError } from "@formspree/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

export default function SubscriberForm() {
  const [state, handleSubmit] = useForm(`${process.env.NEXT_PUBLIC_FORM}`);

  if (state.succeeded) {
    return <p>Thanks for your submission!</p>;
  }

  return (
    <form
      className="flex flex-col w=full sm:w-10/12 md:w-full lg:w-9/12"
      onSubmit={handleSubmit}
    >

      <p className="text-lg mb-4 text-pretty">
        Sign up and be the first to know about new features and updates!{" "}
      </p>

      <label htmlFor="email">Email Address</label>
      <div className="flex mt-1">
        <input
          className="min-w-0 flex-auto rounded-md bg-white/10 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-white/75 focus:outline-2 focus:-outline-offset-2 focus:outline-white sm:text-sm/6"
          id="email"
          type="text"
          name="email"
          placeholder="e.g. email@domain.com"
          required
        />
        <button
          aria-label="Email Signup"
          className="inline-flex items-center ml-1 py-2 px-4 rounded-md bg-white hover:bg-indigo-50 text-indigo-800 dark:text-indigo-900 border-transparent"
          type="submit"
          disabled={state.submitting}
        >
          <FontAwesomeIcon icon={faPaperPlane} className="text-lg" />
        </button>
      </div>
      <p className="mt-1 text-slate-200 text-pretty text-xs">
        *you will not be added to a mailing list, for testing only
      </p>
      <ValidationError
        className="mt-1 text-red-500"
        prefix="Email Address"
        field="email"
        errors={state.errors}
      />
      <ValidationError className="text-red-500" errors={state.errors} />
    </form>
  );
}
