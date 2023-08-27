
'use strict';

import * as yup from "yup";
import { getValidationErrors } from "../utils/Validator";
import Encrypter from "../utils/Encrypter";
import User from "../entities/User";
import Token from "../utils/Token";
import AuthService from "../services/Auth";
import ErrorCodeMessage from "../config/ErrorCodeMessage";
import HandlerResponseException from "../utils/HandlerResponseExeption";

const encrypter = new Encrypter();
const token = new Token();

const authService = new AuthService(
  new User(undefined, undefined),
  encrypter,
  token
)

export const authorizer = async (event: { [key: string]: any }) => {
  let accessToken = event.headers["Authorization"] || event['headers']['authorization'];

  if (!accessToken) {
    return {
      "isAuthorized": false,
      "context": {}
    }
  }

  accessToken = accessToken.replace("Bearer ", "");

  const isValid = token.isValid(accessToken);
  if (!isValid) {
    return {
      "isAuthorized": false,
      "context": {}
    }
  }

  return  {
    "isAuthorized": true,
    "context": {}
  }
}

export const createUser = async (event: { [key: string]: any }) => {
  let userSchema = yup.object({
    email: yup.string().required(),
    password: yup.string().required(),
  });

  const body = JSON.parse(event.body || '{}')
  const validationErrors = await getValidationErrors(userSchema, body)
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

  await authService.register(body.email, body.password)
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


export const authenticate = async (event: { [key: string]: any }) => {
  let userSchema = yup.object({
    email: yup.string().required(),
    password: yup.string().required(),
  });

  const body = JSON.parse(event.body || '{}')
  const validationErrors = await getValidationErrors(userSchema, body)
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
    const accessToken = await authService.login(body.email, body.password)
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          accessToken
        },
        null,
        2
      ),
    }
  } catch(error: any) {
    return HandlerResponseException.handle(error);
  }
  
}

