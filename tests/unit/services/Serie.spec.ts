import ErrorCodeMessage from '../../../config/ErrorCodeMessage';
import SerieRepositoryInterface from '../../../repositories/Serie.interface';
import SerieService from '../../../services/Serie';

describe('SerieService unit tests', () => {
  let serieRepository: jest.Mocked<SerieRepositoryInterface>;

  beforeEach(() => {
    serieRepository = {
      findById: jest.fn(),
      hasSerieById: jest.fn(),
    };
  });

  it('Should be throw exception becuase try get serie not exist', async () => {
    try {
      serieRepository.hasSerieById.mockReturnValue(Promise.resolve(false));
      const serieService = new SerieService(serieRepository);
      await serieService.findById('1');
    } catch (error: any) {
      expect(error.message).toBe(ErrorCodeMessage.SERIE_NOT_FOUND);
    }
  });

  it('Should be return serie by id', async () => {
    const fakeSerie = {
      id: 'cf6f1c72-b8b2-4b28-8873-9b707f000d0e',
      name: 'Shooter updated',
      description: 'shooter updated has 3 seasons',
      seasons: [
        {
          id: '1693032544069',
          name: 'Season 1',
          episodes: [
            {
              id: '1693067179561',
              title: 'JOHN TEST',
              description: 'First episode of John test cartoon.',
              video: 'https://youtu.be/V_B92U_Ijt4?si=ZnCGBsLLO0c1O9-8',
              thumb:
                'https://m.media-amazon.com/images/M/MV5BZTEzMTdjMDQtMDY0My00MjEyLWFhNWQtOTg5NzBlZTRjOTkyXkEyXkFqcGdeQXVyNTgyNjMxMzQ@._V1_FMjpg_UX1000_.jpg',
            },
          ],
        },
      ],
      platforms: [
        {
          id: '1693072687870',
          name: 'Prime',
        },
      ],
      actors: [
        {
          id: '1693171781011',
          name: 'Will smith 222',
          image:
            'https://i.ndtvimg.com/i/2015-06/spiderman_640x480_81435123064.jpg',
        },
      ],
    };
    serieRepository.hasSerieById.mockReturnValue(Promise.resolve(true));
    serieRepository.findById.mockReturnValue(Promise.resolve(fakeSerie));
    const serieService = new SerieService(serieRepository);
    const serieReturned = await serieService.findById('1');
    expect(serieReturned).toBe(fakeSerie);
  });
});
