import Platform from "../entities/Platform";
import PlatformRepositoryInterface from "./Platform.interface";

class PlatformRepository implements PlatformRepositoryInterface {

    constructor(private readonly platform: Platform) {}
    
    async create(serieId: string, newPlatfom: Platform): Promise<void> {
        this.platform.name = newPlatfom.name;
        this.platform.serieId = serieId;


        await this.platform.create()
    }

    async update(serieId: string, id: string, platformModified: Platform): Promise<void> {
         this.platform.name = platformModified.name;
        this.platform.serieId = serieId;
        await this.platform.update(`Actor#${id}`, platformModified)
    }
    
}

export default PlatformRepository;