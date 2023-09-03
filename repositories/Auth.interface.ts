import User from "../entities/User";

interface AuthRepositoryInterface {

    register(email: string, password: string): Promise<void>;
    findByEmail(email: string): Promise<any>;
}

export default AuthRepositoryInterface