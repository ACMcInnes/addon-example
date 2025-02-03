const API_ENDPOINT = "https://api.netodev.com/v2/stores/";

export default async function getContentTypes(webstore: string, secret: string) {
  // webstore and secret passed from AuthJS
  // GET request should be cached automatically?
  const res = await fetch(`${API_ENDPOINT}${webstore}/content-types`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${secret}`,
      "Content-Type": "application/json",
    },
    //body: `{}`,
  });
 
  console.log(`GET CONTENT TYPES RESPONSE:`);
  console.log(`${res.status} - ${res.statusText}`);

  if (!res.ok || res.status !== 200) {
    console.log('Failed to fetch webstore content types')
    // This will activate the closest `error.js` Error Boundary
    throw new Error(`Failed to fetch data: ${res.statusText}`);
  }
  return res.json()
}