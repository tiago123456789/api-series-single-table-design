import jwt from 'jsonwebtoken';

export interface PayloadToken {
  email: string;
}

export interface TokenInterface {
  isValid(token: string): Promise<boolean>;
  get(payload: PayloadToken): string;
}

class Token implements TokenInterface {
  async isValid(token: string) {
    try {
      // @ts-ignore
      await jwt.verify(token, process.env.JWT_SECRET);
      return true;
    } catch (error) {
      return false;
    }
  }

  get(payload: PayloadToken) {
    // @ts-ignore
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
  }
}

export default Token;
