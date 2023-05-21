"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _sequelize = require("sequelize");
var _dbSetup = require("@global-common/db/db-setup");
var _user = _interopRequireDefault(require("@global-common/db/model/user"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*************************************************************************
 * DB Table: user_baby
 * description: bebe 사용하는 유저의 아이
 **************************************************************************/

let UserBabyModel;
function define() {
  UserBabyModel = (0, _dbSetup.getDB)().define('user_baby', {
    name: _sequelize.DataTypes.STRING,
    birthDate: _sequelize.DataTypes.DATE,
    gender: _sequelize.DataTypes.STRING,
    face: _sequelize.DataTypes.STRING,
    expectDate: _sequelize.DataTypes.DATEONLY,
    pregnantDate: _sequelize.DataTypes.DATEONLY,
    createdAt: {
      type: _sequelize.DataTypes.DATE,
      defaultValue: _sequelize.DataTypes.NOW
    },
    updatedAt: {
      type: _sequelize.DataTypes.DATE,
      defaultValue: _sequelize.DataTypes.NOW
    }
  }, {
    freezeTableName: true
  });
  UserBabyModel.belongsTo((0, _user.default)(), {
    foreignKey: 'userId'
  });
  return UserBabyModel;
}
const UserBaby = () => UserBabyModel || define();
var _default = UserBaby;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJVc2VyQmFieU1vZGVsIiwiZGVmaW5lIiwiZ2V0REIiLCJuYW1lIiwiRGF0YVR5cGVzIiwiU1RSSU5HIiwiYmlydGhEYXRlIiwiREFURSIsImdlbmRlciIsImZhY2UiLCJleHBlY3REYXRlIiwiREFURU9OTFkiLCJwcmVnbmFudERhdGUiLCJjcmVhdGVkQXQiLCJ0eXBlIiwiZGVmYXVsdFZhbHVlIiwiTk9XIiwidXBkYXRlZEF0IiwiZnJlZXplVGFibGVOYW1lIiwiYmVsb25nc1RvIiwiVXNlciIsImZvcmVpZ25LZXkiLCJVc2VyQmFieSJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9nbG9iYWwtY29tbW9uL2RiL21vZGVsL3VzZXItYmFieS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gKiBEQiBUYWJsZTogdXNlcl9iYWJ5XHJcbiAqIGRlc2NyaXB0aW9uOiBiZWJlIOyCrOyaqe2VmOuKlCDsnKDsoIDsnZgg7JWE7J20XHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuaW1wb3J0IHsgRGF0YVR5cGVzIH0gZnJvbSAnc2VxdWVsaXplJ1xyXG5pbXBvcnQgeyBnZXREQiB9IGZyb20gJ0BnbG9iYWwtY29tbW9uL2RiL2RiLXNldHVwJ1xyXG5pbXBvcnQgVXNlciBmcm9tICdAZ2xvYmFsLWNvbW1vbi9kYi9tb2RlbC91c2VyJ1xyXG5cclxubGV0IFVzZXJCYWJ5TW9kZWxcclxuXHJcbmZ1bmN0aW9uIGRlZmluZSAoKSB7XHJcbiAgVXNlckJhYnlNb2RlbCA9IGdldERCKCkuZGVmaW5lKFxyXG4gICAgJ3VzZXJfYmFieScsXHJcbiAgICB7XHJcbiAgICAgIG5hbWU6IERhdGFUeXBlcy5TVFJJTkcsXHJcbiAgICAgIGJpcnRoRGF0ZTogRGF0YVR5cGVzLkRBVEUsXHJcbiAgICAgIGdlbmRlcjogRGF0YVR5cGVzLlNUUklORyxcclxuICAgICAgZmFjZTogRGF0YVR5cGVzLlNUUklORyxcclxuICAgICAgZXhwZWN0RGF0ZTogRGF0YVR5cGVzLkRBVEVPTkxZLFxyXG4gICAgICBwcmVnbmFudERhdGU6IERhdGFUeXBlcy5EQVRFT05MWSxcclxuICAgICAgY3JlYXRlZEF0OiB7IHR5cGU6IERhdGFUeXBlcy5EQVRFLCBkZWZhdWx0VmFsdWU6IERhdGFUeXBlcy5OT1cgfSxcclxuICAgICAgdXBkYXRlZEF0OiB7IHR5cGU6IERhdGFUeXBlcy5EQVRFLCBkZWZhdWx0VmFsdWU6IERhdGFUeXBlcy5OT1cgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGZyZWV6ZVRhYmxlTmFtZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgKVxyXG5cclxuICBVc2VyQmFieU1vZGVsLmJlbG9uZ3NUbyhVc2VyKCksIHsgZm9yZWlnbktleTogJ3VzZXJJZCcgfSlcclxuXHJcbiAgcmV0dXJuIFVzZXJCYWJ5TW9kZWxcclxufVxyXG5cclxuY29uc3QgVXNlckJhYnkgPSAoKSA9PiBVc2VyQmFieU1vZGVsIHx8IGRlZmluZSgpXHJcblxyXG5leHBvcnQgZGVmYXVsdCBVc2VyQmFieVxyXG4iXSwibWFwcGluZ3MiOiI7Ozs7OztBQUlBO0FBQ0E7QUFDQTtBQUErQztBQU4vQztBQUNBO0FBQ0E7QUFDQTs7QUFLQSxJQUFJQSxhQUFhO0FBRWpCLFNBQVNDLE1BQU0sR0FBSTtFQUNqQkQsYUFBYSxHQUFHLElBQUFFLGNBQUssR0FBRSxDQUFDRCxNQUFNLENBQzVCLFdBQVcsRUFDWDtJQUNFRSxJQUFJLEVBQUVDLG9CQUFTLENBQUNDLE1BQU07SUFDdEJDLFNBQVMsRUFBRUYsb0JBQVMsQ0FBQ0csSUFBSTtJQUN6QkMsTUFBTSxFQUFFSixvQkFBUyxDQUFDQyxNQUFNO0lBQ3hCSSxJQUFJLEVBQUVMLG9CQUFTLENBQUNDLE1BQU07SUFDdEJLLFVBQVUsRUFBRU4sb0JBQVMsQ0FBQ08sUUFBUTtJQUM5QkMsWUFBWSxFQUFFUixvQkFBUyxDQUFDTyxRQUFRO0lBQ2hDRSxTQUFTLEVBQUU7TUFBRUMsSUFBSSxFQUFFVixvQkFBUyxDQUFDRyxJQUFJO01BQUVRLFlBQVksRUFBRVgsb0JBQVMsQ0FBQ1k7SUFBSSxDQUFDO0lBQ2hFQyxTQUFTLEVBQUU7TUFBRUgsSUFBSSxFQUFFVixvQkFBUyxDQUFDRyxJQUFJO01BQUVRLFlBQVksRUFBRVgsb0JBQVMsQ0FBQ1k7SUFBSTtFQUNqRSxDQUFDLEVBQ0Q7SUFDRUUsZUFBZSxFQUFFO0VBQ25CLENBQUMsQ0FDRjtFQUVEbEIsYUFBYSxDQUFDbUIsU0FBUyxDQUFDLElBQUFDLGFBQUksR0FBRSxFQUFFO0lBQUVDLFVBQVUsRUFBRTtFQUFTLENBQUMsQ0FBQztFQUV6RCxPQUFPckIsYUFBYTtBQUN0QjtBQUVBLE1BQU1zQixRQUFRLEdBQUcsTUFBTXRCLGFBQWEsSUFBSUMsTUFBTSxFQUFFO0FBQUEsZUFFakNxQixRQUFRO0FBQUEifQ==