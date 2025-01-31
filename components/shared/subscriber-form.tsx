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
    <form className="flex flex-col w=full sm:w-10/12 md:w-full lg:w-9/12" onSubmit={handleSubmit}>
      <label htmlFor="email">Email Address</label>
      <div className="flex mt-1">
      <input className="inline-flex grow rounded-md bg-indigo-600 dark:bg-indigo-700 border-transparent text-white focus:border-gray-100 focus:bg-indigo-800 dark:focus:bg-indigo-900 focus:ring-0 placeholder:text-gray-300" id="email" type="text" name="email" placeholder="e.g. email@domain.com" required />
      <button className="inline-flex items-center ml-1 py-2 px-4 rounded-md text-gray-100 bg-blue-500 hover:bg-blue-400 border-transparent" type="submit" disabled={state.submitting}>
      <FontAwesomeIcon icon={faPaperPlane} className="text-lg" />
      </button>
      </div>
      <ValidationError className="mt-1 text-red-500" prefix="Email Address" field="email" errors={state.errors} />
      <ValidationError className="text-red-500" errors={state.errors} />
      <p className="mt-1 text-slate-200 text-pretty">Sign up for addon updates and be the first to know about new features! <span className="text-xs text-slate-400">*you will not be added to a mailing list, for testing only</span></p>
    </form>
  );
}