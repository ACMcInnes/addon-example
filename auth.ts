import NextAuth, { DefaultSession } from "next-auth"
 
const BASE_URL = "https://api.netodev.com/oauth/v2";

export const { handlers, signIn, signOut, auth } = NextAuth({
    debug: process.env.NODE_ENV !== "production",
    providers: [{
        id: "neto",
        name: "Neto",
        type: "oidc", // "oidc" for OpenID or "oauth" for OAuth 2 providers
        issuer: "https://api.netodev.com",
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,

        client: {
            token_endpoint_auth_method: "client_secret_post",
            userinfo_signed_response_alg: "RS256",
        },
        
        authorization: {
            url: `${BASE_URL}/auth?version=2`,
            params: { store_domain: "keylime.neto.com.au", response_type: "code" },
        },

        checks: ["state"],
        
        //token: `${BASE_URL}/token?version=2`,

        token: {
            url: `${BASE_URL}/token?version=2`,
            async request(context: { provider: { clientId: string; clientSecret: string; callbackUrl: any; }; params: { code: string; }; }) {
              const response = await fetch(`${BASE_URL}/token?version=2`, {
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                method: "POST",
                body: new URLSearchParams({
                  client_id: context.provider.clientId as string,
                  client_secret: context.provider.clientSecret as string,
                  grant_type: "authorization_code",
                  code: context.params.code as string,
                  redirect_uri: context.provider.callbackUrl,
                }),
              })
              return { tokens: await response.json() }
            },
        },

        userinfo: {
            url: `https://api.netodev.com/v2/stores`,
            async request({ tokens, provider }: any) {
                const url = `${provider.userinfo?.url}/${tokens.api_id}/users?username=${tokens.username}`
              const profile = await fetch(url, {
                headers: {
                  Authorization: `Bearer ${tokens.access_token}`,
                  "Content-Type": "application/json",
                },
              }).then(async (res) => await res.json())
      
              return profile.result
            },
          },
          profile(profile) {
            return {
              id: profile.sub,
              name: profile.name ?? profile.username,
              email: profile.email,
              image: profile.image ?? "https://source.boringavatars.com/beam/120",
            }
        },
    }],

    callbacks: {
        //authorized({ request, auth }) {
        //   const { pathname } = request.nextUrl
        //   if (pathname === "/middleware-example") return !!auth
        //   return true
        // },
        async redirect({ url, baseUrl }) {
            console.log(`url: ${url}`)
            console.log(`base url: ${baseUrl}`)
            // Allows relative callback URLs
            if (url.startsWith("/")) return `${baseUrl}${url}`
         
            // Allows callback URLs on the same origin
            if (new URL(url).origin === baseUrl) return url
         
            return baseUrl
        },
        async jwt({ token, trigger, session, account }) {
          //if (trigger === "update") token.name = session.user.name
          if (account?.provider === "neto") {
            console.log(`auth token expires: ${account.expires_at}`)
            return { ...token, access_token: account.access_token, expires_at: account.expires_at, refresh_token: account.refresh_token, webstore_api_id: account.api_id }
          }
          return token
        },
        async session({ session, token }) {
          if (token?.access_token) {
            session.access_token = token.access_token as string
          }
          if (token?.webstore_api_id) {
            session.webstore_api_id = token.webstore_api_id as string
          }
          if (token?.expires_at) {
            session.expires_at = token.expires_at as number
          }
          if (token?.refresh_token) {
            session.refresh_token = token.refresh_token as string
          }

          console.log(`auth session created`)

          return session
        },
      },

    
})

declare module 'next-auth' {
    interface Session extends DefaultSession {
      access_token?: string;
      refresh_token?: string;
      webstore_api_id?: string;
      expires_at?: number;
    }
}
  
// http://localhost:3000/neto/login?type=webstore
// look into automating token refresh: https://authjs.dev/guides/refresh-token-rotation
