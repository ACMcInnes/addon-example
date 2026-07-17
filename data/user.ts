'use server'
import { isAuth } from "./auth"

export async function getUser() {
  const session = await isAuth();

  console.log(`SESSION`)
  console.log(session)

  return session.map((data: { user: { id: string; name: string; email: string; emailVerified: boolean; image: string; createdAt: string; updatedAt: string }; }) => ({
    name: data.user.name,
    email: data.user.email
  }))
} 
