import * as yup from 'yup';
import Season from '../entities/Season';
import { getValidationErrors } from '../utils/Validator';
import SeasonService from '../services/Season';
import Serie from '../entities/Serie';
import HandlerResponseException from '../utils/HandlerResponseExeption';
import SeasonRepository from '../repositories/Season';
import SerieRepository from '../repositories/Serie';

const seasonRepository = new SeasonRepository(new Season(undefined, undefined));
const serieRepository = new SerieRepository(new Serie(undefined, undefined));
const seasonService = new SeasonService(seasonRepository, serieRepository);

export const createSeason = async (event: { [key: string]: any }) => {
  const { id } = event.pathParameters;
  const seasonSchema = yup.object({
    name: yup.string().required(),
  });

  const body = JSON.parse(event.body || '{}');
  const validationErrors = await getValidationErrors(seasonSchema, body);
  if (validationErrors) {
    return {
      statusCode: 400,
      body: JSON.stringify(
        {
          errors: validationErrors,
        },
        null,
        2,
      ),
    };
  }

  try {
    const season: Season = new Season(body.name, id);
    await seasonService.create(id, season);

    return {
      statusCode: 201,
      body: JSON.stringify({}, null, 2),
    };
  } catch (error: any) {
    return HandlerResponseException.handle(error);
  }
};

export const updateSeason = async (event: { [key: string]: any }) => {
  const { serieId } = event.pathParameters;
  const { id } = event.pathParameters;

  const seasonSchema = yup.object({
    name: yup.string().required(),
  });

  const body = JSON.parse(event.body || '{}');
  const validationErrors = await getValidationErrors(seasonSchema, body);
  if (validationErrors) {
    return {
      statusCode: 400,
      body: JSON.stringify(
        {
          errors: validationErrors,
        },
        null,
        2,
      ),
    };
  }

  try {
    const season: Season = new Season(body.name, serieId);
    await seasonService.update(serieId, id, season);

    return {
      statusCode: 204,
      body: JSON.stringify({}, null, 2),
    };
  } catch (error: any) {
    return HandlerResponseException.handle(error);
  }
};
