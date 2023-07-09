import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { IJsonResponse } from 'src/interfaces/common.interface';

export const emptyResponse = <T>(): IJsonResponse<T> => {
  return {
    success: false,
    result: null,
    error: null,
    errorMessage: null,
    statusCode: 200,
  };
};

export const successResponse = <T>(
  res: Response,
  result: T,
  statusCode?: HttpStatus,
) => {
  const jsonResponse = emptyResponse<T>();
  jsonResponse.success = true;
  jsonResponse.result = result;
  return res.status(statusCode || 200).json(jsonResponse);
};
export const errorResponse = <T>(
  res: Response,
  errorMessage: string,
  error: any,
  statusCode?: HttpStatus,
) => {
  const jsonResponse = emptyResponse<T>();
  jsonResponse.error = error;
  jsonResponse.errorMessage = errorMessage;
  return res.status(statusCode || 400).json(jsonResponse);
};
