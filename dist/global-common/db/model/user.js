"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.UserStatus = exports.UserGender = void 0;
var _sequelize = require("sequelize");
var _dbSetup = require("@global-common/db/db-setup");
/*************************************************************************
 * DB Table: user
 * description: bebe 사용하는 유저
 **************************************************************************/
let UserStatus;
exports.UserStatus = UserStatus;
(function (UserStatus) {
  UserStatus["Activated"] = "Activated";
  UserStatus["Deactivated"] = "Deactivated";
})(UserStatus || (exports.UserStatus = UserStatus = {}));
let UserGender;
exports.UserGender = UserGender;
(function (UserGender) {
  UserGender["Male"] = "\uB0A8\uC790";
  UserGender["Female"] = "\uC5EC\uC790";
})(UserGender || (exports.UserGender = UserGender = {}));
let UserModel;
function define() {
  UserModel = (0, _dbSetup.getDB)().define('user', {
    name: _sequelize.DataTypes.STRING,
    email: _sequelize.DataTypes.STRING,
    password: _sequelize.DataTypes.STRING,
    gender: _sequelize.DataTypes.STRING,
    birthDate: _sequelize.DataTypes.DATEONLY,
    avatar: _sequelize.DataTypes.STRING,
    userStatus: {
      type: _sequelize.DataTypes.STRING,
      defaultValue: UserStatus.Activated
    },
    refreshToken: {
      type: _sequelize.DataTypes.STRING
    },
    isAdmin: {
      type: _sequelize.DataTypes.BOOLEAN,
      defaultValue: false
    },
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
    indexes: [{
      fields: ['email'],
      unique: true
    }],
    defaultScope: {
      attributes: {
        exclude: []
      }
    }
  });
  return UserModel;
}
const User = () => UserModel || define();
var _default = User;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJVc2VyU3RhdHVzIiwiVXNlckdlbmRlciIsIlVzZXJNb2RlbCIsImRlZmluZSIsImdldERCIiwibmFtZSIsIkRhdGFUeXBlcyIsIlNUUklORyIsImVtYWlsIiwicGFzc3dvcmQiLCJnZW5kZXIiLCJiaXJ0aERhdGUiLCJEQVRFT05MWSIsImF2YXRhciIsInVzZXJTdGF0dXMiLCJ0eXBlIiwiZGVmYXVsdFZhbHVlIiwiQWN0aXZhdGVkIiwicmVmcmVzaFRva2VuIiwiaXNBZG1pbiIsIkJPT0xFQU4iLCJjcmVhdGVkQXQiLCJEQVRFIiwiTk9XIiwidXBkYXRlZEF0IiwiZnJlZXplVGFibGVOYW1lIiwiaW5kZXhlcyIsImZpZWxkcyIsInVuaXF1ZSIsImRlZmF1bHRTY29wZSIsImF0dHJpYnV0ZXMiLCJleGNsdWRlIiwiVXNlciJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9nbG9iYWwtY29tbW9uL2RiL21vZGVsL3VzZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICogREIgVGFibGU6IHVzZXJcclxuICogZGVzY3JpcHRpb246IGJlYmUg7IKs7Jqp7ZWY64qUIOycoOyggFxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbmltcG9ydCB7IERhdGFUeXBlcyB9IGZyb20gJ3NlcXVlbGl6ZSdcclxuaW1wb3J0IHsgZ2V0REIgfSBmcm9tICdAZ2xvYmFsLWNvbW1vbi9kYi9kYi1zZXR1cCdcclxuXHJcbmV4cG9ydCBlbnVtIFVzZXJTdGF0dXMge1xyXG4gICAgQWN0aXZhdGVkID0gJ0FjdGl2YXRlZCcsXHJcbiAgICBEZWFjdGl2YXRlZCA9ICdEZWFjdGl2YXRlZCcsXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIFVzZXJHZW5kZXIge1xyXG4gIE1hbGUgPSAn64Ko7J6QJyxcclxuICBGZW1hbGUgPSAn7Jes7J6QJ1xyXG59XHJcblxyXG5sZXQgVXNlck1vZGVsXHJcblxyXG5mdW5jdGlvbiBkZWZpbmUgKCkge1xyXG4gIFVzZXJNb2RlbCA9IGdldERCKCkuZGVmaW5lKFxyXG4gICAgJ3VzZXInLFxyXG4gICAge1xyXG4gICAgICBuYW1lOiBEYXRhVHlwZXMuU1RSSU5HLFxyXG4gICAgICBlbWFpbDogRGF0YVR5cGVzLlNUUklORyxcclxuICAgICAgcGFzc3dvcmQ6IERhdGFUeXBlcy5TVFJJTkcsXHJcbiAgICAgIGdlbmRlcjogRGF0YVR5cGVzLlNUUklORyxcclxuICAgICAgYmlydGhEYXRlOiBEYXRhVHlwZXMuREFURU9OTFksXHJcbiAgICAgIGF2YXRhcjogRGF0YVR5cGVzLlNUUklORyxcclxuICAgICAgdXNlclN0YXR1czogeyB0eXBlOiBEYXRhVHlwZXMuU1RSSU5HLCBkZWZhdWx0VmFsdWU6IFVzZXJTdGF0dXMuQWN0aXZhdGVkIH0sXHJcbiAgICAgIHJlZnJlc2hUb2tlbjogeyB0eXBlOiBEYXRhVHlwZXMuU1RSSU5HIH0sXHJcbiAgICAgIGlzQWRtaW46IHsgdHlwZTogRGF0YVR5cGVzLkJPT0xFQU4sIGRlZmF1bHRWYWx1ZTogZmFsc2UgfSxcclxuICAgICAgY3JlYXRlZEF0OiB7IHR5cGU6IERhdGFUeXBlcy5EQVRFLCBkZWZhdWx0VmFsdWU6IERhdGFUeXBlcy5OT1cgfSxcclxuICAgICAgdXBkYXRlZEF0OiB7IHR5cGU6IERhdGFUeXBlcy5EQVRFLCBkZWZhdWx0VmFsdWU6IERhdGFUeXBlcy5OT1cgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGZyZWV6ZVRhYmxlTmFtZTogdHJ1ZSxcclxuICAgICAgaW5kZXhlczogW3sgZmllbGRzOiBbJ2VtYWlsJ10sIHVuaXF1ZTogdHJ1ZSB9XSxcclxuICAgICAgZGVmYXVsdFNjb3BlOiB7XHJcbiAgICAgICAgYXR0cmlidXRlczoge1xyXG4gICAgICAgICAgZXhjbHVkZTogW10sXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgKVxyXG5cclxuICByZXR1cm4gVXNlck1vZGVsXHJcbn1cclxuXHJcbmNvbnN0IFVzZXIgPSAoKSA9PiBVc2VyTW9kZWwgfHwgZGVmaW5lKClcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFVzZXJcclxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFJQTtBQUNBO0FBTEE7QUFDQTtBQUNBO0FBQ0E7QUFIQSxJQU9ZQSxVQUFVO0FBQUE7QUFBQSxXQUFWQSxVQUFVO0VBQVZBLFVBQVU7RUFBVkEsVUFBVTtBQUFBLEdBQVZBLFVBQVUsMEJBQVZBLFVBQVU7QUFBQSxJQUtWQyxVQUFVO0FBQUE7QUFBQSxXQUFWQSxVQUFVO0VBQVZBLFVBQVU7RUFBVkEsVUFBVTtBQUFBLEdBQVZBLFVBQVUsMEJBQVZBLFVBQVU7QUFLdEIsSUFBSUMsU0FBUztBQUViLFNBQVNDLE1BQU0sR0FBSTtFQUNqQkQsU0FBUyxHQUFHLElBQUFFLGNBQUssR0FBRSxDQUFDRCxNQUFNLENBQ3hCLE1BQU0sRUFDTjtJQUNFRSxJQUFJLEVBQUVDLG9CQUFTLENBQUNDLE1BQU07SUFDdEJDLEtBQUssRUFBRUYsb0JBQVMsQ0FBQ0MsTUFBTTtJQUN2QkUsUUFBUSxFQUFFSCxvQkFBUyxDQUFDQyxNQUFNO0lBQzFCRyxNQUFNLEVBQUVKLG9CQUFTLENBQUNDLE1BQU07SUFDeEJJLFNBQVMsRUFBRUwsb0JBQVMsQ0FBQ00sUUFBUTtJQUM3QkMsTUFBTSxFQUFFUCxvQkFBUyxDQUFDQyxNQUFNO0lBQ3hCTyxVQUFVLEVBQUU7TUFBRUMsSUFBSSxFQUFFVCxvQkFBUyxDQUFDQyxNQUFNO01BQUVTLFlBQVksRUFBRWhCLFVBQVUsQ0FBQ2lCO0lBQVUsQ0FBQztJQUMxRUMsWUFBWSxFQUFFO01BQUVILElBQUksRUFBRVQsb0JBQVMsQ0FBQ0M7SUFBTyxDQUFDO0lBQ3hDWSxPQUFPLEVBQUU7TUFBRUosSUFBSSxFQUFFVCxvQkFBUyxDQUFDYyxPQUFPO01BQUVKLFlBQVksRUFBRTtJQUFNLENBQUM7SUFDekRLLFNBQVMsRUFBRTtNQUFFTixJQUFJLEVBQUVULG9CQUFTLENBQUNnQixJQUFJO01BQUVOLFlBQVksRUFBRVYsb0JBQVMsQ0FBQ2lCO0lBQUksQ0FBQztJQUNoRUMsU0FBUyxFQUFFO01BQUVULElBQUksRUFBRVQsb0JBQVMsQ0FBQ2dCLElBQUk7TUFBRU4sWUFBWSxFQUFFVixvQkFBUyxDQUFDaUI7SUFBSTtFQUNqRSxDQUFDLEVBQ0Q7SUFDRUUsZUFBZSxFQUFFLElBQUk7SUFDckJDLE9BQU8sRUFBRSxDQUFDO01BQUVDLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQztNQUFFQyxNQUFNLEVBQUU7SUFBSyxDQUFDLENBQUM7SUFDOUNDLFlBQVksRUFBRTtNQUNaQyxVQUFVLEVBQUU7UUFDVkMsT0FBTyxFQUFFO01BQ1g7SUFDRjtFQUNGLENBQUMsQ0FDRjtFQUVELE9BQU83QixTQUFTO0FBQ2xCO0FBRUEsTUFBTThCLElBQUksR0FBRyxNQUFNOUIsU0FBUyxJQUFJQyxNQUFNLEVBQUU7QUFBQSxlQUV6QjZCLElBQUk7QUFBQSJ9