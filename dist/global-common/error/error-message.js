"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorMessage = errorMessage;
const ERR_MSG = {
  EXT_API_CALL_FAIL: 'Unexpected error'
};
function errorMessage(errCode) {
  if (!errCode) {
    return 'An unexpected error.';
  }
  let msg = ERR_MSG[errCode];
  if (!msg) {
    msg = errCode.replace(/_/g, ' ') + ' Error.';
  }
  return msg;
}

// function errorMessage (errCode, serverMessage) {
//   if (!errCode) {
//     return 'An unexpected error.'
//   }

//   if (!serverMessage) {
//     serverMessage = errCode.replace(/_/g, ' ') + ' Error.'
//   }
//   return serverMessage
// }
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJFUlJfTVNHIiwiRVhUX0FQSV9DQUxMX0ZBSUwiLCJlcnJvck1lc3NhZ2UiLCJlcnJDb2RlIiwibXNnIiwicmVwbGFjZSJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9nbG9iYWwtY29tbW9uL2Vycm9yL2Vycm9yLW1lc3NhZ2UudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJ1xyXG5cclxuY29uc3QgRVJSX01TRyA9IHtcclxuICBFWFRfQVBJX0NBTExfRkFJTDogJ1VuZXhwZWN0ZWQgZXJyb3InLFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZXJyb3JNZXNzYWdlIChlcnJDb2RlKSB7XHJcbiAgaWYgKCFlcnJDb2RlKSB7XHJcbiAgICByZXR1cm4gJ0FuIHVuZXhwZWN0ZWQgZXJyb3IuJ1xyXG4gIH1cclxuXHJcbiAgbGV0IG1zZyA9IEVSUl9NU0dbZXJyQ29kZV1cclxuICBpZiAoIW1zZykge1xyXG4gICAgbXNnID0gZXJyQ29kZS5yZXBsYWNlKC9fL2csICcgJykgKyAnIEVycm9yLidcclxuICB9XHJcbiAgcmV0dXJuIG1zZ1xyXG59XHJcblxyXG4vLyBmdW5jdGlvbiBlcnJvck1lc3NhZ2UgKGVyckNvZGUsIHNlcnZlck1lc3NhZ2UpIHtcclxuLy8gICBpZiAoIWVyckNvZGUpIHtcclxuLy8gICAgIHJldHVybiAnQW4gdW5leHBlY3RlZCBlcnJvci4nXHJcbi8vICAgfVxyXG5cclxuLy8gICBpZiAoIXNlcnZlck1lc3NhZ2UpIHtcclxuLy8gICAgIHNlcnZlck1lc3NhZ2UgPSBlcnJDb2RlLnJlcGxhY2UoL18vZywgJyAnKSArICcgRXJyb3IuJ1xyXG4vLyAgIH1cclxuLy8gICByZXR1cm4gc2VydmVyTWVzc2FnZVxyXG4vLyB9XHJcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUEsTUFBTUEsT0FBTyxHQUFHO0VBQ2RDLGlCQUFpQixFQUFFO0FBQ3JCLENBQUM7QUFFTSxTQUFTQyxZQUFZLENBQUVDLE9BQU8sRUFBRTtFQUNyQyxJQUFJLENBQUNBLE9BQU8sRUFBRTtJQUNaLE9BQU8sc0JBQXNCO0VBQy9CO0VBRUEsSUFBSUMsR0FBRyxHQUFHSixPQUFPLENBQUNHLE9BQU8sQ0FBQztFQUMxQixJQUFJLENBQUNDLEdBQUcsRUFBRTtJQUNSQSxHQUFHLEdBQUdELE9BQU8sQ0FBQ0UsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsR0FBRyxTQUFTO0VBQzlDO0VBQ0EsT0FBT0QsR0FBRztBQUNaOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EifQ==