import { randomUUID } from 'crypto';
import { Base } from './Base';
import { getClient } from '../config/Dynamodb';

export default class Serie extends Base {
  name: string | undefined;

  description: string | undefined;

  id?: string | undefined;

  constructor(
    name: string | undefined,
    description: string | undefined,
    id?: string | undefined,
  ) {
    super();
    this.name = name;
    this.description = description;
    this.id = id;
  }

  get pk(): string {
    return 'Series';
  }

  get sk(): string {
    if (this.id) return this.id;
    return randomUUID();
  }

  toItem(): Record<string, unknown> {
    return {
      ...this.keys(),
      name: { S: this.name },
      description: { S: this.description },
    };
  }

  async create(): Promise<void> {
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

  async findAll() {
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

      return registers.Items?.map(item => {
        return {
          id: item.SK.S,
          name: item.name.S,
          description: item.description.S,
        };
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findById(sk: string): Promise<{ [key: string]: any }> {
    try {
      const client = getClient();
      // @ts-ignore
      const registers = await client
        .query({
          TableName: 'MoviesTable',
          KeyConditionExpression: 'PK = :pk and SK = :sk',
          ExpressionAttributeValues: {
            ':pk': { S: this.pk },
            ':sk': { S: sk },
          },
        })
        .promise();

      const seasonsAndEpisodes = await client
        .query({
          TableName: 'MoviesTable',
          KeyConditionExpression: 'PK = :pk',
          ExpressionAttributeValues: {
            ':pk': { S: `${this.pk}#${this.sk}` },
          },
        })
        .promise();

      const platforms: any[] = [];
      const actors: any[] = [];
      const seasons: any[] = [];
      const mapSeasonByIndex: { [key: string]: any } = {};
      const episodes: any[] = [];
      seasonsAndEpisodes.Items?.forEach(item => {
        const isPlatform = (item?.SK?.S as string).indexOf('Platform') > -1;
        const isEpisode = (item?.SK?.S as string).indexOf('Episode') > -1;
        const isActor = (item?.SK?.S as string).indexOf('Actor') > -1;
        if (isActor) {
          const id = (item?.SK?.S as string).split('#')[1];
          actors.push({
            id,
            name: item?.name?.S,
            image: item?.image?.S,
          });
        } else if (isPlatform) {
          const id = (item?.SK?.S as string).split('#')[1];
          platforms.push({
            id,
            name: item?.name?.S,
          });
        } else if (isEpisode) {
          episodes.push({
            id: item?.SK?.S,
            title: item?.title?.S,
            description: item?.description?.S,
            video: item?.video?.S,
            thumb: item?.thumb?.S,
          });
        } else {
          const seasonId = (item?.SK?.S as string).split('#')[1];
          seasons.push({
            id: seasonId,
            name: item?.name?.S,
          });
          const index = seasons.length - 1;
          const { id } = seasons[index];
          mapSeasonByIndex[id] = index.toString();
        }
      });

      episodes.forEach(item => {
        const seasonAndEpisodeId = item.id.split('#Episode#');
        const seasonId = seasonAndEpisodeId[0].split('#')[1];
        const indexOfSeason = mapSeasonByIndex[seasonId];
        if (indexOfSeason) {
          item.id = seasonAndEpisodeId[1];
          if (!seasons[indexOfSeason].episodes) {
            seasons[indexOfSeason].episodes = [item];
          } else {
            seasons[indexOfSeason].episodes.push(item);
          }
        }
      });

      const item = registers.Items?.at(0);
      return {
        id: sk,
        name: item?.name.S,
        description: item?.description.S,
        seasons,
        platforms,
        actors,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async hasSerieById(sk: string): Promise<boolean> {
    try {
      const client = getClient();
      // @ts-ignore
      const registers = await client
        .query({
          TableName: 'MoviesTable',
          KeyConditionExpression: 'PK = :pk and SK = :sk',
          ExpressionAttributeValues: {
            ':pk': { S: this.pk },
            ':sk': { S: sk },
          },
        })
        .promise();

      return (registers.Items?.length as number) > 0;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async update(sk: string, serie: Serie): Promise<void> {
    try {
      const client = getClient();
      const keys = this.keys();
      keys.SK.S = sk;

      // @ts-ignore
      await client
        .updateItem({
          TableName: 'MoviesTable',
          Key: keys,
          UpdateExpression: 'SET #name = :name, #description = :description',
          ExpressionAttributeNames: {
            '#name': 'name',
            '#description': 'description',
          },
          ExpressionAttributeValues: {
            ':name': { S: serie.name },
            ':description': { S: serie.description },
          },
        })
        .promise();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
