"use client"

import { useForm, ValidationError } from "@formspree/react";

export default function ContactForm() {
    const [state, handleSubmit] = useForm(`${process.env.NEXT_PUBLIC_CONTACT_FORM}`);

  if (state.succeeded) {
    return <p>Thanks for your submission!</p>;
  }

  return (
    <form className="flex flex-col w-full md:w-8/12 lg:w-4/12" onSubmit={handleSubmit}>
      <label className="mt-2" htmlFor="full-name">Full Name</label>
      <input className="mt-1 rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 dark:bg-gray-600 dark:focus:border-gray-100 dark:focus:bg-zinc-900 dark:placeholder:text-gray-400" id="full-name" type="text" name="name" placeholder="First and Last" required />
      <ValidationError prefix="Name" field="name" errors={state.errors} />  
      <label className="mt-2" htmlFor="email">Email Address</label>
      <input className="mt-1 rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 dark:bg-gray-600 dark:focus:border-gray-100 dark:focus:bg-zinc-900 dark:placeholder:text-gray-400" id="email" type="email" name="email" placeholder="email@domain" required />
      <ValidationError prefix="Email" field="email" errors={state.errors} />
      <label className="mt-2" htmlFor="message">Message</label>
      <textarea className="mt-1 rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 dark:bg-gray-600 dark:focus:border-gray-100 dark:focus:bg-zinc-900 dark:placeholder:text-gray-400" id="message" name="message" placeholder="What did you want to know?" required />
      <ValidationError prefix="Message" field="message" errors={state.errors} />
      <button type="submit" disabled={state.submitting} className="mt-2 py-2 px-4 rounded-md text-gray-100 bg-sky-500 border-transparent">
        Submit
      </button>
      <ValidationError errors={state.errors} />
    </form>
  );
}