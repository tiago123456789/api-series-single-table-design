import * as yup from 'yup';
import Serie from '../entities/Serie';
import { getValidationErrors } from '../utils/Validator';
import HandlerResponseException from '../utils/HandlerResponseExeption';
import SerieService from '../services/Serie';
import SerieRepository from '../repositories/Serie';

const serieRepository = new SerieRepository(
  new Serie(undefined, undefined, undefined),
);
const serieService = new SerieService(serieRepository);

export const getSerieById = async (event: { [key: string]: any }) => {
  const { id } = event.pathParameters;

  try {
    const serieReturned = await serieService.findById(id);
    return {
      statusCode: 200,
      body: JSON.stringify(serieReturned, null, 2),
    };
  } catch (error: any) {
    return HandlerResponseException.handle(error);
  }
};

export const getSeries = async () => {
  const series = await new Serie('', '').findAll();
  return {
    statusCode: 200,
    body: JSON.stringify(series, null, 2),
  };
};

export const createSerie = async (event: { [key: string]: any }) => {
  const serieSchema = yup.object({
    name: yup.string().required(),
    description: yup.string().required(),
  });

  const body = JSON.parse(event.body || '{}');
  const validationErrors = await getValidationErrors(serieSchema, body);
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

  const serie: Serie = new Serie(body.name, body.description);

  await serie.create();

  return {
    statusCode: 201,
    body: JSON.stringify({}, null, 2),
  };
};

export const updateSerie = async (event: { [key: string]: any }) => {
  const serieSchema = yup.object({
    name: yup.string().required(),
    description: yup.string().required(),
  });

  const body = JSON.parse(event.body || '{}');
  const validationErrors = await getValidationErrors(serieSchema, body);
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

  const { id } = event.pathParameters;
  const serie: Serie = new Serie(body.name, body.description);
  await serie.update(id, serie);

  return {
    statusCode: 204,
    body: JSON.stringify({}, null, 2),
  };
};
