import { Base } from "./Base";
import { getClient } from "../config/Dynamodb"

export default class Actor extends Base {

    name: string | undefined;
    image: string | undefined;
    serieId: string | undefined;

    constructor(
        name: string | undefined,
        image: string | undefined,
        serieId: string | undefined
    ) {
        super();
        this.name = name;
        this.image = image;
        this.serieId = serieId;
    }

    get pk(): string {
        return `Series#${this.serieId}`;
    }

    get sk(): string {
        const currentTmeInMilleseconds = new Date().getTime()
        return `Actor#${currentTmeInMilleseconds}`
    }

    toItem(): Record<string, unknown> {
        return {
            ...this.keys(),
            name: { S: this.name },
            image: { S: this.image }
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
                    Item: this.toItem()
                })
                .promise()
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async update(sk: string, actor: Actor) {
        try {
            const client = getClient();
            const keys = this.keys();
            keys.SK.S = sk;

            // @ts-ignore
            await client
                .updateItem({
                    TableName: "MoviesTable",
                    Key: keys,
                    UpdateExpression: "SET #name = :name, #image = :image",
                    ExpressionAttributeNames: {
                        "#name": "name",
                        "#image": "image"
                    },
                    ExpressionAttributeValues: {
                        ":name": { S: actor.name },
                        ":image": { S: actor.image }
                    }
                })
                .promise();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}