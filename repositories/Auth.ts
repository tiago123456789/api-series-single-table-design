import User from '../entities/User';
import AuthRepositoryInterface from './Auth.interface';

class AuthRepository implements AuthRepositoryInterface {
  constructor(private readonly user: User) {}

  async register(email: string, password: string): Promise<void> {
    this.user.email = email;
    this.user.password = password;
    await this.user.create();
  }

  async findByEmail(email: string): Promise<any> {
    const user: User = new User(email, undefined);

    return user.findByEmail(email);
  }
}

export default AuthRepository;
