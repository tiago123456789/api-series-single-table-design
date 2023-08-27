import ErrorCodeMessage from "../config/ErrorCodeMessage";
import Serie from "../entities/Serie";

class SerieService {

    constructor(private readonly serie: Serie) {

    }

    async findById(id: string) {
        const hasSerie = await this.serie.hasSerieById(id);
        if (!hasSerie) {
          throw new Error(ErrorCodeMessage.SERIE_NOT_FOUND);
        }
      
        return await this.serie.findById(id)
    }
}

export default SerieService;