import Season from "../entities/Season";

interface SeasonRepositoryInterface {

    create(serieId: string, newSeason: Season): Promise<void>;
    update(serieId: string, id: string, seasonModified: Season): Promise<void>
}

export default SeasonRepositoryInterface;