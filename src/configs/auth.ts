import { env } from "../env"

export const authConfig = {
    jwt: {
        secret: String(env.JWT_SECRET), // Garante que seja uma string
        expiresIn: "1d"
    }
};
