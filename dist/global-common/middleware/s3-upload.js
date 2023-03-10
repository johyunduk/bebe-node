"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.commonConfigure = void 0;
var _awsSdk = _interopRequireDefault(require("aws-sdk"));
var _env = require("@global-common/constants/env");
var _multerS = _interopRequireDefault(require("multer-s3"));
var _logger = require("@global-common/utils/logger");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const logger = (0, _logger.getLogger)('upload.ts');
const s3 = new _awsSdk.default.S3({
  region: _env.commonEnv.AWS_REGION
});
const bucket = _env.commonEnv.AWS_BUCKET;
const commonConfigure = {
  s3,
  bucket,
  acl: 'public-read',
  serverSideEncryption: 'AES256',
  contentType: _multerS.default.AUTO_CONTENT_TYPE,
  metadata: function (req, file, cb) {
    cb(null, getMetadata(file));
  }
};
exports.commonConfigure = commonConfigure;
function getMetadata(file) {
  logger.info('__getMetadata__');
  logger.info(file);
  return {
    fieldname: file.fieldname,
    originalname: encodeURIComponent(file.originalname),
    mimetype: file.mimetype
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJsb2dnZXIiLCJnZXRMb2dnZXIiLCJzMyIsImF3cyIsIlMzIiwicmVnaW9uIiwiY29tbW9uRW52IiwiQVdTX1JFR0lPTiIsImJ1Y2tldCIsIkFXU19CVUNLRVQiLCJjb21tb25Db25maWd1cmUiLCJhY2wiLCJzZXJ2ZXJTaWRlRW5jcnlwdGlvbiIsImNvbnRlbnRUeXBlIiwibXVsdGVyUzMiLCJBVVRPX0NPTlRFTlRfVFlQRSIsIm1ldGFkYXRhIiwicmVxIiwiZmlsZSIsImNiIiwiZ2V0TWV0YWRhdGEiLCJpbmZvIiwiZmllbGRuYW1lIiwib3JpZ2luYWxuYW1lIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwibWltZXR5cGUiXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZ2xvYmFsLWNvbW1vbi9taWRkbGV3YXJlL3MzLXVwbG9hZC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXdzIGZyb20gJ2F3cy1zZGsnXG5pbXBvcnQgeyBjb21tb25FbnYgfSBmcm9tICdAZ2xvYmFsLWNvbW1vbi9jb25zdGFudHMvZW52J1xuaW1wb3J0IG11bHRlclMzIGZyb20gJ211bHRlci1zMydcbmltcG9ydCB7IGdldExvZ2dlciB9IGZyb20gJ0BnbG9iYWwtY29tbW9uL3V0aWxzL2xvZ2dlcidcblxuY29uc3QgbG9nZ2VyID0gZ2V0TG9nZ2VyKCd1cGxvYWQudHMnKVxuXG5jb25zdCBzMyA9IG5ldyBhd3MuUzMoeyByZWdpb246IGNvbW1vbkVudi5BV1NfUkVHSU9OIH0pXG5jb25zdCBidWNrZXQgPSBjb21tb25FbnYuQVdTX0JVQ0tFVFxuXG5leHBvcnQgY29uc3QgY29tbW9uQ29uZmlndXJlID0ge1xuICBzMyxcbiAgYnVja2V0LFxuICBhY2w6ICdwdWJsaWMtcmVhZCcsXG4gIHNlcnZlclNpZGVFbmNyeXB0aW9uOiAnQUVTMjU2JyxcbiAgY29udGVudFR5cGU6IG11bHRlclMzLkFVVE9fQ09OVEVOVF9UWVBFLFxuICBtZXRhZGF0YTogZnVuY3Rpb24gKHJlcSwgZmlsZSwgY2IpIHtcbiAgICBjYihudWxsLCBnZXRNZXRhZGF0YShmaWxlKSlcbiAgfSxcbn1cblxuZnVuY3Rpb24gZ2V0TWV0YWRhdGEgKGZpbGUpIHtcbiAgbG9nZ2VyLmluZm8oJ19fZ2V0TWV0YWRhdGFfXycpXG4gIGxvZ2dlci5pbmZvKGZpbGUpXG4gIHJldHVybiB7XG4gICAgZmllbGRuYW1lOiBmaWxlLmZpZWxkbmFtZSxcbiAgICBvcmlnaW5hbG5hbWU6IGVuY29kZVVSSUNvbXBvbmVudChmaWxlLm9yaWdpbmFsbmFtZSksXG4gICAgbWltZXR5cGU6IGZpbGUubWltZXR5cGUsXG4gIH1cbn1cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBdUQ7QUFFdkQsTUFBTUEsTUFBTSxHQUFHLElBQUFDLGlCQUFTLEVBQUMsV0FBVyxDQUFDO0FBRXJDLE1BQU1DLEVBQUUsR0FBRyxJQUFJQyxlQUFHLENBQUNDLEVBQUUsQ0FBQztFQUFFQyxNQUFNLEVBQUVDLGNBQVMsQ0FBQ0M7QUFBVyxDQUFDLENBQUM7QUFDdkQsTUFBTUMsTUFBTSxHQUFHRixjQUFTLENBQUNHLFVBQVU7QUFFNUIsTUFBTUMsZUFBZSxHQUFHO0VBQzdCUixFQUFFO0VBQ0ZNLE1BQU07RUFDTkcsR0FBRyxFQUFFLGFBQWE7RUFDbEJDLG9CQUFvQixFQUFFLFFBQVE7RUFDOUJDLFdBQVcsRUFBRUMsZ0JBQVEsQ0FBQ0MsaUJBQWlCO0VBQ3ZDQyxRQUFRLEVBQUUsVUFBVUMsR0FBRyxFQUFFQyxJQUFJLEVBQUVDLEVBQUUsRUFBRTtJQUNqQ0EsRUFBRSxDQUFDLElBQUksRUFBRUMsV0FBVyxDQUFDRixJQUFJLENBQUMsQ0FBQztFQUM3QjtBQUNGLENBQUM7QUFBQTtBQUVELFNBQVNFLFdBQVcsQ0FBRUYsSUFBSSxFQUFFO0VBQzFCbEIsTUFBTSxDQUFDcUIsSUFBSSxDQUFDLGlCQUFpQixDQUFDO0VBQzlCckIsTUFBTSxDQUFDcUIsSUFBSSxDQUFDSCxJQUFJLENBQUM7RUFDakIsT0FBTztJQUNMSSxTQUFTLEVBQUVKLElBQUksQ0FBQ0ksU0FBUztJQUN6QkMsWUFBWSxFQUFFQyxrQkFBa0IsQ0FBQ04sSUFBSSxDQUFDSyxZQUFZLENBQUM7SUFDbkRFLFFBQVEsRUFBRVAsSUFBSSxDQUFDTztFQUNqQixDQUFDO0FBQ0gifQ==