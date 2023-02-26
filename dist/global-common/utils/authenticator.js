"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateCode = exports.encrypt = void 0;
var bcrypt = _interopRequireWildcard(require("bcryptjs"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const encrypt = password => {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};
exports.encrypt = encrypt;
const validateCode = (plain, hashed) => {
  return bcrypt.compareSync(plain, hashed);
};
exports.validateCode = validateCode;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJlbmNyeXB0IiwicGFzc3dvcmQiLCJzYWx0IiwiYmNyeXB0IiwiZ2VuU2FsdFN5bmMiLCJoYXNoIiwiaGFzaFN5bmMiLCJ2YWxpZGF0ZUNvZGUiLCJwbGFpbiIsImhhc2hlZCIsImNvbXBhcmVTeW5jIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2dsb2JhbC1jb21tb24vdXRpbHMvYXV0aGVudGljYXRvci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBiY3J5cHQgZnJvbSAnYmNyeXB0anMnXHJcblxyXG5leHBvcnQgY29uc3QgZW5jcnlwdCA9IChwYXNzd29yZCkgPT4ge1xyXG4gIGNvbnN0IHNhbHQgPSBiY3J5cHQuZ2VuU2FsdFN5bmMoKVxyXG4gIGNvbnN0IGhhc2ggPSBiY3J5cHQuaGFzaFN5bmMocGFzc3dvcmQsIHNhbHQpXHJcbiAgcmV0dXJuIGhhc2hcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHZhbGlkYXRlQ29kZSA9IChwbGFpbiwgaGFzaGVkKSA9PiB7XHJcbiAgcmV0dXJuIGJjcnlwdC5jb21wYXJlU3luYyhwbGFpbiwgaGFzaGVkKVxyXG59XHJcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFBa0M7QUFBQTtBQUUzQixNQUFNQSxPQUFPLEdBQUlDLFFBQVEsSUFBSztFQUNuQyxNQUFNQyxJQUFJLEdBQUdDLE1BQU0sQ0FBQ0MsV0FBVyxFQUFFO0VBQ2pDLE1BQU1DLElBQUksR0FBR0YsTUFBTSxDQUFDRyxRQUFRLENBQUNMLFFBQVEsRUFBRUMsSUFBSSxDQUFDO0VBQzVDLE9BQU9HLElBQUk7QUFDYixDQUFDO0FBQUE7QUFFTSxNQUFNRSxZQUFZLEdBQUcsQ0FBQ0MsS0FBSyxFQUFFQyxNQUFNLEtBQUs7RUFDN0MsT0FBT04sTUFBTSxDQUFDTyxXQUFXLENBQUNGLEtBQUssRUFBRUMsTUFBTSxDQUFDO0FBQzFDLENBQUM7QUFBQSJ9