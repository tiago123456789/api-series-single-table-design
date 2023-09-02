import Season from "../entities/Season";
import SeasonRepositoryInterface from "./Season.interface";
import SeasonInterface from "./Season.interface";

class SeasonRepository implements SeasonRepositoryInterface {

    constructor(private readonly season: Season,
    ) {}

    async create(serieId: string, newSeason: Season): Promise<void> {
        this.season.name = newSeason.name;
        this.season.serieId = serieId;

        await this.season.create();
    }

    async update(serieId: string, id: string, seasonModified: Season): Promise<void> {
        this.season.name = seasonModified.name;
        this.season.serieId = serieId;

        await this.season.update(`Season#${id}`, seasonModified)
    }

}

export default SeasonRepository;