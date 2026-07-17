'use server'
import { isAuth } from "./auth"

type Auth = {
  session: {
    expiresAt: Date,
    token: string,
    createdAt: Date,
    updatedAt: Date,
    ipAddress: string,
    userAgent: string,
    userId: string,
    id: string
  },
  user: {
    name: string,
    email: string,
    emailVerified: boolean,
    image: string | null,
    createdAt: Date,
    updatedAt: Date,
    id: string
  }
}

export async function getUser() {
  const auth = await isAuth() as Auth;

  return {
    name: auth.user.name,
    email: auth.user.email
  }
} 
