import ErrorCodeMessage from "../config/ErrorCodeMessage";
import Actor from "../entities/Actor";
import ActorRepositoryInterface from "../repositories/Actor.interface";
import SerieRepositoryInterface from "../repositories/Serie.interface";

class ActorService {

    constructor(
        private readonly actorRepository: ActorRepositoryInterface,
        private readonly serieRepository: SerieRepositoryInterface,    
    ) {

    }

    async create(serieId: string, data: Actor) {
        const hasSerie = await this.serieRepository.hasSerieById(serieId);

        if (!hasSerie) {
            throw new Error(ErrorCodeMessage.SERIE_NOT_FOUND)
        }


        await this.actorRepository.create(serieId, data);
    }

    async update(serieId: string, id: string, actorModified: Actor) {
        const hasSerie = await this.serieRepository.hasSerieById(serieId);

        if (!hasSerie) {
            throw new Error(ErrorCodeMessage.SERIE_NOT_FOUND)
        }

        await this.actorRepository.update(serieId, id , actorModified)
    }
}

export default ActorService;