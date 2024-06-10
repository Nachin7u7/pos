import { Response } from 'express';
import { HTTP_STATUS } from '../constants/httpStatus';

/**
 * Envía una respuesta HTTP de éxito.
 * @param res Objeto de respuesta Express.
 * @param data Datos a enviar en la respuesta.
 * @param message Mensaje a enviar en la respuesta.
 * @param statusCode Código de estado HTTP, por defecto 200 (OK).
 */
const sendOkResponse = (
  res: Response,
  data: any,
  message: string,
  statusCode: number = HTTP_STATUS.OK
) => {
  res.status(statusCode).json({
    success: true,
    code: statusCode,
    data,
    error: null,
  });
};

const sendCreatedResponse = (
  res: Response,
  message: string,
  data: any
): void => {
  res.status(HTTP_STATUS.CREATED).json({
    success: true,
    code: HTTP_STATUS.CREATED,
    data,
    error: null,
  });
};

export { sendOkResponse, sendCreatedResponse };
