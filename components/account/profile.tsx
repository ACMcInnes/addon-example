import { getUser } from '@/data/user';
import { netoRequest } from '@/data/neto';

export default async function Profile() {

  const user = await getUser();
  const staff = await netoRequest({request: 'users', filter: `?username=${user.username}`});
  const webstore = await netoRequest({request: 'properties'});
  const items = await netoRequest({request: 'getitem', data:'{ "Filter": { "Visible": ["True"], "IsActive": ["True"], "Page": "0", "Limit": "100", "OutputSelector": ["Model"] }}'});

  console.log(`STAFF`)
  console.log(staff)

  console.log(`WEBSTORE`)
  console.log(webstore)

  console.log(`ITEMS`)
  console.log(items)

  return (
    <div className="flex flex-col place-items-center pb-8">
      <p>G&apos;day {user.name}</p>
      <p>{user.email}</p>
    </div>
  );
}
