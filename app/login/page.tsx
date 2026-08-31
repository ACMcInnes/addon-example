"use client";

import { authClient } from '@/lib/auth-client';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default function Login() {

  const { data: session, isPending, error } = authClient.useSession();

  if (isPending) return <p>Loading…</p>;
  if (session) redirect('/better-auth-server-test');

  return (
    <div className="flex flex-col place-items-center pb-8">
      <h1 className="mx-auto text-center mt-2 text-balance text-4xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
        Account Login
      </h1>
      <p className="mt-10">Looks like your session has expired, or maybe you are checking things out for the first time. Hi!</p>
      <Link href={`//auth.mcinnes.design`} className="group block mt-8 mb-4 py-3 px-8 rounded-md bg-indigo-600 text-white dark:bg-indigo-500 border-transparent">
        Login{" "}
        <FontAwesomeIcon className="inline-block transition-transform group-hover:translate-x-2 motion-reduce:transform-none" icon={faArrowRight} />
      </Link>
    </div>   
  );
}
