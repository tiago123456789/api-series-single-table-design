import { Base } from './Base';
import { getClient } from '../config/Dynamodb';

export default class User extends Base {
  email: string | undefined;

  password: string | undefined;

  constructor(email: string | undefined, password: string | undefined) {
    super();
    this.email = email;
    this.password = password;
  }

  get pk(): string {
    return `User#${this.email}`;
  }

  get sk(): string {
    const currentTmeInMilleseconds = new Date().getTime();
    return `${currentTmeInMilleseconds}`;
  }

  toItem(): Record<string, unknown> {
    return {
      ...this.keys(),
      email: { S: this.email },
      password: { S: this.password },
    };
  }

  async findByEmail() {
    try {
      const client = getClient();
      // @ts-ignore
      const registers = await client
        .query({
          TableName: 'MoviesTable',
          KeyConditionExpression: 'PK = :pk',
          ExpressionAttributeValues: {
            ':pk': { S: this.pk },
          },
        })
        .promise();

      if (!registers?.Items || registers.Items.length === 0) {
        return null;
      }
      const user = registers?.Items[0];
      const email = user.PK.S?.split('#')[1];
      return {
        password: user.password.S,
        email,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async create() {
    try {
      const client = getClient();
      // @ts-ignore
      await client
        .putItem({
          // @ts-ignore
          TableName: 'MoviesTable',
          Item: this.toItem(),
        })
        .promise();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async update(sk: string, user: User) {
    try {
      const client = getClient();
      const keys = this.keys();
      keys.SK.S = sk;

      // @ts-ignore
      await client
        .updateItem({
          TableName: 'MoviesTable',
          Key: keys,
          UpdateExpression: 'SET #email = :email',
          ExpressionAttributeNames: {
            '#email': 'email',
          },
          ExpressionAttributeValues: {
            ':email': { S: user.email },
          },
        })
        .promise();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
