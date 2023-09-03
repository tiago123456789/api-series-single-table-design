import { randomUUID } from 'crypto';
import ErrorCodeMessage from '../../../config/ErrorCodeMessage';
import Actor from '../../../entities/Actor';
import ActorRepositoryInterface from '../../../repositories/Actor.interface';
import SerieRepositoryInterface from '../../../repositories/Serie.interface';
import ActorService from '../../../services/Actor';

describe('ActorService unit tests', () => {
  let actorRepository: jest.Mocked<ActorRepositoryInterface>;
  let serieRepository: jest.Mocked<SerieRepositoryInterface>;

  beforeEach(() => {
    actorRepository = {
      create: jest.fn(),
      update: jest.fn(),
    };
    serieRepository = {
      findById: jest.fn(),
      hasSerieById: jest.fn(),
    };
  });

  it('Should be throw exception add actor to serie no exist', async () => {
    try {
      serieRepository.hasSerieById.mockReturnValue(Promise.resolve(false));
      const actorService = new ActorService(actorRepository, serieRepository);

      await actorService.create(
        randomUUID(),
        new Actor('Actor test', 'https://example.com.br/image.png', undefined),
      );
    } catch (error: any) {
      expect(error.message).toBe(ErrorCodeMessage.SERIE_NOT_FOUND);
    }
  });

  it('Should be throw exception add actor to serie no exist', async () => {
    try {
      serieRepository.hasSerieById.mockReturnValue(Promise.resolve(false));
      const actorService = new ActorService(actorRepository, serieRepository);

      await actorService.create(
        randomUUID(),
        new Actor('Actor test', 'https://example.com.br/image.png', undefined),
      );
    } catch (error: any) {
      expect(error.message).toBe(ErrorCodeMessage.SERIE_NOT_FOUND);
    }
  });

  it('Should be add actor to serie', async () => {
    serieRepository.hasSerieById.mockReturnValue(Promise.resolve(true));
    const actorService = new ActorService(actorRepository, serieRepository);

    const fakeActor = new Actor(
      'Actor test',
      'https://example.com.br/image.png',
      undefined,
    );
    await actorService.update(randomUUID(), fakeActor.sk, fakeActor);
    expect(actorRepository.update).toBeCalledTimes(1);
  });
});
