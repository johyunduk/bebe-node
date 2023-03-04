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
    userStatus: {
      type: _sequelize.DataTypes.STRING,
      defaultValue: UserStatus.Activated
    },
    refreshToken: {
      type: _sequelize.DataTypes.STRING
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJVc2VyU3RhdHVzIiwiVXNlckdlbmRlciIsIlVzZXJNb2RlbCIsImRlZmluZSIsImdldERCIiwibmFtZSIsIkRhdGFUeXBlcyIsIlNUUklORyIsImVtYWlsIiwicGFzc3dvcmQiLCJnZW5kZXIiLCJiaXJ0aERhdGUiLCJEQVRFT05MWSIsInVzZXJTdGF0dXMiLCJ0eXBlIiwiZGVmYXVsdFZhbHVlIiwiQWN0aXZhdGVkIiwicmVmcmVzaFRva2VuIiwiY3JlYXRlZEF0IiwiREFURSIsIk5PVyIsInVwZGF0ZWRBdCIsImZyZWV6ZVRhYmxlTmFtZSIsImluZGV4ZXMiLCJmaWVsZHMiLCJ1bmlxdWUiLCJkZWZhdWx0U2NvcGUiLCJhdHRyaWJ1dGVzIiwiZXhjbHVkZSIsIlVzZXIiXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZ2xvYmFsLWNvbW1vbi9kYi9tb2RlbC91c2VyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAqIERCIFRhYmxlOiB1c2VyXHJcbiAqIGRlc2NyaXB0aW9uOiBiZWJlIOyCrOyaqe2VmOuKlCDsnKDsoIBcclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5pbXBvcnQgeyBEYXRhVHlwZXMgfSBmcm9tICdzZXF1ZWxpemUnXHJcbmltcG9ydCB7IGdldERCIH0gZnJvbSAnQGdsb2JhbC1jb21tb24vZGIvZGItc2V0dXAnXHJcblxyXG5leHBvcnQgZW51bSBVc2VyU3RhdHVzIHtcclxuICAgIEFjdGl2YXRlZCA9ICdBY3RpdmF0ZWQnLFxyXG4gICAgRGVhY3RpdmF0ZWQgPSAnRGVhY3RpdmF0ZWQnLFxyXG59XHJcblxyXG5leHBvcnQgZW51bSBVc2VyR2VuZGVyIHtcclxuICBNYWxlID0gJ+uCqOyekCcsXHJcbiAgRmVtYWxlID0gJ+yXrOyekCdcclxufVxyXG5cclxubGV0IFVzZXJNb2RlbFxyXG5cclxuZnVuY3Rpb24gZGVmaW5lICgpIHtcclxuICBVc2VyTW9kZWwgPSBnZXREQigpLmRlZmluZShcclxuICAgICd1c2VyJyxcclxuICAgIHtcclxuICAgICAgbmFtZTogRGF0YVR5cGVzLlNUUklORyxcclxuICAgICAgZW1haWw6IERhdGFUeXBlcy5TVFJJTkcsXHJcbiAgICAgIHBhc3N3b3JkOiBEYXRhVHlwZXMuU1RSSU5HLFxyXG4gICAgICBnZW5kZXI6IERhdGFUeXBlcy5TVFJJTkcsXHJcbiAgICAgIGJpcnRoRGF0ZTogRGF0YVR5cGVzLkRBVEVPTkxZLFxyXG4gICAgICB1c2VyU3RhdHVzOiB7IHR5cGU6IERhdGFUeXBlcy5TVFJJTkcsIGRlZmF1bHRWYWx1ZTogVXNlclN0YXR1cy5BY3RpdmF0ZWQgfSxcclxuICAgICAgcmVmcmVzaFRva2VuOiB7IHR5cGU6IERhdGFUeXBlcy5TVFJJTkcgfSxcclxuICAgICAgY3JlYXRlZEF0OiB7IHR5cGU6IERhdGFUeXBlcy5EQVRFLCBkZWZhdWx0VmFsdWU6IERhdGFUeXBlcy5OT1cgfSxcclxuICAgICAgdXBkYXRlZEF0OiB7IHR5cGU6IERhdGFUeXBlcy5EQVRFLCBkZWZhdWx0VmFsdWU6IERhdGFUeXBlcy5OT1cgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGZyZWV6ZVRhYmxlTmFtZTogdHJ1ZSxcclxuICAgICAgaW5kZXhlczogW3sgZmllbGRzOiBbJ2VtYWlsJ10sIHVuaXF1ZTogdHJ1ZSB9XSxcclxuICAgICAgZGVmYXVsdFNjb3BlOiB7XHJcbiAgICAgICAgYXR0cmlidXRlczoge1xyXG4gICAgICAgICAgZXhjbHVkZTogW10sXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgKVxyXG5cclxuICByZXR1cm4gVXNlck1vZGVsXHJcbn1cclxuXHJcbmNvbnN0IFVzZXIgPSAoKSA9PiBVc2VyTW9kZWwgfHwgZGVmaW5lKClcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFVzZXJcclxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFJQTtBQUNBO0FBTEE7QUFDQTtBQUNBO0FBQ0E7QUFIQSxJQU9ZQSxVQUFVO0FBQUE7QUFBQSxXQUFWQSxVQUFVO0VBQVZBLFVBQVU7RUFBVkEsVUFBVTtBQUFBLEdBQVZBLFVBQVUsMEJBQVZBLFVBQVU7QUFBQSxJQUtWQyxVQUFVO0FBQUE7QUFBQSxXQUFWQSxVQUFVO0VBQVZBLFVBQVU7RUFBVkEsVUFBVTtBQUFBLEdBQVZBLFVBQVUsMEJBQVZBLFVBQVU7QUFLdEIsSUFBSUMsU0FBUztBQUViLFNBQVNDLE1BQU0sR0FBSTtFQUNqQkQsU0FBUyxHQUFHLElBQUFFLGNBQUssR0FBRSxDQUFDRCxNQUFNLENBQ3hCLE1BQU0sRUFDTjtJQUNFRSxJQUFJLEVBQUVDLG9CQUFTLENBQUNDLE1BQU07SUFDdEJDLEtBQUssRUFBRUYsb0JBQVMsQ0FBQ0MsTUFBTTtJQUN2QkUsUUFBUSxFQUFFSCxvQkFBUyxDQUFDQyxNQUFNO0lBQzFCRyxNQUFNLEVBQUVKLG9CQUFTLENBQUNDLE1BQU07SUFDeEJJLFNBQVMsRUFBRUwsb0JBQVMsQ0FBQ00sUUFBUTtJQUM3QkMsVUFBVSxFQUFFO01BQUVDLElBQUksRUFBRVIsb0JBQVMsQ0FBQ0MsTUFBTTtNQUFFUSxZQUFZLEVBQUVmLFVBQVUsQ0FBQ2dCO0lBQVUsQ0FBQztJQUMxRUMsWUFBWSxFQUFFO01BQUVILElBQUksRUFBRVIsb0JBQVMsQ0FBQ0M7SUFBTyxDQUFDO0lBQ3hDVyxTQUFTLEVBQUU7TUFBRUosSUFBSSxFQUFFUixvQkFBUyxDQUFDYSxJQUFJO01BQUVKLFlBQVksRUFBRVQsb0JBQVMsQ0FBQ2M7SUFBSSxDQUFDO0lBQ2hFQyxTQUFTLEVBQUU7TUFBRVAsSUFBSSxFQUFFUixvQkFBUyxDQUFDYSxJQUFJO01BQUVKLFlBQVksRUFBRVQsb0JBQVMsQ0FBQ2M7SUFBSTtFQUNqRSxDQUFDLEVBQ0Q7SUFDRUUsZUFBZSxFQUFFLElBQUk7SUFDckJDLE9BQU8sRUFBRSxDQUFDO01BQUVDLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQztNQUFFQyxNQUFNLEVBQUU7SUFBSyxDQUFDLENBQUM7SUFDOUNDLFlBQVksRUFBRTtNQUNaQyxVQUFVLEVBQUU7UUFDVkMsT0FBTyxFQUFFO01BQ1g7SUFDRjtFQUNGLENBQUMsQ0FDRjtFQUVELE9BQU8xQixTQUFTO0FBQ2xCO0FBRUEsTUFBTTJCLElBQUksR0FBRyxNQUFNM0IsU0FBUyxJQUFJQyxNQUFNLEVBQUU7QUFBQSxlQUV6QjBCLElBQUk7QUFBQSJ9