import { getUser } from '@/data/user';

export default async function Profile() {

  const user = await getUser();

  return (
    <div className="flex flex-col place-items-center pb-8">
      <p>G&apos;day {user.name} {user.email}</p>
    </div>
  );
}
