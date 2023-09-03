import ErrorCodeMessage from '../config/ErrorCodeMessage';
import AuthRepositoryInterface from '../repositories/Auth.interface';
import { EncrypterInterface } from '../utils/Encrypter';
import { TokenInterface } from '../utils/Token';

class AuthService {
  constructor(
    private readonly authRepository: AuthRepositoryInterface,
    private readonly encrypter: EncrypterInterface,
    private readonly token: TokenInterface,
  ) {}

  async register(email: string, password: string): Promise<void> {
    const passwordHash = await this.encrypter.getHash(password);
    await this.authRepository.register(email, passwordHash);
  }

  async login(email: string, password: string) {
    const userByEmail = await this.authRepository.findByEmail(email);

    if (!userByEmail) {
      throw new Error(ErrorCodeMessage.INVALID_CREDENTIAL);
    }

    const isValidPassword = await this.encrypter.compare(
      password,
      userByEmail.password as string,
    );

    if (!isValidPassword) {
      throw new Error(ErrorCodeMessage.INVALID_CREDENTIAL);
    }

    const accessToken = await this.token.get({
      email,
    });

    return accessToken;
  }
}

export default AuthService;
