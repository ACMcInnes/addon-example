"use client";

import { authClient } from '@/lib/auth-client';

export default function getUser() {

  const { data: session, isPending, error } = authClient.useSession();

  if (isPending) return <p>Loading…</p>;
  if (error || !session) return <p>Signed out</p>;

  return (
    <div className="flex flex-col place-items-center pb-8">
      <p>G&apos;day {session.user.name}</p>
    </div>
  );
}