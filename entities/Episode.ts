import { Base } from "./Base";
import { getClient } from "../config/Dynamodb"

export default class Episode extends Base {

    title: string | undefined;
    description: string | undefined;
    video: string | undefined;
    thumb: string | undefined;
    serieId: string | undefined;
    seasonId: string | undefined;
    id : string | undefined;

    constructor(
        title: string | undefined,
        description: string | undefined,
        video: string | undefined,
        thumb: string | undefined,
        serieId: string | undefined,
        seasonId: string | undefined,
        id?: string | undefined
    ) {
        super();
        this.title = title;
        this.description = description;
        this.video = video;
        this.thumb = thumb;
        this.serieId = serieId;
        this.seasonId = seasonId;
        this.id = id;
    }

    get pk(): string {
        return `Series#${this.serieId}`;
    }

    get sk(): string {
        if (this.id) {
            return  `Season#${this.seasonId}#Episode#${this.id}`
        }
        const currentTmeInMilleseconds = new Date().getTime()
        return `Season#${this.seasonId}#Episode#${currentTmeInMilleseconds}`
    }

    toItem(): Record<string, unknown> {
        return {
            ...this.keys(),
            title: { S: this.title },
            description: { S: this.description },
            video: { S: this.video },
            thumb: { S: this.thumb }
        }
    }

    async create() {
        try {
            const client = getClient();
            // @ts-ignore
            await client
                .putItem({
                    // @ts-ignore
                    TableName: "MoviesTable",
                    Item: this.toItem(),
                })
                .promise()
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async update(sk: string, episode: Episode) {
        try {
            const client = getClient();
            const keys = this.keys();

            // @ts-ignore
            await client
                .updateItem({
                    TableName: "MoviesTable",
                    Key: keys,
                    UpdateExpression: "SET #title = :title, #description = :description, #video = :video, #thumb = :thumb",
                    ExpressionAttributeNames: {
                        "#title": "title",
                        "#description": "description",
                        "#video": "video",
                        "#thumb": "thumb"
                    },
                    ExpressionAttributeValues: {
                        ":title": { S: episode.title },
                        ":description": { S: episode.description },
                        ":video": { S: episode.video },
                        ":thumb": { S: episode.thumb }
                    }
                })
                .promise();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}