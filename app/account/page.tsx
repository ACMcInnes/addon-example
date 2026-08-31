import Profile from "@/components/account/profile";
import { Suspense } from "react";

export default async function Account() {

  return (
    <Suspense fallback={<p>loading account...</p>}>
      <Profile />
    </Suspense>
  );
}