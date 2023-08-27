import ErrorCodeMessage from "../config/ErrorCodeMessage";
import Episode from "../entities/Episode";
import Season from "../entities/Season";
import Serie from "../entities/Serie";

class EpisodeService {

    constructor(
        private readonly episode: Episode,
        private readonly season: Season,
        private readonly serie: Serie
    ) {

    }

    async create(serieId: string, seasonId: string, newEpisode: Episode) {
        const hasSerie = await this.serie.hasSerieById(serieId);
        
        if (!hasSerie) {
            throw new Error(ErrorCodeMessage.SERIE_NOT_FOUND)
        }

        this.season.serieId = serieId;

        const hasSeason = await this.season.hasSeasonById(`Season#${seasonId}`)
        if (!hasSeason) {
            throw new Error(ErrorCodeMessage.SEASON_NOT_FOUND)
        }

        this.episode.title = newEpisode.title;
        this.episode.description = newEpisode.description;
        this.episode.video = newEpisode.video;
        this.episode.thumb = newEpisode.thumb;
        this.episode.serieId = serieId;
        this.episode.seasonId = seasonId;

        await this.episode.create()
    }

    async update(serieId: string, seasonId: string, id: string, episodeModified: Episode) {
        const hasSerie = await this.serie.hasSerieById(serieId);
        
        if (!hasSerie) {
            throw new Error(ErrorCodeMessage.SERIE_NOT_FOUND)
        }

        this.season.serieId = serieId;

        const hasSeason = await this.season.hasSeasonById(`Season#${seasonId}`)
        if (!hasSeason) {
            throw new Error(ErrorCodeMessage.SEASON_NOT_FOUND)
        }

        this.episode.title = episodeModified.title;
        this.episode.description = episodeModified.description;
        this.episode.video = episodeModified.video;
        this.episode.thumb = episodeModified.thumb;
        this.episode.serieId = serieId;
        this.episode.seasonId = seasonId;
        this.episode.id = id;

        await this.episode.update(id, episodeModified)
    }
}

export default EpisodeService;