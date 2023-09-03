import ErrorCodeMessage from '../config/ErrorCodeMessage';

class HandlerResponseException {
  static handle(error: Error): { [key: string]: any } {
    if (error.message === ErrorCodeMessage.INVALID_CREDENTIAL) {
      return {
        statusCode: 401,
        body: JSON.stringify(
          {
            message: 'Credentials invalid!',
          },
          null,
          2,
        ),
      };
    }

    if (error.message === ErrorCodeMessage.SERIE_NOT_FOUND) {
      return {
        statusCode: 404,
        body: JSON.stringify(
          {
            message: 'Serie not found!',
          },
          null,
          2,
        ),
      };
    }

    if (error.message === ErrorCodeMessage.SEASON_NOT_FOUND) {
      return {
        statusCode: 404,
        body: JSON.stringify(
          {
            message: 'Season not found!',
          },
          null,
          2,
        ),
      };
    }

    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          message: 'Internal server error!',
        },
        null,
        2,
      ),
    };
  }
}

export default HandlerResponseException;
