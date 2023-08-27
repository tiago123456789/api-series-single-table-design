import ErrorCodeMessage from "../config/ErrorCodeMessage";
import Actor from "../entities/Actor";
import Serie from "../entities/Serie";

class ActorService {

    constructor(
        private readonly actor: Actor,
        private readonly serie: Serie,    
    ) {

    }

    async create(serieId: string, data: Actor) {
        const hasSerie = await this.serie.hasSerieById(serieId);

        if (!hasSerie) {
            throw new Error(ErrorCodeMessage.SERIE_NOT_FOUND)
        }

        this.actor.name = data.name;
        this.actor.image = data.image;
        this.actor.serieId = serieId;

        await this.actor.create()
    }

    async update(serieId: string, id: string, actorModified: Actor) {
        const hasSerie = await this.serie.hasSerieById(serieId);

        if (!hasSerie) {
            throw new Error(ErrorCodeMessage.SERIE_NOT_FOUND)
        }

        this.actor.name = actorModified.name;
        this.actor.image = actorModified.image;
        this.actor.serieId = serieId;

        await this.actor.update(`Actor#${id}`, actorModified)
    }
}

export default ActorService;