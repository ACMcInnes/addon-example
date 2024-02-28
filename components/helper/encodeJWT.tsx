import jwt from "jsonwebtoken";

export default async function encodeJWT(data: JSON) {
    const token = jwt.sign(data, `${process.env.JWT_SECRET}`, { expiresIn: "7d" });
    return token;
}