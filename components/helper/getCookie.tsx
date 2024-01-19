import { cookies } from "next/headers";

export default function getCookie(name: string) {
    const cookieStore = cookies();
    const cookie = cookieStore.get(name);
    if (cookie) {
        return cookie.value;
    } else {
        throw new Error(`Unable to access cookie: ${name}. Please authenticate again`)
    }
}