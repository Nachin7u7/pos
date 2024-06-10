import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS } from '../constants/httpStatus';

const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  return res.status(HTTP_STATUS.NOT_FOUND).json({
    success: false,
    code: HTTP_STATUS.NOT_FOUND,
    data: null,
    error: "API URL doesn't exist",
  });
};

const catchErrors = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
  return function(req: Request, res: Response, next: NextFunction) {
    return fn(req, res, next).catch((error: any) => {
      if (error.name === 'ValidationError') {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          code: HTTP_STATUS.BAD_REQUEST,
          data: null,
          error: {
            message: error.message,
            details: error.errors
          },
        });
      } else if (error.name === 'UnauthorizedError') {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
          success: false,
          code: HTTP_STATUS.UNAUTHORIZED,
          data: null,
          error: {
            message: 'Unauthorized access',
            details: error.message
          },
        });
      } 
    });
  };
};

export { notFoundHandler, catchErrors };
