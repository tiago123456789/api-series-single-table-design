'use strict';

import * as yup from "yup";
import { getValidationErrors } from "../utils/Validator";
import Platform from "../entities/Platform";
import PlatformService from "../services/Platform";
import Serie from "../entities/Serie";
import HandlerResponseException from "../utils/HandlerResponseExeption";
import PlatformRepository from "../repositories/Platform";
import SerieRepository from "../repositories/Serie";

const platformRepository = new PlatformRepository(
  new Platform(undefined, undefined),
)
const serieRepository = new SerieRepository(
  new Serie(undefined, undefined, undefined)
)
const platformService = new PlatformService(
  platformRepository,
  serieRepository
);

export const createPlatform = async (event: { [key: string]: any }) => {
  const id = event.pathParameters.id;
  let platformSchema = yup.object({
    name: yup.string().required(),
  });

  const body = JSON.parse(event.body || '{}')
  const validationErrors = await getValidationErrors(platformSchema, body)
  if (validationErrors) {
    return {
      statusCode: 400,
      body: JSON.stringify(
        {
          errors: validationErrors
        },
        null,
        2
      ),
    }
  }

  try {
    const platform: Platform = new Platform(body.name, id)
    await platformService.create(id, platform)
  
    return {
      statusCode: 201,
      body: JSON.stringify(
        {
        },
        null,
        2
      ),
    }
  } catch(error: any) {
    return HandlerResponseException.handle(error);
  }
}

export const updatePlatform = async (event: { [key: string]: any }) => {
  const serieId = event.pathParameters.serieId;
  const id = event.pathParameters.id;

  let platformSchema = yup.object({
    name: yup.string().required(),
  });

  const body = JSON.parse(event.body || '{}')
  const validationErrors = await getValidationErrors(platformSchema, body)
  if (validationErrors) {
    return {
      statusCode: 400,
      body: JSON.stringify(
        {
          errors: validationErrors
        },
        null,
        2
      ),
    }
  }

  try {
    const platform: Platform = new Platform(body.name, serieId)
    await platformService.update(serieId, id, platform);
  
    return {
      statusCode: 204,
      body: JSON.stringify(
        {},
        null,
        2
      ),
    }
  } catch(error: any) {
    return HandlerResponseException.handle(error);
  }
  
}

