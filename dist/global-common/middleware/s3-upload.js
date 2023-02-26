"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.commonConfigure = void 0;
var _awsSdk = _interopRequireDefault(require("aws-sdk"));
var _env = require("@global-common/constants/env");
var _multerS = _interopRequireDefault(require("multer-s3"));
var _logger = require("@global-common/utils/logger");
var _lodash = _interopRequireDefault(require("lodash"));
var _httpError = require("@global-common/error/http-error");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const logger = (0, _logger.getLogger)('upload.ts');
const s3 = new _awsSdk.default.S3({
  region: _env.commonEnv.AWS_REGION
});
const bucket = _env.commonEnv.AWS_BUCKET;
const limits = {
  fileSize: 20 * 1024 * 1024
};
const fileWhiteList = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
const fileFilter = (req, file, cb) => {
  _lodash.default.includes(fileWhiteList, file.mimetype) ? cb(null, true) : cb(new _httpError.BadRequest(_httpError.INVALID_INPUT, `Do not allow type: ${file.mimetype}`));
};
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJsb2dnZXIiLCJnZXRMb2dnZXIiLCJzMyIsImF3cyIsIlMzIiwicmVnaW9uIiwiY29tbW9uRW52IiwiQVdTX1JFR0lPTiIsImJ1Y2tldCIsIkFXU19CVUNLRVQiLCJsaW1pdHMiLCJmaWxlU2l6ZSIsImZpbGVXaGl0ZUxpc3QiLCJmaWxlRmlsdGVyIiwicmVxIiwiZmlsZSIsImNiIiwiXyIsImluY2x1ZGVzIiwibWltZXR5cGUiLCJCYWRSZXF1ZXN0IiwiSU5WQUxJRF9JTlBVVCIsImNvbW1vbkNvbmZpZ3VyZSIsImFjbCIsInNlcnZlclNpZGVFbmNyeXB0aW9uIiwiY29udGVudFR5cGUiLCJtdWx0ZXJTMyIsIkFVVE9fQ09OVEVOVF9UWVBFIiwibWV0YWRhdGEiLCJnZXRNZXRhZGF0YSIsImluZm8iLCJmaWVsZG5hbWUiLCJvcmlnaW5hbG5hbWUiLCJlbmNvZGVVUklDb21wb25lbnQiXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZ2xvYmFsLWNvbW1vbi9taWRkbGV3YXJlL3MzLXVwbG9hZC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXdzIGZyb20gJ2F3cy1zZGsnXG5pbXBvcnQgeyBjb21tb25FbnYgfSBmcm9tICdAZ2xvYmFsLWNvbW1vbi9jb25zdGFudHMvZW52J1xuaW1wb3J0IG11bHRlclMzIGZyb20gJ211bHRlci1zMydcbmltcG9ydCB7IGdldExvZ2dlciB9IGZyb20gJ0BnbG9iYWwtY29tbW9uL3V0aWxzL2xvZ2dlcidcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCdcbmltcG9ydCB7IEJhZFJlcXVlc3QsIElOVkFMSURfSU5QVVQgfSBmcm9tICdAZ2xvYmFsLWNvbW1vbi9lcnJvci9odHRwLWVycm9yJ1xuXG5jb25zdCBsb2dnZXIgPSBnZXRMb2dnZXIoJ3VwbG9hZC50cycpXG5cbmNvbnN0IHMzID0gbmV3IGF3cy5TMyh7IHJlZ2lvbjogY29tbW9uRW52LkFXU19SRUdJT04gfSlcbmNvbnN0IGJ1Y2tldCA9IGNvbW1vbkVudi5BV1NfQlVDS0VUXG5jb25zdCBsaW1pdHMgPSB7IGZpbGVTaXplOiAyMCAqIDEwMjQgKiAxMDI0IH1cbmNvbnN0IGZpbGVXaGl0ZUxpc3QgPSBbJ2ltYWdlL2pwZWcnLCAnaW1hZ2UvanBnJywgJ2ltYWdlL3BuZycsICdpbWFnZS9naWYnXVxuY29uc3QgZmlsZUZpbHRlciA9IChyZXEsIGZpbGUsIGNiKSA9PiB7XG4gIF8uaW5jbHVkZXMoZmlsZVdoaXRlTGlzdCwgZmlsZS5taW1ldHlwZSkgPyBjYihudWxsLCB0cnVlKSA6IGNiKG5ldyBCYWRSZXF1ZXN0KElOVkFMSURfSU5QVVQsIGBEbyBub3QgYWxsb3cgdHlwZTogJHtmaWxlLm1pbWV0eXBlfWApKVxufVxuZXhwb3J0IGNvbnN0IGNvbW1vbkNvbmZpZ3VyZSA9IHtcbiAgczMsXG4gIGJ1Y2tldCxcbiAgYWNsOiAncHVibGljLXJlYWQnLFxuICBzZXJ2ZXJTaWRlRW5jcnlwdGlvbjogJ0FFUzI1NicsXG4gIGNvbnRlbnRUeXBlOiBtdWx0ZXJTMy5BVVRPX0NPTlRFTlRfVFlQRSxcbiAgbWV0YWRhdGE6IGZ1bmN0aW9uIChyZXEsIGZpbGUsIGNiKSB7XG4gICAgY2IobnVsbCwgZ2V0TWV0YWRhdGEoZmlsZSkpXG4gIH0sXG59XG5cbmZ1bmN0aW9uIGdldE1ldGFkYXRhIChmaWxlKSB7XG4gIGxvZ2dlci5pbmZvKCdfX2dldE1ldGFkYXRhX18nKVxuICBsb2dnZXIuaW5mbyhmaWxlKVxuICByZXR1cm4ge1xuICAgIGZpZWxkbmFtZTogZmlsZS5maWVsZG5hbWUsXG4gICAgb3JpZ2luYWxuYW1lOiBlbmNvZGVVUklDb21wb25lbnQoZmlsZS5vcmlnaW5hbG5hbWUpLFxuICAgIG1pbWV0eXBlOiBmaWxlLm1pbWV0eXBlLFxuICB9XG59XG4iXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUEyRTtBQUUzRSxNQUFNQSxNQUFNLEdBQUcsSUFBQUMsaUJBQVMsRUFBQyxXQUFXLENBQUM7QUFFckMsTUFBTUMsRUFBRSxHQUFHLElBQUlDLGVBQUcsQ0FBQ0MsRUFBRSxDQUFDO0VBQUVDLE1BQU0sRUFBRUMsY0FBUyxDQUFDQztBQUFXLENBQUMsQ0FBQztBQUN2RCxNQUFNQyxNQUFNLEdBQUdGLGNBQVMsQ0FBQ0csVUFBVTtBQUNuQyxNQUFNQyxNQUFNLEdBQUc7RUFBRUMsUUFBUSxFQUFFLEVBQUUsR0FBRyxJQUFJLEdBQUc7QUFBSyxDQUFDO0FBQzdDLE1BQU1DLGFBQWEsR0FBRyxDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLFdBQVcsQ0FBQztBQUMzRSxNQUFNQyxVQUFVLEdBQUcsQ0FBQ0MsR0FBRyxFQUFFQyxJQUFJLEVBQUVDLEVBQUUsS0FBSztFQUNwQ0MsZUFBQyxDQUFDQyxRQUFRLENBQUNOLGFBQWEsRUFBRUcsSUFBSSxDQUFDSSxRQUFRLENBQUMsR0FBR0gsRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsR0FBR0EsRUFBRSxDQUFDLElBQUlJLHFCQUFVLENBQUNDLHdCQUFhLEVBQUcsc0JBQXFCTixJQUFJLENBQUNJLFFBQVMsRUFBQyxDQUFDLENBQUM7QUFDdEksQ0FBQztBQUNNLE1BQU1HLGVBQWUsR0FBRztFQUM3QnBCLEVBQUU7RUFDRk0sTUFBTTtFQUNOZSxHQUFHLEVBQUUsYUFBYTtFQUNsQkMsb0JBQW9CLEVBQUUsUUFBUTtFQUM5QkMsV0FBVyxFQUFFQyxnQkFBUSxDQUFDQyxpQkFBaUI7RUFDdkNDLFFBQVEsRUFBRSxVQUFVZCxHQUFHLEVBQUVDLElBQUksRUFBRUMsRUFBRSxFQUFFO0lBQ2pDQSxFQUFFLENBQUMsSUFBSSxFQUFFYSxXQUFXLENBQUNkLElBQUksQ0FBQyxDQUFDO0VBQzdCO0FBQ0YsQ0FBQztBQUFBO0FBRUQsU0FBU2MsV0FBVyxDQUFFZCxJQUFJLEVBQUU7RUFDMUJmLE1BQU0sQ0FBQzhCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztFQUM5QjlCLE1BQU0sQ0FBQzhCLElBQUksQ0FBQ2YsSUFBSSxDQUFDO0VBQ2pCLE9BQU87SUFDTGdCLFNBQVMsRUFBRWhCLElBQUksQ0FBQ2dCLFNBQVM7SUFDekJDLFlBQVksRUFBRUMsa0JBQWtCLENBQUNsQixJQUFJLENBQUNpQixZQUFZLENBQUM7SUFDbkRiLFFBQVEsRUFBRUosSUFBSSxDQUFDSTtFQUNqQixDQUFDO0FBQ0gifQ==