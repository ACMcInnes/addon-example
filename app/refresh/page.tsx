import { redirect } from "next/navigation";

export default function Refresh({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const referrer = searchParams.referrer ?? "";

  //console.log(`search params...`);
  //console.log(referrer);

  if (referrer) {
    console.log(`referrer found, setting`);
    redirect(`/neto/callback?refresh=y&referrer=${referrer}`);
  } else {
    console.log(`no referrer, setting default`);
    redirect(`/neto/callback?refresh=y`);
  }
}
