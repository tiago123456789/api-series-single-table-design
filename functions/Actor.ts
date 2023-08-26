'use strict';

import * as yup from "yup";
import { getValidationErrors } from "../utils/Validator";
import Actor from "../entities/Actor";

export const createActor = async (event: { [key: string]: any }) => {
  const id = event.pathParameters.id;
  let actorSchema = yup.object({
    name: yup.string().required(),
    image: yup.string().required()
  });

  const body = JSON.parse(event.body || '{}')
  const validationErrors = await getValidationErrors(actorSchema, body)
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

  const actor: Actor = new Actor(
    body.name, 
    body.image,
    id
  )

  await actor.create()

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

export const updateActor = async (event: { [key: string]: any }) => {
  const serieId = event.pathParameters.serieId;
  const id = event.pathParameters.id;

  let actorSchema = yup.object({
    name: yup.string().required(),
    image: yup.string().required(),
  });

  const body = JSON.parse(event.body || '{}')
  const validationErrors = await getValidationErrors(actorSchema, body)
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

  const actor: Actor = new Actor(body.name, body.image, serieId)
  await actor.update(`Actor#${id}`, actor)

  return {
    statusCode: 204,
    body: JSON.stringify(
      {},
      null,
      2
    ),
  }
}

