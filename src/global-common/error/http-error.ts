/* Worker error code */
export const NO_USER = 'NO_USER'
export const INVALID_PASSWORD = 'INVALID_PASSWORD'
export const INVALID_MEMBER = 'INVALID_MEMBER'
export const RESTRICTED_USER = 'RESTRICTED_USER'
export const DELETED_USER = 'DELETED_USER'
export const NOT_PROPER_AUTH = 'NOT_PROPER_AUTH'
export const NO_AUTH = 'NO_AUTH'
export const NOT_MEMBER = 'NOT_MEMBER'
export const EXIST_ATTEND_CANCELED = 'EXIST_ATTEND_CANCELED'
export const EXCEED_ACCOUNT = 'EXCEED_ACCOUNT'
export const EXCEED_REQUEST = 'EXCEED_REQUEST'
export const EXIST_TRANSFERRING = 'EXIST_TRANSFERRING'

// common error
export const ALREADY_EXISTS = 'ALREADY_EXISTS'
export const INVALID_INPUT = 'INVALID_INPUT'
export const NO_URL_OR_METHOD = 'NO_URL_OR_METHOD'
export const NO_RESOURCE = 'NO_RESOURCE'
export const INVALID_KEY = 'INVALID_KEY'
export const RESOURCE_CONFLICT = 'RESOURCE_CONFLICT'
export const INVALID_REQUEST = 'INVALID_REQUEST'
export const EXT_API_CALL_FAIL = 'EXT_API_CALL_FAIL'
export const INT_API_CALL_FAIL = 'INT_API_CALL_FAIL'
export const FORBIDDEN_FILE = 'FORBIDDEN_FILE'
export const DUPLICATE_REQUEST = 'DUPLICATE_REQUEST'
export const INTERNAL_SERVER_PROBLEM = 'INTERNAL_SERVER_PROBLEM'

// otp
export const OTP_NOT_MATCH = 'OTP_NOT_MATCH'
export const EXCEED_OTP_REQUEST_PER_DAY = 'EXCEED_OTP_REQUEST_PER_DAY'
export const OTP_TIME_OUT = 'OTP_TIME_OUT'

// admin error
export const NOT_ACTIVATED = 'NOT_ACTIVATED'
export const AWAITING_APPROVAL = 'AWAITING_APPROVAL'

// version errror
export const OBSOLETE_VERSION = 'OBSOLETE_VERSION'

/* etc error code */
export const NO_DATA = 'NO_DATA'

/* JWT error code */
export const NO_JWT = 'NO_JWT'
export const INVALID_JWT = 'INVALID_JWT'
export const EXPIRED_JWT = 'EXPIRED_JWT'
export const NO_USER_ABOUT_JWT = 'NO_USER_ABOUT_JWT'
export const NOT_EXPIRED_JWT = 'NOT_EXPIRED_JWT'
export const INVALID_REFRESH_JWT = 'INVALID_REFRESH_JWT'
export const EXPIRED_REFRESH_JWT = 'EXPIRED_REFRESH_JWT'
export const NOT_AUTHORIZED = 'NOT_AUTHORIZED'

// encypt / decrypt
export const ENCRYPT_FAILED = 'ECRYPT_FAILED'

export class AppError extends Error {
  constructor (public code, message, public status = BadRequest.STATUS) {
    super(message)
  }
}

export class BadRequest extends AppError {
  static STATUS = 400
  constructor (code, message, status = BadRequest.STATUS) {
    super(code, message, status)
  }
}

export class Unauthorized extends AppError {
  static STATUS = 401
  constructor (code, message, status = Unauthorized.STATUS) {
    super(code, message, status)
  }
}

export class Forbidden extends AppError {
  static STATUS = 403
  constructor (code, message, status = Forbidden.STATUS) {
    super(code, message, status)
  }
}

export class NotFound extends AppError {
  static STATUS = 404
  constructor (code, message, status = NotFound.STATUS) {
    super(code, message, status)
  }
}

export class Conflict extends AppError {
  static STATUS = 409
  constructor (code, message, status = Conflict.STATUS) {
    super(code, message, status)
  }
}

export class InternalServerError extends AppError {
  static STATUS = 500
  constructor (code = INTERNAL_SERVER_PROBLEM, message, status = InternalServerError.STATUS) {
    super(code, message, status)
  }
}

export class CallbackFailError extends AppError {
  static STATUS = 500
  constructor (code, message, status = CallbackFailError.STATUS) {
    super(code, message, status)
  }
}

export class InterruptError extends AppError {
  static STATUS = 500
  constructor (code, message, status = InterruptError.STATUS) {
    super(code, message, status)
  }
}
