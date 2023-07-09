import { HttpStatus } from '@nestjs/common';

export interface IJsonResponse<T> {
  success: boolean;
  result: T | null;
  error: any;
  errorMessage: string | null;
  statusCode?: HttpStatus;
}
