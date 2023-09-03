import Episode from '../entities/Episode';

interface EpisodeRepositoryInterface {
  create(serieId: string, seasonId: string, newEpisode: Episode): Promise<void>;
  update(
    serieId: string,
    seasonId: string,
    id: string,
    episodeModified: Episode,
  ): Promise<void>;
}

export default EpisodeRepositoryInterface;
