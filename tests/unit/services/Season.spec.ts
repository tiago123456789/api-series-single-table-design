import ErrorCodeMessage from "../../../config/ErrorCodeMessage";
import Season from "../../../entities/Season";
import SeasonRepositoryInterface from "../../../repositories/Season.interface"
import SerieRepositoryInterface from "../../../repositories/Serie.interface";
import SeasonService from "../../../services/Season"
import { randomUUID } from "crypto"

describe("Season unit tests", () => {
    let seasonRepository: jest.Mocked<SeasonRepositoryInterface>;
    let serieRepository: jest.Mocked<SerieRepositoryInterface>;

    beforeEach(() => {
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

    it("Should be throw exception when try create season to the serie not exist", async () => {
        try {
            const seasonService = new SeasonService(
                seasonRepository,
                serieRepository
            );

            serieRepository.hasSerieById.mockResolvedValue(Promise.resolve(false));
            await seasonService.create(randomUUID(), new Season("season test", undefined))
        } catch (error: any) {
            expect(error.message).toBe(ErrorCodeMessage.SERIE_NOT_FOUND)
        }
    })

    it("Should be create season to the serie not exist", async () => {
        const seasonService = new SeasonService(
            seasonRepository,
            serieRepository
        );

        serieRepository.hasSerieById.mockResolvedValue(Promise.resolve(true));
        await seasonService.create(randomUUID(), new Season("season test", undefined))
        expect(seasonRepository.create).toBeCalledTimes(1)
    })


    it("Should be throw exception when try update season to the serie not exist", async () => {
        try {
            const seasonService = new SeasonService(
                seasonRepository,
                serieRepository
            );

            serieRepository.hasSerieById.mockResolvedValue(Promise.resolve(false));
            const fakeSeason = new Season("season test", undefined);
            await seasonService.update(randomUUID(), fakeSeason.sk, fakeSeason)
        } catch (error: any) {
            expect(error.message).toBe(ErrorCodeMessage.SERIE_NOT_FOUND)
        }
    })

    it("Should be create season to the serie not exist", async () => {
        const seasonService = new SeasonService(
            seasonRepository,
            serieRepository
        );

        serieRepository.hasSerieById.mockResolvedValue(Promise.resolve(true));
        const fakeSeason = new Season("season test", undefined);
        await seasonService.update(randomUUID(), fakeSeason.sk, fakeSeason)
        expect(seasonRepository.update).toBeCalledTimes(1)
    })
})