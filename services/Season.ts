import ErrorCodeMessage from "../config/ErrorCodeMessage";
import Season from "../entities/Season";
import Serie from "../entities/Serie";

class SeasonService {

    constructor(
        private readonly season: Season,
        private readonly serie: Serie
    ) { }

    async create(serieId: string, newSeason: Season) {
        const hasSerie = await this.serie.hasSerieById(serieId);

        if (!hasSerie) {
            throw new Error(ErrorCodeMessage.SERIE_NOT_FOUND)
        }

        this.season.name = newSeason.name;
        this.season.serieId = serieId;

        await this.season.create();
    }

    async update(serieId: string, id: string, seasonModified: Season) {
        const hasSerie = await this.serie.hasSerieById(serieId);

        if (!hasSerie) {
            throw new Error(ErrorCodeMessage.SERIE_NOT_FOUND)
        }

        this.season.name = seasonModified.name;
        this.season.serieId = serieId;

        await this.season.update(`Season#${id}`, seasonModified)
    }
}

export default SeasonService;