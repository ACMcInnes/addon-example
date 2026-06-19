import { createAuthClient } from "better-auth/react";
import { genericOAuthClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: "https://auth.mcinnes.design",
  advanced: {
    cookiePrefix: "mcinnes-auth",
    crossSubDomainCookies: {
      enabled: process.env.VERCEL_ENV === "production" || process.env.NODE_ENV === "production",
      domain: "mcinnes.design",
    },
  },
  logger: {
    level:
      process.env.VERCEL_ENV === "development" ||
      process.env.NODE_ENV === "development"
        ? "debug"
        : "warn",
  },
  plugins: [
    genericOAuthClient()
  ],
  fetchOptions: {
    credentials: 'include',
    onError: async (context) => {
      const { response } = context;
      if (response.status === 429) {
        const retryAfter = response.headers.get("X-Retry-After");
        console.log(`Rate limit exceeded. Retry after ${retryAfter} seconds`);
        throw new Error('Request blocked, try again later...')
      }
    },
  },
});
