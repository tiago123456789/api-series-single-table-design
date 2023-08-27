import jwt from "jsonwebtoken"

export interface PayloadToken {
    email: string
}

class Token {

    async isValid(token: string) {
        try {
            // @ts-ignore
            await jwt.verify(token, process.env.JWT_SECRET)
            return true;
        } catch (error) {
            return false
        }
    }

    get(payload: PayloadToken) {
        // @ts-ignore
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" })
    }
}

export default Token;