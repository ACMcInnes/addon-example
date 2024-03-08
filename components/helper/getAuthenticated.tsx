import decodeJWT from "@/components/helper/decodeJWT";
import getCookie from "@/components/helper/getCookie";

export default async function getAuthenticated() {
  interface JwtPayload {
    scope: string;
    api_id: string;
    token_type: string;
    expires_in: number;
    access_token: string;
    refresh_token: string;
    iat: number;
    exp: number;
  }

  const jwtCookieChunkA = getCookie("neto_oauth_a");
  const jwtCookieChunkB = getCookie("neto_oauth_b");
  const jwtCookie = `${jwtCookieChunkA}${jwtCookieChunkB}`;

  if (jwtCookie) {
    const oauth = (await decodeJWT(jwtCookie)) as JwtPayload;
    return oauth;
  } else {
    throw new Error(`Unable to authenticate. Please login again`);
  }
}
