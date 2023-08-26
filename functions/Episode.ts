'use strict';

import * as yup from "yup";
import { getValidationErrors } from "../utils/Validator";
import Episode from "../entities/Episode";

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

  const episode: Episode = new Episode(
    body.title,
    body.description,
    body.video,
    body.thumb, 
    serieId, 
    seasonId
  )

  await episode.create()

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

  const episode: Episode = new Episode(
    body.title,
    body.description,
    body.video,
    body.thumb, 
    serieId, 
    seasonId,
    id
  )

  await episode.update(id, episode)

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


