import Platform from '../entities/Platform';

interface PlatformRepositoryInterface {
  create(serieId: string, newPlatfom: Platform): Promise<void>;
  update(
    serieId: string,
    id: string,
    platformModified: Platform,
  ): Promise<void>;
}

export default PlatformRepositoryInterface;
