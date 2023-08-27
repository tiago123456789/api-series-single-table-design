import ErrorCodeMessage from "../config/ErrorCodeMessage";
import Platform from "../entities/Platform";
import Serie from "../entities/Serie";

class PlatformService {

    constructor(
        private readonly platform: Platform,
        private readonly serie: Serie
    ) {}
    
    async create(serieId: string, newPlatfom: Platform) {
        const hasSerie = await this.serie.hasSerieById(serieId);

        if (!hasSerie) {
            throw new Error(ErrorCodeMessage.SERIE_NOT_FOUND)
        }

        this.platform.name = newPlatfom.name;
        this.platform.serieId = serieId;


        await this.platform.create()
    }

    async update(serieId: string, id: string, platformModified: Platform) {
        const hasSerie = await this.serie.hasSerieById(serieId);

        if (!hasSerie) {
            throw new Error(ErrorCodeMessage.SERIE_NOT_FOUND)
        }

        this.platform.name = platformModified.name;
        this.platform.serieId = serieId;
        await this.platform.update(`Actor#${id}`, platformModified)
    }
}

export default PlatformService;