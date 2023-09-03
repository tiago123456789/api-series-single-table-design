import ErrorCodeMessage from '../../../config/ErrorCodeMessage';
import AuthRepositoryInterface from '../../../repositories/Auth.interface';
import AuthService from '../../../services/Auth';
import { EncrypterInterface } from '../../../utils/Encrypter';
import { TokenInterface } from '../../../utils/Token';

describe('AuthService unit tests', () => {
  let authRepository: jest.Mocked<AuthRepositoryInterface>;
  let encrypter: jest.Mocked<EncrypterInterface>;
  let token: jest.Mocked<TokenInterface>;

  beforeEach(() => {
    authRepository = {
      findByEmail: jest.fn(),
      register: jest.fn(),
    };
    encrypter = {
      compare: jest.fn(),
      getHash: jest.fn(),
    };
    token = {
      get: jest.fn(),
      isValid: jest.fn(),
    };
  });

  it('Should be register user with success', async () => {
    const authService = new AuthService(authRepository, encrypter, token);

    await authService.register('test@gmail.com', '123456789teste');

    expect(authRepository.register).toBeCalledTimes(1);
    expect(encrypter.getHash).toBeCalledTimes(1);
  });

  it('Should be throw exception when try login and email is invalid', async () => {
    try {
      const authService = new AuthService(authRepository, encrypter, token);

      authRepository.findByEmail.mockReturnValue(Promise.resolve(null));
      await authService.login('test@gmail.com', '123456789teste');
    } catch (error: any) {
      expect(error.message).toBe(ErrorCodeMessage.INVALID_CREDENTIAL);
    }
  });

  it('Should be throw exception when try login and password is invalid', async () => {
    try {
      const authService = new AuthService(authRepository, encrypter, token);

      authRepository.findByEmail.mockReturnValue(
        Promise.resolve({
          email: 'test@gmail.com',
          password: '154785',
        }),
      );
      encrypter.compare.mockReturnValue(Promise.resolve(false));
      await authService.login('test@gmail.com', '123456789teste');
    } catch (error: any) {
      expect(error.message).toBe(ErrorCodeMessage.INVALID_CREDENTIAL);
    }
  });

  it('Should be login success', async () => {
    const authService = new AuthService(authRepository, encrypter, token);

    authRepository.findByEmail.mockReturnValue(
      Promise.resolve({
        email: 'test@gmail.com',
        password: '154785',
      }),
    );
    encrypter.compare.mockReturnValue(Promise.resolve(true));
    await authService.login('test@gmail.com', '123456789teste');
    expect(authRepository.findByEmail).toBeCalledTimes(1);
    expect(encrypter.compare).toBeCalledTimes(1);
    expect(token.get).toBeCalledTimes(1);
  });
});
