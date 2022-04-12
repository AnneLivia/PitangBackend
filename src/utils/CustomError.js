/* eslint-disable max-classes-per-file */
class GeneralError extends Error {
  constructor(message, statusCode = 500, listOfErrors = undefined) {
    super();
    this.statusCode = statusCode;
    this.message = message;
    // listOfErrors is used to exibit the list of errors from Joi.
    this.listOfErrors = listOfErrors;
  }
}

class BadRequest extends GeneralError {
  constructor(message, listOfErrors) {
    super(message, 400, listOfErrors);
  }
}

class NotFound extends GeneralError {
  constructor(message, listOfErrors) {
    super(message, 404, listOfErrors);
  }
}

export { GeneralError, BadRequest, NotFound };
