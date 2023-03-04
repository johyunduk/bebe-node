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
  UserGender["\uB0A8\uC790"] = "\uB0A8\uC790";
  UserGender["\uC5EC\uC790"] = "\uC5EC\uC790";
})(UserGender || (exports.UserGender = UserGender = {}));
let UserModel;
function define() {
  UserModel = (0, _dbSetup.getDB)().define('user', {
    name: _sequelize.DataTypes.STRING,
    email: _sequelize.DataTypes.STRING,
    password: _sequelize.DataTypes.STRING,
    gender: _sequelize.DataTypes.STRING,
    birthDate: _sequelize.DataTypes.DATE,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJVc2VyU3RhdHVzIiwiVXNlckdlbmRlciIsIlVzZXJNb2RlbCIsImRlZmluZSIsImdldERCIiwibmFtZSIsIkRhdGFUeXBlcyIsIlNUUklORyIsImVtYWlsIiwicGFzc3dvcmQiLCJnZW5kZXIiLCJiaXJ0aERhdGUiLCJEQVRFIiwidXNlclN0YXR1cyIsInR5cGUiLCJkZWZhdWx0VmFsdWUiLCJBY3RpdmF0ZWQiLCJyZWZyZXNoVG9rZW4iLCJjcmVhdGVkQXQiLCJOT1ciLCJ1cGRhdGVkQXQiLCJmcmVlemVUYWJsZU5hbWUiLCJpbmRleGVzIiwiZmllbGRzIiwidW5pcXVlIiwiZGVmYXVsdFNjb3BlIiwiYXR0cmlidXRlcyIsImV4Y2x1ZGUiLCJVc2VyIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2dsb2JhbC1jb21tb24vZGIvbW9kZWwvdXNlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gKiBEQiBUYWJsZTogdXNlclxyXG4gKiBkZXNjcmlwdGlvbjogYmViZSDsgqzsmqntlZjripQg7Jyg7KCAXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuaW1wb3J0IHsgRGF0YVR5cGVzIH0gZnJvbSAnc2VxdWVsaXplJ1xyXG5pbXBvcnQgeyBnZXREQiB9IGZyb20gJ0BnbG9iYWwtY29tbW9uL2RiL2RiLXNldHVwJ1xyXG5cclxuZXhwb3J0IGVudW0gVXNlclN0YXR1cyB7XHJcbiAgICBBY3RpdmF0ZWQgPSAnQWN0aXZhdGVkJyxcclxuICAgIERlYWN0aXZhdGVkID0gJ0RlYWN0aXZhdGVkJyxcclxufVxyXG5cclxuZXhwb3J0IGVudW0gVXNlckdlbmRlciB7XHJcbiAgJ+uCqOyekCcgPSAn64Ko7J6QJyxcclxuICAn7Jes7J6QJyA9ICfsl6zsnpAnXHJcbn1cclxuXHJcbmxldCBVc2VyTW9kZWxcclxuXHJcbmZ1bmN0aW9uIGRlZmluZSAoKSB7XHJcbiAgVXNlck1vZGVsID0gZ2V0REIoKS5kZWZpbmUoXHJcbiAgICAndXNlcicsXHJcbiAgICB7XHJcbiAgICAgIG5hbWU6IERhdGFUeXBlcy5TVFJJTkcsXHJcbiAgICAgIGVtYWlsOiBEYXRhVHlwZXMuU1RSSU5HLFxyXG4gICAgICBwYXNzd29yZDogRGF0YVR5cGVzLlNUUklORyxcclxuICAgICAgZ2VuZGVyOiBEYXRhVHlwZXMuU1RSSU5HLFxyXG4gICAgICBiaXJ0aERhdGU6IERhdGFUeXBlcy5EQVRFLFxyXG4gICAgICB1c2VyU3RhdHVzOiB7IHR5cGU6IERhdGFUeXBlcy5TVFJJTkcsIGRlZmF1bHRWYWx1ZTogVXNlclN0YXR1cy5BY3RpdmF0ZWQgfSxcclxuICAgICAgcmVmcmVzaFRva2VuOiB7IHR5cGU6IERhdGFUeXBlcy5TVFJJTkcgfSxcclxuICAgICAgY3JlYXRlZEF0OiB7IHR5cGU6IERhdGFUeXBlcy5EQVRFLCBkZWZhdWx0VmFsdWU6IERhdGFUeXBlcy5OT1cgfSxcclxuICAgICAgdXBkYXRlZEF0OiB7IHR5cGU6IERhdGFUeXBlcy5EQVRFLCBkZWZhdWx0VmFsdWU6IERhdGFUeXBlcy5OT1cgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGZyZWV6ZVRhYmxlTmFtZTogdHJ1ZSxcclxuICAgICAgaW5kZXhlczogW3sgZmllbGRzOiBbJ2VtYWlsJ10sIHVuaXF1ZTogdHJ1ZSB9XSxcclxuICAgICAgZGVmYXVsdFNjb3BlOiB7XHJcbiAgICAgICAgYXR0cmlidXRlczoge1xyXG4gICAgICAgICAgZXhjbHVkZTogW10sXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgKVxyXG5cclxuICByZXR1cm4gVXNlck1vZGVsXHJcbn1cclxuXHJcbmNvbnN0IFVzZXIgPSAoKSA9PiBVc2VyTW9kZWwgfHwgZGVmaW5lKClcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFVzZXJcclxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFJQTtBQUNBO0FBTEE7QUFDQTtBQUNBO0FBQ0E7QUFIQSxJQU9ZQSxVQUFVO0FBQUE7QUFBQSxXQUFWQSxVQUFVO0VBQVZBLFVBQVU7RUFBVkEsVUFBVTtBQUFBLEdBQVZBLFVBQVUsMEJBQVZBLFVBQVU7QUFBQSxJQUtWQyxVQUFVO0FBQUE7QUFBQSxXQUFWQSxVQUFVO0VBQVZBLFVBQVU7RUFBVkEsVUFBVTtBQUFBLEdBQVZBLFVBQVUsMEJBQVZBLFVBQVU7QUFLdEIsSUFBSUMsU0FBUztBQUViLFNBQVNDLE1BQU0sR0FBSTtFQUNqQkQsU0FBUyxHQUFHLElBQUFFLGNBQUssR0FBRSxDQUFDRCxNQUFNLENBQ3hCLE1BQU0sRUFDTjtJQUNFRSxJQUFJLEVBQUVDLG9CQUFTLENBQUNDLE1BQU07SUFDdEJDLEtBQUssRUFBRUYsb0JBQVMsQ0FBQ0MsTUFBTTtJQUN2QkUsUUFBUSxFQUFFSCxvQkFBUyxDQUFDQyxNQUFNO0lBQzFCRyxNQUFNLEVBQUVKLG9CQUFTLENBQUNDLE1BQU07SUFDeEJJLFNBQVMsRUFBRUwsb0JBQVMsQ0FBQ00sSUFBSTtJQUN6QkMsVUFBVSxFQUFFO01BQUVDLElBQUksRUFBRVIsb0JBQVMsQ0FBQ0MsTUFBTTtNQUFFUSxZQUFZLEVBQUVmLFVBQVUsQ0FBQ2dCO0lBQVUsQ0FBQztJQUMxRUMsWUFBWSxFQUFFO01BQUVILElBQUksRUFBRVIsb0JBQVMsQ0FBQ0M7SUFBTyxDQUFDO0lBQ3hDVyxTQUFTLEVBQUU7TUFBRUosSUFBSSxFQUFFUixvQkFBUyxDQUFDTSxJQUFJO01BQUVHLFlBQVksRUFBRVQsb0JBQVMsQ0FBQ2E7SUFBSSxDQUFDO0lBQ2hFQyxTQUFTLEVBQUU7TUFBRU4sSUFBSSxFQUFFUixvQkFBUyxDQUFDTSxJQUFJO01BQUVHLFlBQVksRUFBRVQsb0JBQVMsQ0FBQ2E7SUFBSTtFQUNqRSxDQUFDLEVBQ0Q7SUFDRUUsZUFBZSxFQUFFLElBQUk7SUFDckJDLE9BQU8sRUFBRSxDQUFDO01BQUVDLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQztNQUFFQyxNQUFNLEVBQUU7SUFBSyxDQUFDLENBQUM7SUFDOUNDLFlBQVksRUFBRTtNQUNaQyxVQUFVLEVBQUU7UUFDVkMsT0FBTyxFQUFFO01BQ1g7SUFDRjtFQUNGLENBQUMsQ0FDRjtFQUVELE9BQU96QixTQUFTO0FBQ2xCO0FBRUEsTUFBTTBCLElBQUksR0FBRyxNQUFNMUIsU0FBUyxJQUFJQyxNQUFNLEVBQUU7QUFBQSxlQUV6QnlCLElBQUk7QUFBQSJ9