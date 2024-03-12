"use client"

import { useForm, ValidationError } from "@formspree/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

export default function SubscriberForm() {
    const [state, handleSubmit] = useForm(`${process.env.NEXT_PUBLIC_FORM}`);

  if (state.succeeded) {
    return <p>Thanks for your submission!</p>;
  }

  return (
    <form className="flex flex-col w-10/12 md:w-full lg:w-9/12 xl:w-8/12 2xl:w-6/12" onSubmit={handleSubmit}>
      <label htmlFor="email">Email Address</label>
      <div className="flex mt-1">
      <input className="inline-flex flex-grow rounded-md bg-gray-200 border-transparent text-black dark:text-white focus:border-gray-500 focus:bg-white focus:ring-0 dark:bg-gray-600 dark:focus:border-gray-100 dark:focus:bg-zinc-900 dark:placeholder:text-gray-400" id="email" type="text" name="email" placeholder="email@domain" required />
      <button className="inline-flex items-center ml-1 py-2 px-4 rounded-md text-gray-100 bg-sky-500 border-transparent" type="submit" disabled={state.submitting}>
      <FontAwesomeIcon icon={faPaperPlane} className="text-lg" />
      </button>
      </div>
      <ValidationError className="mt-1 text-red-500" prefix="Email Address" field="email" errors={state.errors} />
      <ValidationError className="text-red-500" errors={state.errors} />
      <p className="mt-1">Sign up for addon updates and be the first to know about new features! <span className="text-xs text-gray-500">*you will not be added to a mailing list, for testing only</span></p>
    </form>
  );
}