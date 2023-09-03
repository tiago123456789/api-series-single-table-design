'use strict';

import * as yup from "yup";
import { getValidationErrors } from "../utils/Validator";
import Actor from "../entities/Actor";
import ActorService from "../services/Actor";
import Serie from "../entities/Serie";
import HandlerResponseException from "../utils/HandlerResponseExeption";
import ActorRepository from "../repositories/Actor";
import SerieRepository from "../repositories/Serie";

const actorRepository = new ActorRepository(
  new Actor(undefined, undefined, undefined),
)

const serieRepository = new SerieRepository(
  new Serie(undefined, undefined, undefined)
)
const actorService = new ActorService(
  actorRepository,
  serieRepository
)

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

  try {
    await actorService.create(id, new Actor(
      body.name, 
      body.image,
      id
    ))
  
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

  try {
    const actor: Actor = new Actor(body.name, body.image, serieId)
    await actorService.update(serieId, id, actor);
  
    return {
      statusCode: 204,
      body: JSON.stringify(
        {},
        null,
        2
      ),
    }
  } catch(error: any) {
    return HandlerResponseException.handle(error)
  }
}

