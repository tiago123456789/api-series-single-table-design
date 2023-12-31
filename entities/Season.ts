import { Base } from './Base';
import { getClient } from '../config/Dynamodb';

export default class Season extends Base {
  name: string | undefined;

  serieId: string | undefined;

  constructor(name: string | undefined, serieId: string | undefined) {
    super();
    this.name = name;
    this.serieId = serieId;
  }

  get pk(): string {
    return `Series#${this.serieId}`;
  }

  get sk(): string {
    const currentTmeInMilleseconds = new Date().getTime();
    return `Season#${currentTmeInMilleseconds}`;
  }

  toItem(): Record<string, unknown> {
    return {
      ...this.keys(),
      name: { S: this.name },
    };
  }

  async hasSeasonById(id: string): Promise<boolean> {
    try {
      const client = getClient();
      // @ts-ignore
      const registers = await client
        .query({
          // @ts-ignore
          TableName: process.env.TABLE_NAME,
          KeyConditionExpression: 'PK = :pk and SK = :sk',
          ExpressionAttributeValues: {
            ':pk': { S: this.pk },
            ':sk': { S: id },
          },
        })
        .promise();

      return (registers.Items?.length as number) > 0;
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
          TableName: process.env.TABLE_NAME,
          Item: this.toItem(),
        })
        .promise();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async update(sk: string, serie: Season) {
    try {
      const client = getClient();
      const keys = this.keys();
      keys.SK.S = sk;

      // @ts-ignore
      await client
        .updateItem({
          // @ts-ignores
          TableName: process.env.TABLE_NAME,
          Key: keys,
          UpdateExpression: 'SET #name = :name',
          ExpressionAttributeNames: {
            '#name': 'name',
          },
          ExpressionAttributeValues: {
            ':name': { S: serie.name },
          },
        })
        .promise();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
