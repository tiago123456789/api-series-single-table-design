import ErrorCodeMessage from "../config/ErrorCodeMessage";
import Season from "../entities/Season";
import SeasonRepositoryInterface from "../repositories/Season.interface";
import SerieRepositoryInterface from "../repositories/Serie.interface";

class SeasonService {

    constructor(
        private readonly seasonRepository: SeasonRepositoryInterface,
        private readonly serieRepository: SerieRepositoryInterface
    ) { }

    async create(serieId: string, newSeason: Season) {
        const hasSerie = await this.serieRepository.hasSerieById(serieId);

        if (!hasSerie) {
            throw new Error(ErrorCodeMessage.SERIE_NOT_FOUND)
        }

        await this.seasonRepository.create(serieId, newSeason);
    }

    async update(serieId: string, id: string, seasonModified: Season) {
        const hasSerie = await this.serieRepository.hasSerieById(serieId);

        if (!hasSerie) {
            throw new Error(ErrorCodeMessage.SERIE_NOT_FOUND)
        }

        await this.seasonRepository.update(serieId, id, seasonModified);
    }
}

export default SeasonService;