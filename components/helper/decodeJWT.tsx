import jwt from "jsonwebtoken";

export default async function decodeJWT(data: string) {
    try {
        const decoded = jwt.verify(data, `${process.env.JWT_SECRET}`);
        return decoded;        
    } catch (e) {
        throw new Error(`${e}`)
    }
}