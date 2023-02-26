"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.commonEnv = void 0;
exports.ensureMandatoryEnv = ensureMandatoryEnv;
const MANDATORY_ENV_LIST = [];
function ensureMandatoryEnv(mandatoryEnvList) {
  mandatoryEnvList.forEach(envName => {
    if (!process.env[envName]) {
      throw new Error(`Mandatory Environment Variable(${envName}) has not setup!`);
    }
  });
}
ensureMandatoryEnv(MANDATORY_ENV_LIST);
const {
  env
} = process;
const NODE_ENV = env.NODE_ENV || 'local';
const commonEnv = {
  NODE_ENV,
  API_VERSION: env.API_VERSION || 'api/v1',
  IS_DEV_ENV: NODE_ENV === 'local' || NODE_ENV === 'development',
  ALTER_TABLE: env.ALTER_TABLE || '',
  MY_NAME: env.MY_NAME,
  BEBE_DIARY_PORT: env.BEBE_DIARY_PORT,
  BEBE_DB_URL: env.BEBE_DB_URL,
  JWT_SECRET_KEY: env.JWT_SECRET_KEY,
  JWT_ACCESS_EXPIRES_IN: env.JWT_ACCESS_EXPIRES_IN,
  JWT_REFRESH_EXPIRES_IN: env.JWT_REFRESH_EXPIRES_IN
};
exports.commonEnv = commonEnv;
const dbNameFromUrl = (url, defalutVal) => url ? url.split('/').pop() : defalutVal;
commonEnv.BEBE_DB_NAME = dbNameFromUrl(commonEnv.BEBE_DB_NAME, 'bebe');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJNQU5EQVRPUllfRU5WX0xJU1QiLCJlbnN1cmVNYW5kYXRvcnlFbnYiLCJtYW5kYXRvcnlFbnZMaXN0IiwiZm9yRWFjaCIsImVudk5hbWUiLCJwcm9jZXNzIiwiZW52IiwiRXJyb3IiLCJOT0RFX0VOViIsImNvbW1vbkVudiIsIkFQSV9WRVJTSU9OIiwiSVNfREVWX0VOViIsIkFMVEVSX1RBQkxFIiwiTVlfTkFNRSIsIkJFQkVfRElBUllfUE9SVCIsIkJFQkVfREJfVVJMIiwiSldUX1NFQ1JFVF9LRVkiLCJKV1RfQUNDRVNTX0VYUElSRVNfSU4iLCJKV1RfUkVGUkVTSF9FWFBJUkVTX0lOIiwiZGJOYW1lRnJvbVVybCIsInVybCIsImRlZmFsdXRWYWwiLCJzcGxpdCIsInBvcCIsIkJFQkVfREJfTkFNRSJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9nbG9iYWwtY29tbW9uL2NvbnN0YW50cy9lbnYudHMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgTUFOREFUT1JZX0VOVl9MSVNUID0gW11cblxuZXhwb3J0IGZ1bmN0aW9uIGVuc3VyZU1hbmRhdG9yeUVudiAobWFuZGF0b3J5RW52TGlzdCkge1xuICBtYW5kYXRvcnlFbnZMaXN0LmZvckVhY2goKGVudk5hbWUpID0+IHtcbiAgICBpZiAoIXByb2Nlc3MuZW52W2Vudk5hbWVdKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYE1hbmRhdG9yeSBFbnZpcm9ubWVudCBWYXJpYWJsZSgke2Vudk5hbWV9KSBoYXMgbm90IHNldHVwIWApXG4gICAgfVxuICB9KVxufVxuXG5lbnN1cmVNYW5kYXRvcnlFbnYoTUFOREFUT1JZX0VOVl9MSVNUKVxuXG5jb25zdCB7IGVudiB9ID0gcHJvY2Vzc1xuY29uc3QgTk9ERV9FTlYgPSBlbnYuTk9ERV9FTlYgfHwgJ2xvY2FsJ1xuZXhwb3J0IGNvbnN0IGNvbW1vbkVudjogYW55ID0ge1xuICBOT0RFX0VOVixcbiAgQVBJX1ZFUlNJT046IGVudi5BUElfVkVSU0lPTiB8fCAnYXBpL3YxJyxcbiAgSVNfREVWX0VOVjogTk9ERV9FTlYgPT09ICdsb2NhbCcgfHwgTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcsXG5cbiAgQUxURVJfVEFCTEU6IGVudi5BTFRFUl9UQUJMRSB8fCAnJyxcbiAgTVlfTkFNRTogZW52Lk1ZX05BTUUsXG5cbiAgQkVCRV9ESUFSWV9QT1JUOiBlbnYuQkVCRV9ESUFSWV9QT1JULFxuXG4gIEJFQkVfREJfVVJMOiBlbnYuQkVCRV9EQl9VUkwsXG5cbiAgSldUX1NFQ1JFVF9LRVk6IGVudi5KV1RfU0VDUkVUX0tFWSxcbiAgSldUX0FDQ0VTU19FWFBJUkVTX0lOOiBlbnYuSldUX0FDQ0VTU19FWFBJUkVTX0lOLFxuICBKV1RfUkVGUkVTSF9FWFBJUkVTX0lOOiBlbnYuSldUX1JFRlJFU0hfRVhQSVJFU19JTixcbn1cblxuY29uc3QgZGJOYW1lRnJvbVVybCA9ICh1cmwsIGRlZmFsdXRWYWwpID0+ICh1cmwgPyB1cmwuc3BsaXQoJy8nKS5wb3AoKSA6IGRlZmFsdXRWYWwpXG5jb21tb25FbnYuQkVCRV9EQl9OQU1FID0gZGJOYW1lRnJvbVVybChjb21tb25FbnYuQkVCRV9EQl9OQU1FLCAnYmViZScpXG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxNQUFNQSxrQkFBa0IsR0FBRyxFQUFFO0FBRXRCLFNBQVNDLGtCQUFrQixDQUFFQyxnQkFBZ0IsRUFBRTtFQUNwREEsZ0JBQWdCLENBQUNDLE9BQU8sQ0FBRUMsT0FBTyxJQUFLO0lBQ3BDLElBQUksQ0FBQ0MsT0FBTyxDQUFDQyxHQUFHLENBQUNGLE9BQU8sQ0FBQyxFQUFFO01BQ3pCLE1BQU0sSUFBSUcsS0FBSyxDQUFFLGtDQUFpQ0gsT0FBUSxrQkFBaUIsQ0FBQztJQUM5RTtFQUNGLENBQUMsQ0FBQztBQUNKO0FBRUFILGtCQUFrQixDQUFDRCxrQkFBa0IsQ0FBQztBQUV0QyxNQUFNO0VBQUVNO0FBQUksQ0FBQyxHQUFHRCxPQUFPO0FBQ3ZCLE1BQU1HLFFBQVEsR0FBR0YsR0FBRyxDQUFDRSxRQUFRLElBQUksT0FBTztBQUNqQyxNQUFNQyxTQUFjLEdBQUc7RUFDNUJELFFBQVE7RUFDUkUsV0FBVyxFQUFFSixHQUFHLENBQUNJLFdBQVcsSUFBSSxRQUFRO0VBQ3hDQyxVQUFVLEVBQUVILFFBQVEsS0FBSyxPQUFPLElBQUlBLFFBQVEsS0FBSyxhQUFhO0VBRTlESSxXQUFXLEVBQUVOLEdBQUcsQ0FBQ00sV0FBVyxJQUFJLEVBQUU7RUFDbENDLE9BQU8sRUFBRVAsR0FBRyxDQUFDTyxPQUFPO0VBRXBCQyxlQUFlLEVBQUVSLEdBQUcsQ0FBQ1EsZUFBZTtFQUVwQ0MsV0FBVyxFQUFFVCxHQUFHLENBQUNTLFdBQVc7RUFFNUJDLGNBQWMsRUFBRVYsR0FBRyxDQUFDVSxjQUFjO0VBQ2xDQyxxQkFBcUIsRUFBRVgsR0FBRyxDQUFDVyxxQkFBcUI7RUFDaERDLHNCQUFzQixFQUFFWixHQUFHLENBQUNZO0FBQzlCLENBQUM7QUFBQTtBQUVELE1BQU1DLGFBQWEsR0FBRyxDQUFDQyxHQUFHLEVBQUVDLFVBQVUsS0FBTUQsR0FBRyxHQUFHQSxHQUFHLENBQUNFLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsR0FBRyxFQUFFLEdBQUdGLFVBQVc7QUFDcEZaLFNBQVMsQ0FBQ2UsWUFBWSxHQUFHTCxhQUFhLENBQUNWLFNBQVMsQ0FBQ2UsWUFBWSxFQUFFLE1BQU0sQ0FBQyJ9