import bcryptjs from 'bcryptjs';

export interface EncrypterInterface {
  getHash(value: string): Promise<string>;
  compare(value: string, hash: string): Promise<boolean>;
}

class Encrypter implements EncrypterInterface {
  getHash(value: string): Promise<string> {
    return bcryptjs.hash(value, 8);
  }

  compare(value: string, hash: string): Promise<boolean> {
    return bcryptjs.compare(value, hash);
  }
}

export default Encrypter;
