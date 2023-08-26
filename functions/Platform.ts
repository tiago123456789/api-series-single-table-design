'use strict';

import * as yup from "yup";
import { getValidationErrors } from "../utils/Validator";
import Platform from "../entities/Platform";

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

  const platform: Platform = new Platform(body.name, id)

  await platform.create()

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

  const platform: Platform = new Platform(body.name, serieId)
  await platform.update(`Platform#${id}`, platform)

  return {
    statusCode: 204,
    body: JSON.stringify(
      {},
      null,
      2
    ),
  }
}

