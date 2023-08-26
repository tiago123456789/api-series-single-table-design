import jwt from "jsonwebtoken"

export interface PayloadToken {
    email: string
}

class Token {

    get(payload: PayloadToken) {
        // @ts-ignore
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" })
    }
}

export default Token;