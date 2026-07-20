'use server'
import { headers } from 'next/headers';
import { isAuth } from "./auth"

type Endpoint = {
  name: string;
  version: 'v1' | 'v2';
  url: string;
};

const ENDPOINTS: Record<string, Endpoint> = {
  'getitem': {
    'name': 'GetItem',
    'version': 'v1',
    'url': '/do/WS/NetoAPI'
  },
  'properties': {
    'name': 'GetStoreProperties',
    'version': 'v2',
    'url': '/properties'
  },
  'users': {
    'name': 'GetUsers',
    'version': 'v2',
    'url': '/users'
  }

}

export const getTokenContext = async () => {
  const h = await headers();
  const cookie = h.get("cookie") ?? "";

  const tokenRes = await fetch(
    "https://auth.mcinnes.design/api/auth/get-access-token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cookie,
        origin: "https://neto.mcinnes.design",
      },
      body: JSON.stringify({ providerId: "neto" }),
      cache: "no-store",
    }
  );

  return tokenRes.ok ? await tokenRes.json() : null;
}

export async function netoRequest({request, data, filter}: {request: string, data?: string, filter?: string}) {
  const auth = await isAuth(); // if not authorised, will error out - don't need to handle here
  const token = await getTokenContext();

  console.log(`SESSION`)
  console.log(auth)
  console.log(`TOKEN`)
  console.log(token)

  if (!token) {
    throw new Error("Unauthorised: Accounting missing API Access")
  }

  const [ apiId, username ] = auth.user.subject.split(':')

  console.log(`API ID`)
  console.log(apiId)
  console.log(`USERNAME`)
  console.log(username)

  const endpoint = ENDPOINTS[request]

  const netoRes = await fetch(
    `https://api.netodev.com/${endpoint.version}/stores/${endpoint.url}${filter ? filter : ''}`, 
    {
      method: endpoint.version === 'v1' ? "POST" : "GET",
      headers: {
        "Authorization": `Bearer ${token.accessToken}`,
        "Content-Type": "application/json",
        ...(endpoint.version === 'v1' && { "NETO_ACTION": `${endpoint.name}` })
      },
      ...(data && {body: data}),
      next: { revalidate: 600 } // cache for 10
    }
  );

  console.log(`NETO`)
  console.log(netoRes)
  
  return netoRes.ok ? await netoRes.json() : null;

}