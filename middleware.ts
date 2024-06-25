// export { auth as middleware } from "@/auth"

import { auth } from "@/auth"
import { NextResponse, type NextMiddleware, type NextRequest } from "next/server";
import { encode, getToken, type JWT } from "@auth/core/jwt";

const BASE_URL = "https://api.netodev.com/oauth/v2";
const SIGNIN_SUB_URL = "/neto/login?type=webstore";
const SESSION_TIMEOUT = 600; // 10 minutes
const TOKEN_REFRESH_BUFFER_SECONDS = 100; // 1 minute
const SESSION_SECURE = process.env.NODE_ENV === "production";
const SESSION_COOKIE = SESSION_SECURE ? "__Secure-authjs.session-token" : "authjs.session-token";

let isRefreshing = false;

export function shouldUpdateToken(token: JWT): boolean {
	const timeInSeconds = Math.floor(Date.now() / 1000);
    console.log(`${timeInSeconds} >= (${token?.expires_at as number} - ${TOKEN_REFRESH_BUFFER_SECONDS});`);
	return timeInSeconds >= (token?.expires_at as number - TOKEN_REFRESH_BUFFER_SECONDS);
}

export async function refreshAccessToken(token: JWT): Promise<JWT> {
	if (isRefreshing) {
		return token;
	}

	const timeInSeconds = Math.floor(Date.now() / 1000);
	isRefreshing = true;

	try {
        const response = await fetch(`${BASE_URL}/token?version=2`, {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            method: "POST",
            body: new URLSearchParams({
              client_id: process.env.CLIENT_ID as string,
              client_secret: process.env.CLIENT_SECRET as string,
              grant_type: "refresh_token",
              refresh_token: token?.refresh_token as string,
            }),
          })

		const newTokens = await response.json();

		if (!response.ok) {
			throw new Error(`Token refresh failed with status: ${response.status}`);
		}

		return {
			...token,
			access_token: newTokens?.access_token ?? token?.access_token,
			expires_at: newTokens?.expires_at ?? timeInSeconds,
			refresh_token: newTokens?.refresh_token ?? token?.refresh_token
		};
	} catch (e) {
		console.error(e);
	} finally {
		isRefreshing = false;
	}

	return token;
}

export function updateCookie(
	sessionToken: string | null,
	request: NextRequest,
	response: NextResponse
): NextResponse<unknown> {
	/*
	 * BASIC IDEA:
	 *
	 * 1. Set request cookies for the incoming getServerSession to read new session
	 * 2. Updated request cookie can only be passed to server if it's passed down here after setting its updates
	 * 3. Set response cookies to send back to browser
	 */

	if (sessionToken) {


        const size = 4096; // maximum size of each chunk
        const regex = new RegExp('.{1,' + size + '}', 'g');
    
        // split the string into an array of strings
        const tokenChunks = sessionToken.match(regex);
    
        if (tokenChunks) {
            tokenChunks.forEach((tokenChunk, index) => {
                console.log(`session cookie chunked: ${index} index`)
                request.cookies.set(`${SESSION_COOKIE}.${index}`, tokenChunk);
            });
        } else {
            request.cookies.set(SESSION_COOKIE, sessionToken);
        }




		// Set the session token in the request and response cookies for a valid session
		response = NextResponse.next({
			request: {
				headers: request.headers
			}
		});

        if (tokenChunks) {
            tokenChunks.forEach((tokenChunk, index) => {
                response.cookies.set(`${SESSION_COOKIE}.${index}`, tokenChunk, {
                  httpOnly: true,
                  maxAge: SESSION_TIMEOUT,
                  secure: SESSION_SECURE,
                  sameSite: SESSION_SECURE ? "strict" : "lax"
                });
              });
        } else {
            response.cookies.set(SESSION_COOKIE, sessionToken, {
                httpOnly: true,
                maxAge: SESSION_TIMEOUT,
                secure: SESSION_SECURE,
                sameSite: SESSION_SECURE ? "strict" : "lax"
            });
        }

        console.log(`TOKEN REFRESH SUCCESSFUL...`);

	} else {
        console.log(`TOKEN CANNOT BE REFRESHED...`);

        request.cookies.getAll().forEach((cookie) => {
            if (cookie.name.includes("authjs")) request.cookies.delete(cookie.name);
        });
		return NextResponse.redirect(new URL(SIGNIN_SUB_URL, request.url));
	}

	return response;
}

export default auth(async (request) => {
	const token = await getToken({
        req: request,
        salt: SESSION_COOKIE,
		secret: `${process.env.AUTH_SECRET}`,
    });

    console.log(`AUTH TOKEN:`)
    console.log(token)

	let response = NextResponse.next();

	if (!token) {
		return NextResponse.redirect(new URL(SIGNIN_SUB_URL, request.nextUrl.origin));
	}

    console.log(`is token updating: ${shouldUpdateToken(token)}`)

	if (shouldUpdateToken(token)) {
		try {

            const newSessionToken = await encode({
                salt: SESSION_COOKIE,
				secret: `${process.env.AUTH_SECRET}`,
				token: await refreshAccessToken(token),
				maxAge: SESSION_TIMEOUT
			});

			response = updateCookie(newSessionToken, request, response);
		} catch (error) {
			console.log("Error refreshing token: ", error);
			return updateCookie(null, request, response);
		}
	}

	return response;
});

export const config = {
	matcher: ["/dashboard/:path*"]
};