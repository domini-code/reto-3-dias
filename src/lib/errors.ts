/**
 * Domain errors.
 *
 * Every error intentionally returned by the API is an `AppError` with a code
 * from the catalog. The error handler in `app.ts` maps it to HTTP. Nothing
 * else in the code throws strings or a bare `Error`: that becomes a 500.
 */
export const ERROR_CODES = {
  VALIDACION: 400,
  CLIENTE_NO_ENCONTRADO: 404,
  FACTURA_NO_ENCONTRADA: 404,
  RNC_DUPLICADO: 409,
  ESTADO_INVALIDO: 409,
} as const

export type ErrorCode = keyof typeof ERROR_CODES

export class AppError extends Error {
  readonly code: ErrorCode
  readonly status: number

  constructor(code: ErrorCode, message: string) {
    super(message)
    this.name = 'AppError'
    this.code = code
    this.status = ERROR_CODES[code]
  }

  get errorCode(): ErrorCode {
    return this.code
  }
}

export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError
}
