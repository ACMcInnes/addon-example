import { getUser } from '@/data/user';
import { pollNeto } from '@/data/neto';

export default async function Profile() {

  const user = await getUser();
  const neto = await pollNeto();

  return (
    <div className="flex flex-col place-items-center pb-8">
      <p>G&apos;day {user.name}</p>
      <p>{user.email}</p>
    </div>
  );
}
