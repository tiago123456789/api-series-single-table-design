
'use strict';

import * as yup from "yup";
import { getValidationErrors } from "../utils/Validator";
import Encrypter from "../utils/Encrypter";
import User from "../entities/User";
import Token from "../utils/Token";

const encrypter = new Encrypter();
const token = new Token()

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

  body.password = await encrypter.getHash(body.password)
  const user: User = new User(
    body.email,
    body.password
  )

  await user.create()

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

  body.password = await encrypter.getHash(body.password)
  const user: User = new User(
    body.email,
    body.password
  )

  const userByEmail = await user.findByEmail(body.email);

  if (!userByEmail) {
    return {
      statusCode: 401,
      body: JSON.stringify(
        {
          message: "Credentials invalid."
        },
        null,
        2
      ),
    }
  }

  const isValidPassword = encrypter.compare(
    body.password, 
    (userByEmail.password as string)
  );


  if (!isValidPassword) {
    return {
      statusCode: 401,
      body: JSON.stringify(
        {
          message: "Credentials invalid."
        },
        null,
        2
      ),
    }
  }

  const accessToken = await token.get({
    email: body.email
  })

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
}

// export const updatePlatform = async (event: { [key: string]: any }) => {
//   const serieId = event.pathParameters.serieId;
//   const id = event.pathParameters.id;

//   let serieSchema = yup.object({
//     name: yup.string().required(),
//   });

//   const body = JSON.parse(event.body || '{}')
//   const validationErrors = await getValidationErrors(serieSchema, body)
//   if (validationErrors) {
//     return {
//       statusCode: 400,
//       body: JSON.stringify(
//         {
//           errors: validationErrors
//         },
//         null,
//         2
//       ),
//     }
//   }

//   const platform: Platform = new Platform(body.name, serieId)
//   await platform.update(`Platform#${id}`, platform)

//   return {
//     statusCode: 204,
//     body: JSON.stringify(
//       {},
//       null,
//       2
//     ),
//   }
// }

