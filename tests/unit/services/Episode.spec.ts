import ErrorCodeMessage from "../../../config/ErrorCodeMessage";
import Episode from "../../../entities/Episode";
import EpisodeRepositoryInterface from "../../../repositories/Episode.interface";
import SeasonRepositoryInterface from "../../../repositories/Season.interface";
import SerieRepositoryInterface from "../../../repositories/Serie.interface";
import EpisodeService from "../../../services/Episode"
import { randomUUID } from "crypto";

describe("EpisodeService unit tests", () => {
    let episodeRepository: jest.Mocked<EpisodeRepositoryInterface>;
    let seasonRepository: jest.Mocked<SeasonRepositoryInterface>;
    let serieRepository: jest.Mocked<SerieRepositoryInterface>;

    beforeEach(() => {
        episodeRepository = {
            create: jest.fn(),
            update: jest.fn()
        }
        seasonRepository = {
            hasSeasonById: jest.fn(),
            create: jest.fn(),
            update: jest.fn()
        }
        serieRepository = {
            findById: jest.fn(),
            hasSerieById: jest.fn()
        }
    })

    it("Should be throw exception when try update episode but serie not found", async () => {
        try {
            serieRepository.hasSerieById.mockReturnValue(Promise.resolve(false))
            const episodeService = new EpisodeService(
                episodeRepository,
                seasonRepository,
                serieRepository
            )

            const fakeSeasonId = randomUUID()
            const fakeSerieId = randomUUID()
            const fakeEpisode = new Episode(
                'Test', 'Test', 'https://youtube.com.br', 'https://example.com',
                fakeSerieId, fakeSeasonId, undefined
            )
            await episodeService.update(
                fakeSerieId, fakeSeasonId, fakeEpisode.sk, fakeEpisode
            )
        } catch (error: any) {
            expect(error.message).toBe(ErrorCodeMessage.SERIE_NOT_FOUND)
        }
    })

    it("Should be throw exception when try update episode but season not found", async () => {
        try {
            serieRepository.hasSerieById.mockReturnValue(Promise.resolve(true))
            seasonRepository.hasSeasonById.mockReturnValue(Promise.resolve(false))
            const episodeService = new EpisodeService(
                episodeRepository,
                seasonRepository,
                serieRepository
            )

            const fakeSeasonId = randomUUID()
            const fakeSerieId = randomUUID()
            const fakeEpisode = new Episode(
                'Test', 'Test', 'https://youtube.com.br', 'https://example.com',
                fakeSerieId, fakeSeasonId, undefined
            )
            await episodeService.update(
                fakeSerieId, fakeSeasonId, fakeEpisode.sk, fakeEpisode
            )
        } catch (error: any) {
            expect(error.message).toBe(ErrorCodeMessage.SEASON_NOT_FOUND)
        }
    })

    it("Should be update episode on season one serie", async () => {
        serieRepository.hasSerieById.mockReturnValue(Promise.resolve(true))
        seasonRepository.hasSeasonById.mockReturnValue(Promise.resolve(true))
        const episodeService = new EpisodeService(
            episodeRepository,
            seasonRepository,
            serieRepository
        )

        const fakeSeasonId = randomUUID()
        const fakeSerieId = randomUUID()
        const fakeEpisode = new Episode(
            'Test', 'Test', 'https://youtube.com.br', 'https://example.com',
            fakeSerieId, fakeSeasonId, undefined
        )
        await episodeService.update(
            fakeSerieId, fakeSeasonId, fakeEpisode.sk, fakeEpisode
        )
        expect(episodeRepository.update).toBeCalledTimes(1)
        expect(seasonRepository.hasSeasonById).toBeCalledTimes(1)
        expect(serieRepository.hasSerieById).toBeCalledTimes(1)
    })

    it("Should be throw exception when try add episode but serie not found", async () => {
        try {
            serieRepository.hasSerieById.mockReturnValue(Promise.resolve(false))
            const episodeService = new EpisodeService(
                episodeRepository,
                seasonRepository,
                serieRepository
            )

            const fakeSeasonId = randomUUID()
            const fakeSerieId = randomUUID()
            await episodeService.create(randomUUID(), fakeSeasonId, new Episode(
                'Test', 'Test', 'https://youtube.com.br', 'https://example.com',
                fakeSerieId, fakeSeasonId, undefined
            ))
        } catch (error: any) {
            expect(error.message).toBe(ErrorCodeMessage.SERIE_NOT_FOUND)
        }
    })

    it("Should be throw exception when try add episode but season not found", async () => {
        try {
            serieRepository.hasSerieById.mockReturnValue(Promise.resolve(true))
            seasonRepository.hasSeasonById.mockReturnValue(Promise.resolve(false))

            const episodeService = new EpisodeService(
                episodeRepository,
                seasonRepository,
                serieRepository
            )

            const fakeSeasonId = randomUUID()
            const fakeSerieId = randomUUID()
            await episodeService.create(randomUUID(), fakeSeasonId, new Episode(
                'Test', 'Test', 'https://youtube.com.br', 'https://example.com',
                fakeSerieId, fakeSeasonId, undefined
            ))
        } catch (error: any) {
            expect(error.message).toBe(ErrorCodeMessage.SEASON_NOT_FOUND)
        }
    })

    it("Should be create add episode on season one serie success", async () => {
        serieRepository.hasSerieById.mockReturnValue(Promise.resolve(true))
        seasonRepository.hasSeasonById.mockReturnValue(Promise.resolve(true))

        const episodeService = new EpisodeService(
            episodeRepository,
            seasonRepository,
            serieRepository
        )

        const fakeSeasonId = randomUUID()
        const fakeSerieId = randomUUID()
        await episodeService.create(randomUUID(), fakeSeasonId, new Episode(
            'Test', 'Test', 'https://youtube.com.br', 'https://example.com',
            fakeSerieId, fakeSeasonId, undefined
        ))
        expect(episodeRepository.create).toBeCalledTimes(1)
        expect(seasonRepository.hasSeasonById).toBeCalledTimes(1)
        expect(serieRepository.hasSerieById).toBeCalledTimes(1)
    })
})