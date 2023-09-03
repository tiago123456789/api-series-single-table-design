import Episode from "../entities/Episode";
import EpisodeRepositoryInterface from "./Episode.interface";

class EpisodeRepository implements EpisodeRepositoryInterface {
    constructor(
        private readonly episode: Episode,
    ) {}

    async create(serieId: string, seasonId: string, newEpisode: Episode): Promise<void> {
        this.episode.title = newEpisode.title;
        this.episode.description = newEpisode.description;
        this.episode.video = newEpisode.video;
        this.episode.thumb = newEpisode.thumb;
        this.episode.serieId = serieId;
        this.episode.seasonId = seasonId;

        await this.episode.create()
    }

    async update(serieId: string, seasonId: string, id: string, episodeModified: Episode): Promise<void> {
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

export default EpisodeRepository;