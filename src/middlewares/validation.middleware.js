import { BadRequest } from '../utils/CustomError.js';

const validationMiddleware = (schema) => (req, res, next) => {
  const { error } = schema.validate(
    req.body,
    { abortEarly: false },
  );

  if (error) {
    return next(
      new BadRequest(
        'Os Dados fornecidos são inválidos',
        error.details.map(({ message }) => message),
      ),
    );
  }

  next();
};

export default validationMiddleware;
