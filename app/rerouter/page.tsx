import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function ReRouter(
  props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  }
) {
  const searchParams = await props.searchParams;

  // used for initial login to ensure session exists before running through middleware

  const session = await auth();
  const referrer = searchParams.referrer ?? "";

  if (session) {
    if (referrer) {
      console.log(`referrer found, redirecting to: "/${referrer}"`);
      redirect(`/${referrer}`);
    } else {
      console.log(`no referrer, redirecting to dashboard`);
      redirect(`/dashboard?routed=true`);
    }
  } else {
    console.log(`no session, redirecting to login...`);
    redirect(`/neto/login?type=webstore&routed=true`);
  }
}
