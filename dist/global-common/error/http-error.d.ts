export declare const NO_USER = "NO_USER";
export declare const INVALID_PASSWORD = "INVALID_PASSWORD";
export declare const INVALID_MEMBER = "INVALID_MEMBER";
export declare const RESTRICTED_USER = "RESTRICTED_USER";
export declare const DELETED_USER = "DELETED_USER";
export declare const NOT_PROPER_AUTH = "NOT_PROPER_AUTH";
export declare const NO_AUTH = "NO_AUTH";
export declare const NOT_MEMBER = "NOT_MEMBER";
export declare const EXIST_ATTEND_CANCELED = "EXIST_ATTEND_CANCELED";
export declare const EXCEED_ACCOUNT = "EXCEED_ACCOUNT";
export declare const EXCEED_REQUEST = "EXCEED_REQUEST";
export declare const EXIST_TRANSFERRING = "EXIST_TRANSFERRING";
export declare const ALREADY_EXISTS = "ALREADY_EXISTS";
export declare const INVALID_INPUT = "INVALID_INPUT";
export declare const NO_URL_OR_METHOD = "NO_URL_OR_METHOD";
export declare const NO_RESOURCE = "NO_RESOURCE";
export declare const INVALID_KEY = "INVALID_KEY";
export declare const RESOURCE_CONFLICT = "RESOURCE_CONFLICT";
export declare const INVALID_REQUEST = "INVALID_REQUEST";
export declare const EXT_API_CALL_FAIL = "EXT_API_CALL_FAIL";
export declare const INT_API_CALL_FAIL = "INT_API_CALL_FAIL";
export declare const FORBIDDEN_FILE = "FORBIDDEN_FILE";
export declare const DUPLICATE_REQUEST = "DUPLICATE_REQUEST";
export declare const INTERNAL_SERVER_PROBLEM = "INTERNAL_SERVER_PROBLEM";
export declare const OTP_NOT_MATCH = "OTP_NOT_MATCH";
export declare const EXCEED_OTP_REQUEST_PER_DAY = "EXCEED_OTP_REQUEST_PER_DAY";
export declare const OTP_TIME_OUT = "OTP_TIME_OUT";
export declare const NOT_ACTIVATED = "NOT_ACTIVATED";
export declare const AWAITING_APPROVAL = "AWAITING_APPROVAL";
export declare const OBSOLETE_VERSION = "OBSOLETE_VERSION";
export declare const NO_DATA = "NO_DATA";
export declare const NO_JWT = "NO_JWT";
export declare const INVALID_JWT = "INVALID_JWT";
export declare const EXPIRED_JWT = "EXPIRED_JWT";
export declare const NO_USER_ABOUT_JWT = "NO_USER_ABOUT_JWT";
export declare const NOT_EXPIRED_JWT = "NOT_EXPIRED_JWT";
export declare const INVALID_REFRESH_JWT = "INVALID_REFRESH_JWT";
export declare const EXPIRED_REFRESH_JWT = "EXPIRED_REFRESH_JWT";
export declare const NOT_AUTHORIZED = "NOT_AUTHORIZED";
export declare const ENCRYPT_FAILED = "ECRYPT_FAILED";
export declare class AppError extends Error {
    code: any;
    status: number;
    constructor(code: any, message: any, status?: number);
}
export declare class BadRequest extends AppError {
    static STATUS: number;
    constructor(code: any, message: any, status?: number);
}
export declare class Unauthorized extends AppError {
    static STATUS: number;
    constructor(code: any, message: any, status?: number);
}
export declare class Forbidden extends AppError {
    static STATUS: number;
    constructor(code: any, message: any, status?: number);
}
export declare class NotFound extends AppError {
    static STATUS: number;
    constructor(code: any, message: any, status?: number);
}
export declare class Conflict extends AppError {
    static STATUS: number;
    constructor(code: any, message: any, status?: number);
}
export declare class BadEntity extends AppError {
    static STATUS: number;
    constructor(code: any, message: any, status?: number);
}
export declare class InternalServerError extends AppError {
    static STATUS: number;
    constructor(code: string, message: any, status?: number);
}
export declare class CallbackFailError extends AppError {
    static STATUS: number;
    constructor(code: any, message: any, status?: number);
}
export declare class InterruptError extends AppError {
    static STATUS: number;
    constructor(code: any, message: any, status?: number);
}
