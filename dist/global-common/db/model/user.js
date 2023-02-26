"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.UserStatus = void 0;
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
let UserModel;
function define() {
  UserModel = (0, _dbSetup.getDB)().define('user', {
    name: _sequelize.DataTypes.STRING,
    email: _sequelize.DataTypes.STRING,
    password: _sequelize.DataTypes.STRING,
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
    }]
  });
  return UserModel;
}
const User = () => UserModel || define();
var _default = User;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJVc2VyU3RhdHVzIiwiVXNlck1vZGVsIiwiZGVmaW5lIiwiZ2V0REIiLCJuYW1lIiwiRGF0YVR5cGVzIiwiU1RSSU5HIiwiZW1haWwiLCJwYXNzd29yZCIsImJpcnRoRGF0ZSIsIkRBVEUiLCJ1c2VyU3RhdHVzIiwidHlwZSIsImRlZmF1bHRWYWx1ZSIsIkFjdGl2YXRlZCIsInJlZnJlc2hUb2tlbiIsImNyZWF0ZWRBdCIsIk5PVyIsInVwZGF0ZWRBdCIsImZyZWV6ZVRhYmxlTmFtZSIsImluZGV4ZXMiLCJmaWVsZHMiLCJ1bmlxdWUiLCJVc2VyIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2dsb2JhbC1jb21tb24vZGIvbW9kZWwvdXNlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gKiBEQiBUYWJsZTogdXNlclxyXG4gKiBkZXNjcmlwdGlvbjogYmViZSDsgqzsmqntlZjripQg7Jyg7KCAXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuaW1wb3J0IHsgRGF0YVR5cGVzIH0gZnJvbSAnc2VxdWVsaXplJ1xyXG5pbXBvcnQgeyBnZXREQiB9IGZyb20gJ0BnbG9iYWwtY29tbW9uL2RiL2RiLXNldHVwJ1xyXG5cclxuZXhwb3J0IGVudW0gVXNlclN0YXR1cyB7XHJcbiAgICBBY3RpdmF0ZWQgPSAnQWN0aXZhdGVkJyxcclxuICAgIERlYWN0aXZhdGVkID0gJ0RlYWN0aXZhdGVkJyxcclxufVxyXG5cclxubGV0IFVzZXJNb2RlbFxyXG5cclxuZnVuY3Rpb24gZGVmaW5lICgpIHtcclxuICBVc2VyTW9kZWwgPSBnZXREQigpLmRlZmluZShcclxuICAgICd1c2VyJyxcclxuICAgIHtcclxuICAgICAgbmFtZTogRGF0YVR5cGVzLlNUUklORyxcclxuICAgICAgZW1haWw6IERhdGFUeXBlcy5TVFJJTkcsXHJcbiAgICAgIHBhc3N3b3JkOiBEYXRhVHlwZXMuU1RSSU5HLFxyXG4gICAgICBiaXJ0aERhdGU6IERhdGFUeXBlcy5EQVRFLFxyXG4gICAgICB1c2VyU3RhdHVzOiB7IHR5cGU6IERhdGFUeXBlcy5TVFJJTkcsIGRlZmF1bHRWYWx1ZTogVXNlclN0YXR1cy5BY3RpdmF0ZWQgfSxcclxuICAgICAgcmVmcmVzaFRva2VuOiB7IHR5cGU6IERhdGFUeXBlcy5TVFJJTkcgfSxcclxuICAgICAgY3JlYXRlZEF0OiB7IHR5cGU6IERhdGFUeXBlcy5EQVRFLCBkZWZhdWx0VmFsdWU6IERhdGFUeXBlcy5OT1cgfSxcclxuICAgICAgdXBkYXRlZEF0OiB7IHR5cGU6IERhdGFUeXBlcy5EQVRFLCBkZWZhdWx0VmFsdWU6IERhdGFUeXBlcy5OT1cgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGZyZWV6ZVRhYmxlTmFtZTogdHJ1ZSxcclxuICAgICAgaW5kZXhlczogW3sgZmllbGRzOiBbJ2VtYWlsJ10sIHVuaXF1ZTogdHJ1ZSB9XSxcclxuICAgIH0sXHJcbiAgKVxyXG5cclxuICByZXR1cm4gVXNlck1vZGVsXHJcbn1cclxuXHJcbmNvbnN0IFVzZXIgPSAoKSA9PiBVc2VyTW9kZWwgfHwgZGVmaW5lKClcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFVzZXJcclxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFJQTtBQUNBO0FBTEE7QUFDQTtBQUNBO0FBQ0E7QUFIQSxJQU9ZQSxVQUFVO0FBQUE7QUFBQSxXQUFWQSxVQUFVO0VBQVZBLFVBQVU7RUFBVkEsVUFBVTtBQUFBLEdBQVZBLFVBQVUsMEJBQVZBLFVBQVU7QUFLdEIsSUFBSUMsU0FBUztBQUViLFNBQVNDLE1BQU0sR0FBSTtFQUNqQkQsU0FBUyxHQUFHLElBQUFFLGNBQUssR0FBRSxDQUFDRCxNQUFNLENBQ3hCLE1BQU0sRUFDTjtJQUNFRSxJQUFJLEVBQUVDLG9CQUFTLENBQUNDLE1BQU07SUFDdEJDLEtBQUssRUFBRUYsb0JBQVMsQ0FBQ0MsTUFBTTtJQUN2QkUsUUFBUSxFQUFFSCxvQkFBUyxDQUFDQyxNQUFNO0lBQzFCRyxTQUFTLEVBQUVKLG9CQUFTLENBQUNLLElBQUk7SUFDekJDLFVBQVUsRUFBRTtNQUFFQyxJQUFJLEVBQUVQLG9CQUFTLENBQUNDLE1BQU07TUFBRU8sWUFBWSxFQUFFYixVQUFVLENBQUNjO0lBQVUsQ0FBQztJQUMxRUMsWUFBWSxFQUFFO01BQUVILElBQUksRUFBRVAsb0JBQVMsQ0FBQ0M7SUFBTyxDQUFDO0lBQ3hDVSxTQUFTLEVBQUU7TUFBRUosSUFBSSxFQUFFUCxvQkFBUyxDQUFDSyxJQUFJO01BQUVHLFlBQVksRUFBRVIsb0JBQVMsQ0FBQ1k7SUFBSSxDQUFDO0lBQ2hFQyxTQUFTLEVBQUU7TUFBRU4sSUFBSSxFQUFFUCxvQkFBUyxDQUFDSyxJQUFJO01BQUVHLFlBQVksRUFBRVIsb0JBQVMsQ0FBQ1k7SUFBSTtFQUNqRSxDQUFDLEVBQ0Q7SUFDRUUsZUFBZSxFQUFFLElBQUk7SUFDckJDLE9BQU8sRUFBRSxDQUFDO01BQUVDLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQztNQUFFQyxNQUFNLEVBQUU7SUFBSyxDQUFDO0VBQy9DLENBQUMsQ0FDRjtFQUVELE9BQU9yQixTQUFTO0FBQ2xCO0FBRUEsTUFBTXNCLElBQUksR0FBRyxNQUFNdEIsU0FBUyxJQUFJQyxNQUFNLEVBQUU7QUFBQSxlQUV6QnFCLElBQUk7QUFBQSJ9