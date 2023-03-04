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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJVc2VyU3RhdHVzIiwiVXNlck1vZGVsIiwiZGVmaW5lIiwiZ2V0REIiLCJuYW1lIiwiRGF0YVR5cGVzIiwiU1RSSU5HIiwiZW1haWwiLCJwYXNzd29yZCIsImdlbmRlciIsImJpcnRoRGF0ZSIsIkRBVEUiLCJ1c2VyU3RhdHVzIiwidHlwZSIsImRlZmF1bHRWYWx1ZSIsIkFjdGl2YXRlZCIsInJlZnJlc2hUb2tlbiIsImNyZWF0ZWRBdCIsIk5PVyIsInVwZGF0ZWRBdCIsImZyZWV6ZVRhYmxlTmFtZSIsImluZGV4ZXMiLCJmaWVsZHMiLCJ1bmlxdWUiLCJkZWZhdWx0U2NvcGUiLCJhdHRyaWJ1dGVzIiwiZXhjbHVkZSIsIlVzZXIiXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZ2xvYmFsLWNvbW1vbi9kYi9tb2RlbC91c2VyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAqIERCIFRhYmxlOiB1c2VyXHJcbiAqIGRlc2NyaXB0aW9uOiBiZWJlIOyCrOyaqe2VmOuKlCDsnKDsoIBcclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5pbXBvcnQgeyBEYXRhVHlwZXMgfSBmcm9tICdzZXF1ZWxpemUnXHJcbmltcG9ydCB7IGdldERCIH0gZnJvbSAnQGdsb2JhbC1jb21tb24vZGIvZGItc2V0dXAnXHJcblxyXG5leHBvcnQgZW51bSBVc2VyU3RhdHVzIHtcclxuICAgIEFjdGl2YXRlZCA9ICdBY3RpdmF0ZWQnLFxyXG4gICAgRGVhY3RpdmF0ZWQgPSAnRGVhY3RpdmF0ZWQnLFxyXG59XHJcblxyXG5sZXQgVXNlck1vZGVsXHJcblxyXG5mdW5jdGlvbiBkZWZpbmUgKCkge1xyXG4gIFVzZXJNb2RlbCA9IGdldERCKCkuZGVmaW5lKFxyXG4gICAgJ3VzZXInLFxyXG4gICAge1xyXG4gICAgICBuYW1lOiBEYXRhVHlwZXMuU1RSSU5HLFxyXG4gICAgICBlbWFpbDogRGF0YVR5cGVzLlNUUklORyxcclxuICAgICAgcGFzc3dvcmQ6IERhdGFUeXBlcy5TVFJJTkcsXHJcbiAgICAgIGdlbmRlcjogRGF0YVR5cGVzLlNUUklORyxcclxuICAgICAgYmlydGhEYXRlOiBEYXRhVHlwZXMuREFURSxcclxuICAgICAgdXNlclN0YXR1czogeyB0eXBlOiBEYXRhVHlwZXMuU1RSSU5HLCBkZWZhdWx0VmFsdWU6IFVzZXJTdGF0dXMuQWN0aXZhdGVkIH0sXHJcbiAgICAgIHJlZnJlc2hUb2tlbjogeyB0eXBlOiBEYXRhVHlwZXMuU1RSSU5HIH0sXHJcbiAgICAgIGNyZWF0ZWRBdDogeyB0eXBlOiBEYXRhVHlwZXMuREFURSwgZGVmYXVsdFZhbHVlOiBEYXRhVHlwZXMuTk9XIH0sXHJcbiAgICAgIHVwZGF0ZWRBdDogeyB0eXBlOiBEYXRhVHlwZXMuREFURSwgZGVmYXVsdFZhbHVlOiBEYXRhVHlwZXMuTk9XIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBmcmVlemVUYWJsZU5hbWU6IHRydWUsXHJcbiAgICAgIGluZGV4ZXM6IFt7IGZpZWxkczogWydlbWFpbCddLCB1bmlxdWU6IHRydWUgfV0sXHJcbiAgICAgIGRlZmF1bHRTY29wZToge1xyXG4gICAgICAgIGF0dHJpYnV0ZXM6IHtcclxuICAgICAgICAgIGV4Y2x1ZGU6IFtdLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIClcclxuXHJcbiAgcmV0dXJuIFVzZXJNb2RlbFxyXG59XHJcblxyXG5jb25zdCBVc2VyID0gKCkgPT4gVXNlck1vZGVsIHx8IGRlZmluZSgpXHJcblxyXG5leHBvcnQgZGVmYXVsdCBVc2VyXHJcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBSUE7QUFDQTtBQUxBO0FBQ0E7QUFDQTtBQUNBO0FBSEEsSUFPWUEsVUFBVTtBQUFBO0FBQUEsV0FBVkEsVUFBVTtFQUFWQSxVQUFVO0VBQVZBLFVBQVU7QUFBQSxHQUFWQSxVQUFVLDBCQUFWQSxVQUFVO0FBS3RCLElBQUlDLFNBQVM7QUFFYixTQUFTQyxNQUFNLEdBQUk7RUFDakJELFNBQVMsR0FBRyxJQUFBRSxjQUFLLEdBQUUsQ0FBQ0QsTUFBTSxDQUN4QixNQUFNLEVBQ047SUFDRUUsSUFBSSxFQUFFQyxvQkFBUyxDQUFDQyxNQUFNO0lBQ3RCQyxLQUFLLEVBQUVGLG9CQUFTLENBQUNDLE1BQU07SUFDdkJFLFFBQVEsRUFBRUgsb0JBQVMsQ0FBQ0MsTUFBTTtJQUMxQkcsTUFBTSxFQUFFSixvQkFBUyxDQUFDQyxNQUFNO0lBQ3hCSSxTQUFTLEVBQUVMLG9CQUFTLENBQUNNLElBQUk7SUFDekJDLFVBQVUsRUFBRTtNQUFFQyxJQUFJLEVBQUVSLG9CQUFTLENBQUNDLE1BQU07TUFBRVEsWUFBWSxFQUFFZCxVQUFVLENBQUNlO0lBQVUsQ0FBQztJQUMxRUMsWUFBWSxFQUFFO01BQUVILElBQUksRUFBRVIsb0JBQVMsQ0FBQ0M7SUFBTyxDQUFDO0lBQ3hDVyxTQUFTLEVBQUU7TUFBRUosSUFBSSxFQUFFUixvQkFBUyxDQUFDTSxJQUFJO01BQUVHLFlBQVksRUFBRVQsb0JBQVMsQ0FBQ2E7SUFBSSxDQUFDO0lBQ2hFQyxTQUFTLEVBQUU7TUFBRU4sSUFBSSxFQUFFUixvQkFBUyxDQUFDTSxJQUFJO01BQUVHLFlBQVksRUFBRVQsb0JBQVMsQ0FBQ2E7SUFBSTtFQUNqRSxDQUFDLEVBQ0Q7SUFDRUUsZUFBZSxFQUFFLElBQUk7SUFDckJDLE9BQU8sRUFBRSxDQUFDO01BQUVDLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQztNQUFFQyxNQUFNLEVBQUU7SUFBSyxDQUFDLENBQUM7SUFDOUNDLFlBQVksRUFBRTtNQUNaQyxVQUFVLEVBQUU7UUFDVkMsT0FBTyxFQUFFO01BQ1g7SUFDRjtFQUNGLENBQUMsQ0FDRjtFQUVELE9BQU96QixTQUFTO0FBQ2xCO0FBRUEsTUFBTTBCLElBQUksR0FBRyxNQUFNMUIsU0FBUyxJQUFJQyxNQUFNLEVBQUU7QUFBQSxlQUV6QnlCLElBQUk7QUFBQSJ9