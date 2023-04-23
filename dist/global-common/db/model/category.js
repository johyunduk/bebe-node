"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _sequelize = require("sequelize");
var _dbSetup = require("@global-common/db/db-setup");
var _itemCategory = _interopRequireDefault(require("@global-common/db/model/item-category"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*************************************************************************
 * DB Table: category
 * description: bebe 카테고리
 **************************************************************************/

let CategoryModel;
function define() {
  CategoryModel = (0, _dbSetup.getDB)().define('category', {
    name: _sequelize.DataTypes.STRING,
    createdAt: {
      type: _sequelize.DataTypes.DATE,
      defaultValue: _sequelize.DataTypes.NOW
    },
    updatedAt: {
      type: _sequelize.DataTypes.DATE,
      defaultValue: _sequelize.DataTypes.NOW
    }
  }, {
    freezeTableName: true,
    indexes: []
  });
  CategoryModel.hasMany((0, _itemCategory.default)());
  return CategoryModel;
}
const Category = () => CategoryModel || define();
var _default = Category;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJDYXRlZ29yeU1vZGVsIiwiZGVmaW5lIiwiZ2V0REIiLCJuYW1lIiwiRGF0YVR5cGVzIiwiU1RSSU5HIiwiY3JlYXRlZEF0IiwidHlwZSIsIkRBVEUiLCJkZWZhdWx0VmFsdWUiLCJOT1ciLCJ1cGRhdGVkQXQiLCJmcmVlemVUYWJsZU5hbWUiLCJpbmRleGVzIiwiaGFzTWFueSIsIkl0ZW1DYXRlZ29yeSIsIkNhdGVnb3J5Il0sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2dsb2JhbC1jb21tb24vZGIvbW9kZWwvY2F0ZWdvcnkudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICogREIgVGFibGU6IGNhdGVnb3J5XHJcbiAqIGRlc2NyaXB0aW9uOiBiZWJlIOy5tO2FjOqzoOumrFxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbmltcG9ydCB7IERhdGFUeXBlcyB9IGZyb20gJ3NlcXVlbGl6ZSdcclxuaW1wb3J0IHsgZ2V0REIgfSBmcm9tICdAZ2xvYmFsLWNvbW1vbi9kYi9kYi1zZXR1cCdcclxuaW1wb3J0IEl0ZW1DYXRlZ29yeSBmcm9tICdAZ2xvYmFsLWNvbW1vbi9kYi9tb2RlbC9pdGVtLWNhdGVnb3J5J1xyXG5cclxubGV0IENhdGVnb3J5TW9kZWxcclxuXHJcbmZ1bmN0aW9uIGRlZmluZSAoKSB7XHJcbiAgQ2F0ZWdvcnlNb2RlbCA9IGdldERCKCkuZGVmaW5lKFxyXG4gICAgJ2NhdGVnb3J5JyxcclxuICAgIHtcclxuICAgICAgbmFtZTogRGF0YVR5cGVzLlNUUklORyxcclxuICAgICAgY3JlYXRlZEF0OiB7IHR5cGU6IERhdGFUeXBlcy5EQVRFLCBkZWZhdWx0VmFsdWU6IERhdGFUeXBlcy5OT1cgfSxcclxuICAgICAgdXBkYXRlZEF0OiB7IHR5cGU6IERhdGFUeXBlcy5EQVRFLCBkZWZhdWx0VmFsdWU6IERhdGFUeXBlcy5OT1cgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGZyZWV6ZVRhYmxlTmFtZTogdHJ1ZSxcclxuICAgICAgaW5kZXhlczogW10sXHJcbiAgICB9LFxyXG4gIClcclxuXHJcbiAgQ2F0ZWdvcnlNb2RlbC5oYXNNYW55KEl0ZW1DYXRlZ29yeSgpKVxyXG5cclxuICByZXR1cm4gQ2F0ZWdvcnlNb2RlbFxyXG59XHJcblxyXG5jb25zdCBDYXRlZ29yeSA9ICgpID0+IENhdGVnb3J5TW9kZWwgfHwgZGVmaW5lKClcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENhdGVnb3J5XHJcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBSUE7QUFDQTtBQUNBO0FBQWdFO0FBTmhFO0FBQ0E7QUFDQTtBQUNBOztBQUtBLElBQUlBLGFBQWE7QUFFakIsU0FBU0MsTUFBTSxHQUFJO0VBQ2pCRCxhQUFhLEdBQUcsSUFBQUUsY0FBSyxHQUFFLENBQUNELE1BQU0sQ0FDNUIsVUFBVSxFQUNWO0lBQ0VFLElBQUksRUFBRUMsb0JBQVMsQ0FBQ0MsTUFBTTtJQUN0QkMsU0FBUyxFQUFFO01BQUVDLElBQUksRUFBRUgsb0JBQVMsQ0FBQ0ksSUFBSTtNQUFFQyxZQUFZLEVBQUVMLG9CQUFTLENBQUNNO0lBQUksQ0FBQztJQUNoRUMsU0FBUyxFQUFFO01BQUVKLElBQUksRUFBRUgsb0JBQVMsQ0FBQ0ksSUFBSTtNQUFFQyxZQUFZLEVBQUVMLG9CQUFTLENBQUNNO0lBQUk7RUFDakUsQ0FBQyxFQUNEO0lBQ0VFLGVBQWUsRUFBRSxJQUFJO0lBQ3JCQyxPQUFPLEVBQUU7RUFDWCxDQUFDLENBQ0Y7RUFFRGIsYUFBYSxDQUFDYyxPQUFPLENBQUMsSUFBQUMscUJBQVksR0FBRSxDQUFDO0VBRXJDLE9BQU9mLGFBQWE7QUFDdEI7QUFFQSxNQUFNZ0IsUUFBUSxHQUFHLE1BQU1oQixhQUFhLElBQUlDLE1BQU0sRUFBRTtBQUFBLGVBRWpDZSxRQUFRO0FBQUEifQ==