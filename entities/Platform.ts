import { Base } from "./Base";
import { getClient } from "../config/Dynamodb"

export default class Platform extends Base {

    name: string | undefined;
    serieId: string | undefined;

    constructor(
        name: string | undefined,
        serieId: string | undefined,
    ) {
        super();
        this.name = name;
        this.serieId = serieId;
    }

    get pk(): string {
        return `Series#${this.serieId}`;
    }

    get sk(): string {
        const currentTmeInMilleseconds = new Date().getTime()
        return `Platform#${currentTmeInMilleseconds}`
    }

    toItem(): Record<string, unknown> {
        return {
            ...this.keys(),
            name: { S: this.name },
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

    async update(sk: string, platform: Platform) {
        try {
            const client = getClient();
            const keys = this.keys();
            keys.SK.S = sk;

            // @ts-ignore
            await client
                .updateItem({
                    TableName: "MoviesTable",
                    Key: keys,
                    UpdateExpression: "SET #name = :name",
                    ExpressionAttributeNames: {
                        "#name": "name",
                    },
                    ExpressionAttributeValues: {
                        ":name": { S: platform.name },
                    }
                })
                .promise();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}