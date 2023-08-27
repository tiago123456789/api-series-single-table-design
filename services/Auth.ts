import ErrorCodeMessage from "../config/ErrorCodeMessage";
import User from "../entities/User";
import Encrypter from "../utils/Encrypter";
import Token from "../utils/Token";

class AuthService {

    constructor(
        private readonly user: User,
        private readonly encrypter: Encrypter,
        private readonly token: Token
    ) { }

    async register(email: string, password: string): Promise<void> {
        password = await this.encrypter.getHash(password)
        this.user.email = email;
        this.user.password = password;
        await this.user.create()
    }

    async login(email: string, password: string) {
        const user: User = new User(
            email,
            password
        )

        const userByEmail = await user.findByEmail(email);

        if (!userByEmail) {
            throw new Error(ErrorCodeMessage.INVALID_MESSAGE);
        }

        const isValidPassword = await this.encrypter.compare(
            password,
            (userByEmail.password as string)
        );

        if (!isValidPassword) {
            throw new Error(ErrorCodeMessage.INVALID_MESSAGE);
        }

        const accessToken = await this.token.get({
            email: email
        })

        return accessToken;
    }
}

export default AuthService;