"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeJWT = makeJWT;
exports.makeNewAccessToken = makeNewAccessToken;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _logger = require("@global-common/utils/logger");
var _enum = require("@global-common/constants/enum");
var _env = require("@global-common/constants/env");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const logger = (0, _logger.getLogger)('make-jwt.ts');
function makeJWT(id, type, deviceId) {
  logger.info('makeJWT id type= ', id, type);
  const accessToken = _jsonwebtoken.default.sign({
    id,
    token: _enum.JwtTokenType.ACCESS,
    type,
    deviceId
  }, _env.commonEnv.JWT_SECRET_KEY, {
    expiresIn: _env.commonEnv.JWT_ACCESS_EXPIRES_IN
  });
  const refreshToken = _jsonwebtoken.default.sign({
    id,
    token: _enum.JwtTokenType.REFRESH,
    type,
    deviceId
  }, _env.commonEnv.JWT_SECRET_KEY, {
    expiresIn: _env.commonEnv.JWT_REFRESH_EXPIRES_IN
  });
  return {
    accessToken,
    refreshToken
  };
}
function makeNewAccessToken(id, type, deviceId) {
  logger.info('makeNewAccessToken id, type = ', id, type);
  const accessToken = _jsonwebtoken.default.sign({
    id,
    token: _enum.JwtTokenType.ACCESS,
    type,
    deviceId
  }, _env.commonEnv.JWT_SECRET_KEY, {
    expiresIn: _env.commonEnv.JWT_ACCESS_EXPIRES_IN
  });
  return {
    accessToken
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJsb2dnZXIiLCJnZXRMb2dnZXIiLCJtYWtlSldUIiwiaWQiLCJ0eXBlIiwiZGV2aWNlSWQiLCJpbmZvIiwiYWNjZXNzVG9rZW4iLCJqd3QiLCJzaWduIiwidG9rZW4iLCJKd3RUb2tlblR5cGUiLCJBQ0NFU1MiLCJjb21tb25FbnYiLCJKV1RfU0VDUkVUX0tFWSIsImV4cGlyZXNJbiIsIkpXVF9BQ0NFU1NfRVhQSVJFU19JTiIsInJlZnJlc2hUb2tlbiIsIlJFRlJFU0giLCJKV1RfUkVGUkVTSF9FWFBJUkVTX0lOIiwibWFrZU5ld0FjY2Vzc1Rva2VuIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2dsb2JhbC1jb21tb24vdXRpbHMvbWFrZS1qd3QudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGp3dCBmcm9tICdqc29ud2VidG9rZW4nXG5cbmltcG9ydCB7IGdldExvZ2dlciB9IGZyb20gJ0BnbG9iYWwtY29tbW9uL3V0aWxzL2xvZ2dlcidcbmltcG9ydCB7IEp3dFRva2VuVHlwZSwgVXNlclR5cGUgfSBmcm9tICdAZ2xvYmFsLWNvbW1vbi9jb25zdGFudHMvZW51bSdcbmltcG9ydCB7IGNvbW1vbkVudiB9IGZyb20gJ0BnbG9iYWwtY29tbW9uL2NvbnN0YW50cy9lbnYnXG5cbmNvbnN0IGxvZ2dlciA9IGdldExvZ2dlcignbWFrZS1qd3QudHMnKVxuXG5leHBvcnQgZnVuY3Rpb24gbWFrZUpXVCAoaWQ6IG51bWJlciwgdHlwZTogVXNlclR5cGUsIGRldmljZUlkPzogc3RyaW5nKSB7XG4gIGxvZ2dlci5pbmZvKCdtYWtlSldUIGlkIHR5cGU9ICcsIGlkLCB0eXBlKVxuXG4gIGNvbnN0IGFjY2Vzc1Rva2VuID0gand0LnNpZ24oe1xuICAgIGlkLFxuICAgIHRva2VuOiBKd3RUb2tlblR5cGUuQUNDRVNTLFxuICAgIHR5cGUsXG4gICAgZGV2aWNlSWQsXG4gIH0sIGNvbW1vbkVudi5KV1RfU0VDUkVUX0tFWSwgeyBleHBpcmVzSW46IGNvbW1vbkVudi5KV1RfQUNDRVNTX0VYUElSRVNfSU4gfSlcblxuICBjb25zdCByZWZyZXNoVG9rZW4gPSBqd3Quc2lnbih7XG4gICAgaWQsXG4gICAgdG9rZW46IEp3dFRva2VuVHlwZS5SRUZSRVNILFxuICAgIHR5cGUsXG4gICAgZGV2aWNlSWQsXG4gIH0sIGNvbW1vbkVudi5KV1RfU0VDUkVUX0tFWSwgeyBleHBpcmVzSW46IGNvbW1vbkVudi5KV1RfUkVGUkVTSF9FWFBJUkVTX0lOIH0pXG5cbiAgcmV0dXJuIHsgYWNjZXNzVG9rZW4sIHJlZnJlc2hUb2tlbiB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWtlTmV3QWNjZXNzVG9rZW4gKGlkOiBudW1iZXIsIHR5cGU6IFVzZXJUeXBlLCBkZXZpY2VJZD86IHN0cmluZykge1xuICBsb2dnZXIuaW5mbygnbWFrZU5ld0FjY2Vzc1Rva2VuIGlkLCB0eXBlID0gJywgaWQsIHR5cGUpXG5cbiAgY29uc3QgYWNjZXNzVG9rZW4gPSBqd3Quc2lnbih7XG4gICAgaWQsXG4gICAgdG9rZW46IEp3dFRva2VuVHlwZS5BQ0NFU1MsXG4gICAgdHlwZSxcbiAgICBkZXZpY2VJZCxcbiAgfSwgY29tbW9uRW52LkpXVF9TRUNSRVRfS0VZLCB7IGV4cGlyZXNJbjogY29tbW9uRW52LkpXVF9BQ0NFU1NfRVhQSVJFU19JTiB9KVxuXG4gIHJldHVybiB7IGFjY2Vzc1Rva2VuIH1cbn1cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQXdEO0FBRXhELE1BQU1BLE1BQU0sR0FBRyxJQUFBQyxpQkFBUyxFQUFDLGFBQWEsQ0FBQztBQUVoQyxTQUFTQyxPQUFPLENBQUVDLEVBQVUsRUFBRUMsSUFBYyxFQUFFQyxRQUFpQixFQUFFO0VBQ3RFTCxNQUFNLENBQUNNLElBQUksQ0FBQyxtQkFBbUIsRUFBRUgsRUFBRSxFQUFFQyxJQUFJLENBQUM7RUFFMUMsTUFBTUcsV0FBVyxHQUFHQyxxQkFBRyxDQUFDQyxJQUFJLENBQUM7SUFDM0JOLEVBQUU7SUFDRk8sS0FBSyxFQUFFQyxrQkFBWSxDQUFDQyxNQUFNO0lBQzFCUixJQUFJO0lBQ0pDO0VBQ0YsQ0FBQyxFQUFFUSxjQUFTLENBQUNDLGNBQWMsRUFBRTtJQUFFQyxTQUFTLEVBQUVGLGNBQVMsQ0FBQ0c7RUFBc0IsQ0FBQyxDQUFDO0VBRTVFLE1BQU1DLFlBQVksR0FBR1QscUJBQUcsQ0FBQ0MsSUFBSSxDQUFDO0lBQzVCTixFQUFFO0lBQ0ZPLEtBQUssRUFBRUMsa0JBQVksQ0FBQ08sT0FBTztJQUMzQmQsSUFBSTtJQUNKQztFQUNGLENBQUMsRUFBRVEsY0FBUyxDQUFDQyxjQUFjLEVBQUU7SUFBRUMsU0FBUyxFQUFFRixjQUFTLENBQUNNO0VBQXVCLENBQUMsQ0FBQztFQUU3RSxPQUFPO0lBQUVaLFdBQVc7SUFBRVU7RUFBYSxDQUFDO0FBQ3RDO0FBRU8sU0FBU0csa0JBQWtCLENBQUVqQixFQUFVLEVBQUVDLElBQWMsRUFBRUMsUUFBaUIsRUFBRTtFQUNqRkwsTUFBTSxDQUFDTSxJQUFJLENBQUMsZ0NBQWdDLEVBQUVILEVBQUUsRUFBRUMsSUFBSSxDQUFDO0VBRXZELE1BQU1HLFdBQVcsR0FBR0MscUJBQUcsQ0FBQ0MsSUFBSSxDQUFDO0lBQzNCTixFQUFFO0lBQ0ZPLEtBQUssRUFBRUMsa0JBQVksQ0FBQ0MsTUFBTTtJQUMxQlIsSUFBSTtJQUNKQztFQUNGLENBQUMsRUFBRVEsY0FBUyxDQUFDQyxjQUFjLEVBQUU7SUFBRUMsU0FBUyxFQUFFRixjQUFTLENBQUNHO0VBQXNCLENBQUMsQ0FBQztFQUU1RSxPQUFPO0lBQUVUO0VBQVksQ0FBQztBQUN4QiJ9