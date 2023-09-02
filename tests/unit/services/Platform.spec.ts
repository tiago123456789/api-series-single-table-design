import ErrorCodeMessage from "../../../config/ErrorCodeMessage";
import Platform from "../../../entities/Platform";
import PlatformRepositoryInterface from "../../../repositories/Platform.interface"
import SerieRepositoryInterface from "../../../repositories/Serie.interface";
import PlatformService from "../../../services/Platform";
import { randomUUID } from "crypto";

describe("PlatformService unit tests", () => {
    let platformRepository: jest.Mocked<PlatformRepositoryInterface>;
    let serieRepository: jest.Mocked<SerieRepositoryInterface>;

    beforeEach(() => {
        platformRepository = {
            create: jest.fn(),
            update: jest.fn()
        }
        serieRepository = {
            findById: jest.fn(),
            hasSerieById: jest.fn()
        }
    })

    it("Should be throw exception when try add platform to serie not exist", async () => {
        try {
            const platformService = new PlatformService(
                platformRepository,
                serieRepository
            )
            serieRepository.hasSerieById.mockResolvedValue(Promise.resolve(false))
            await platformService.create(randomUUID(), new Platform("Platform test", undefined))
        } catch (error: any) {
            expect(error.message).toBe(ErrorCodeMessage.SERIE_NOT_FOUND)
        }
    })

    it("Should be add platform to serie", async () => {
        const platformService = new PlatformService(
            platformRepository,
            serieRepository
        )
        serieRepository.hasSerieById.mockResolvedValue(Promise.resolve(true))
        await platformService.create(randomUUID(), new Platform("Platform test", undefined))
        expect(platformRepository.create).toBeCalledTimes(1)
    })


    it("Should be throw exception when try update platform to serie not exist", async () => {
        try {
            const platformService = new PlatformService(
                platformRepository,
                serieRepository
            )
            serieRepository.hasSerieById.mockResolvedValue(Promise.resolve(false))
            const fakePlatform = new Platform("Platform test", undefined)
            await platformService.update(randomUUID(), fakePlatform.sk, fakePlatform)
        } catch (error: any) {
            expect(error.message).toBe(ErrorCodeMessage.SERIE_NOT_FOUND)
        }
    })


    it("Should be throw exception when try update platform to serie not exist", async () => {
        const platformService = new PlatformService(
            platformRepository,
            serieRepository
        )
        serieRepository.hasSerieById.mockResolvedValue(Promise.resolve(true))
        const fakePlatform = new Platform("Platform test", undefined)
        await platformService.update(randomUUID(), fakePlatform.sk, fakePlatform)
        expect(platformRepository.update).toBeCalledTimes(1)
    })
})