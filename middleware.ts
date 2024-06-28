// export { auth as middleware } from "@/auth"

import { NextResponse, type NextMiddleware, type NextRequest } from "next/server";
import { encode, getToken, type JWT } from "@auth/core/jwt";

const BASE_URL = "https://api.netodev.com/oauth/v2";
const SIGNIN_SUB_URL = "/neto/login?type=webstore";
const SESSION_TIMEOUT = 600; // 10 minutes
const TOKEN_REFRESH_BUFFER_SECONDS = 100; // 1 minute
const SESSION_SECURE = process.env.NODE_ENV !== "development";
const SESSION_COOKIE = SESSION_SECURE ? "__Secure-authjs.session-token" : "authjs.session-token";

let isRefreshing = false;

export function shouldUpdateToken(token: JWT): boolean {
	const timeInSeconds = Math.floor(Date.now() / 1000);
    const expiryInSeconds = token?.expires_at as number - TOKEN_REFRESH_BUFFER_SECONDS;
    console.log(`token valid for ${expiryInSeconds - timeInSeconds} seconds`)
	return timeInSeconds >= expiryInSeconds;
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
			expires_at: newTokens?.expires_in + timeInSeconds,
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

	if (sessionToken) {
        // Set the session token in the request and response cookies for a valid session
        // split session into chunks if needed
        const size = 4000; // maximum size of each chunk
        const regex = new RegExp('.{1,' + size + '}', 'g');
        const tokenChunks = sessionToken.match(regex);
    
        if (tokenChunks) {
            tokenChunks.forEach((tokenChunk, index) => {
                request.cookies.set(`${SESSION_COOKIE}.${index}`, tokenChunk);
            });
        } else {
            request.cookies.set(SESSION_COOKIE, sessionToken);
        }

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


export const middleware: NextMiddleware = async (request: NextRequest) => {

    console.log(`middleware running`)
    console.log(`session cookie: ${SESSION_COOKIE}`)

	const token = await getToken({
        req: request,
        salt: SESSION_COOKIE,
		secret: `${process.env.AUTH_SECRET}`,
        secureCookie: SESSION_SECURE,
        cookieName: SESSION_COOKIE
    });

    const path = request.nextUrl.pathname;
	let response = NextResponse.next();

    if (!token && path !== SIGNIN_SUB_URL) {
        console.log(`Token missing, redirecting to login`)
        return NextResponse.redirect(new URL(SIGNIN_SUB_URL, request.nextUrl.origin));
    }
	if (!token) {
        // fallback - this probably won't ever run as login doesn't run through middleware
        console.log(`Token missing and already on login, redirect home`)
		return NextResponse.redirect(new URL('/', request.nextUrl.origin));
	}

    console.log(`AuthJS token updating: ${shouldUpdateToken(token)}`)

	if (shouldUpdateToken(token)) {
		try {

            const newSessionToken = await encode({
                salt: SESSION_COOKIE,
				secret: `${process.env.AUTH_SECRET}`,
				token: await refreshAccessToken(token),
				maxAge: SESSION_TIMEOUT
			});
     
			response = updateCookie(newSessionToken, request, response);
            console.log(`middleware cookies updated`)

		} catch (error) {
			console.log("middleware cookie error: ", error);
			return updateCookie(null, request, response);
		}
	}

    console.log(`middleware finished`)
	return response;
};

export const config = {
	matcher: ["/dashboard/:path*"]
};
