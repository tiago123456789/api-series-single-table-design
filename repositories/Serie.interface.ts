
interface SerieRepositoryInterface {

    hasSerieById(id: string): Promise<boolean>;
    findById(id: string): Promise<{ [key: string]: any }>;
}

export default SerieRepositoryInterface;