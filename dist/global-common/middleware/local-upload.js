"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.localUpload = void 0;
var _multer = _interopRequireDefault(require("multer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const storage = _multer.default.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/images');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${req.user.id}_${file.originalname}`);
  }
});
const localUpload = (0, _multer.default)({
  storage
});
exports.localUpload = localUpload;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJzdG9yYWdlIiwibXVsdGVyIiwiZGlza1N0b3JhZ2UiLCJkZXN0aW5hdGlvbiIsInJlcSIsImZpbGUiLCJjYiIsImZpbGVuYW1lIiwiRGF0ZSIsIm5vdyIsInVzZXIiLCJpZCIsIm9yaWdpbmFsbmFtZSIsImxvY2FsVXBsb2FkIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2dsb2JhbC1jb21tb24vbWlkZGxld2FyZS9sb2NhbC11cGxvYWQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG11bHRlciBmcm9tICdtdWx0ZXInXHJcblxyXG5jb25zdCBzdG9yYWdlID0gbXVsdGVyLmRpc2tTdG9yYWdlKHtcclxuICBkZXN0aW5hdGlvbjogKHJlcSwgZmlsZSwgY2IpID0+IHtcclxuICAgIGNiKG51bGwsICd1cGxvYWRzL2ltYWdlcycpXHJcbiAgfSxcclxuICBmaWxlbmFtZTogKHJlcSwgZmlsZSwgY2IpID0+IHtcclxuICAgIGNiKG51bGwsIGAke0RhdGUubm93KCl9XyR7cmVxLnVzZXIuaWR9XyR7ZmlsZS5vcmlnaW5hbG5hbWV9YClcclxuICB9LFxyXG59KVxyXG5cclxuZXhwb3J0IGNvbnN0IGxvY2FsVXBsb2FkID0gbXVsdGVyKHsgc3RvcmFnZSB9KVxyXG4iXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQTJCO0FBRTNCLE1BQU1BLE9BQU8sR0FBR0MsZUFBTSxDQUFDQyxXQUFXLENBQUM7RUFDakNDLFdBQVcsRUFBRSxDQUFDQyxHQUFHLEVBQUVDLElBQUksRUFBRUMsRUFBRSxLQUFLO0lBQzlCQSxFQUFFLENBQUMsSUFBSSxFQUFFLGdCQUFnQixDQUFDO0VBQzVCLENBQUM7RUFDREMsUUFBUSxFQUFFLENBQUNILEdBQUcsRUFBRUMsSUFBSSxFQUFFQyxFQUFFLEtBQUs7SUFDM0JBLEVBQUUsQ0FBQyxJQUFJLEVBQUcsR0FBRUUsSUFBSSxDQUFDQyxHQUFHLEVBQUcsSUFBR0wsR0FBRyxDQUFDTSxJQUFJLENBQUNDLEVBQUcsSUFBR04sSUFBSSxDQUFDTyxZQUFhLEVBQUMsQ0FBQztFQUMvRDtBQUNGLENBQUMsQ0FBQztBQUVLLE1BQU1DLFdBQVcsR0FBRyxJQUFBWixlQUFNLEVBQUM7RUFBRUQ7QUFBUSxDQUFDLENBQUM7QUFBQSJ9