"use client";

import { authClient } from '@/lib/auth-client';

export default async function getUser() {


  const { data: session, isPending, error } = authClient.useSession();

  if (isPending) return <div>Loading…</div>;
  if (error || !session) return <div>Signed out</div>;

  return <div>Hello {session.user.name}</div>;

  
}