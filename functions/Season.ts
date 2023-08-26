'use strict';

import * as yup from "yup";
import Season from "../entities/Season"
import { getValidationErrors } from "../utils/Validator";

export const createSeason = async (event: { [key: string]: any }) => {
  const id = event.pathParameters.id;
  let seasonSchema = yup.object({
    name: yup.string().required(),
  });

  const body = JSON.parse(event.body || '{}')
  const validationErrors = await getValidationErrors(seasonSchema, body)
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

  const season: Season = new Season(body.name, id)

  await season.create()

  return {
    statusCode: 201,
    body: JSON.stringify(
      {
      },
      null,
      2
    ),
  }
}

export const updateSeason = async (event: { [key: string]: any }) => {
  const serieId = event.pathParameters.serieId;
  const id = event.pathParameters.id;

  let seasonSchema = yup.object({
    name: yup.string().required(),
  });

  const body = JSON.parse(event.body || '{}')
  const validationErrors = await getValidationErrors(seasonSchema, body)
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

  const season: Season = new Season(body.name, serieId)
  await season.update(`Season#${id}`, season)

  return {
    statusCode: 204,
    body: JSON.stringify(
      {},
      null,
      2
    ),
  }
}

