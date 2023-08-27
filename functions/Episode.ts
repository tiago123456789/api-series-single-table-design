'use strict';

import * as yup from "yup";
import { getValidationErrors } from "../utils/Validator";
import Episode from "../entities/Episode";
import EpisodeService from "../services/Episode";
import Season from "../entities/Season";
import Serie from "../entities/Serie";
import HandlerResponseException from "../utils/HandlerResponseExeption";

const episodeService = new EpisodeService(
  new Episode(
    undefined, undefined, undefined,
    undefined, undefined, undefined,
    undefined
  ),
  new Season(undefined, undefined),
  new Serie(undefined, undefined, undefined)
);

export const createEpisode = async (event: { [key: string]: any }) => {
  const serieId = event.pathParameters.serieId;
  const seasonId = event.pathParameters.seasonId;

  let episodeSchema = yup.object({
    title: yup.string().required(),
    description: yup.string().required(),
    video: yup.string().required(),
    thumb: yup.string().required(),
  });

  const body = JSON.parse(event.body || '{}')
  const validationErrors = await getValidationErrors(episodeSchema, body)
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
    const episode: Episode = new Episode(
      body.title,
      body.description,
      body.video,
      body.thumb, 
      serieId, 
      seasonId
    )
  
    await episodeService.create(serieId, seasonId, episode);
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

export const updateEpisode = async (event: { [key: string]: any }) => {
  const serieId = event.pathParameters.serieId;
  const seasonId = event.pathParameters.seasonId;
  const id = event.pathParameters.id;

  let episodeSchema = yup.object({
    title: yup.string().required(),
    description: yup.string().required(),
    video: yup.string().required(),
    thumb: yup.string().required(),
  });

  const body = JSON.parse(event.body || '{}')
  const validationErrors = await getValidationErrors(episodeSchema, body)
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
    const episode: Episode = new Episode(
      body.title,
      body.description,
      body.video,
      body.thumb, 
      serieId, 
      seasonId,
      id
    )
  
    await episodeService.update(serieId, seasonId, id, episode)
  
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


