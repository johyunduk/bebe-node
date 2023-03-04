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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJVc2VyU3RhdHVzIiwiVXNlckdlbmRlciIsIlVzZXJNb2RlbCIsImRlZmluZSIsImdldERCIiwibmFtZSIsIkRhdGFUeXBlcyIsIlNUUklORyIsImVtYWlsIiwicGFzc3dvcmQiLCJnZW5kZXIiLCJiaXJ0aERhdGUiLCJEQVRFT05MWSIsImF2YXRhciIsInVzZXJTdGF0dXMiLCJ0eXBlIiwiZGVmYXVsdFZhbHVlIiwiQWN0aXZhdGVkIiwicmVmcmVzaFRva2VuIiwiY3JlYXRlZEF0IiwiREFURSIsIk5PVyIsInVwZGF0ZWRBdCIsImZyZWV6ZVRhYmxlTmFtZSIsImluZGV4ZXMiLCJmaWVsZHMiLCJ1bmlxdWUiLCJkZWZhdWx0U2NvcGUiLCJhdHRyaWJ1dGVzIiwiZXhjbHVkZSIsIlVzZXIiXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZ2xvYmFsLWNvbW1vbi9kYi9tb2RlbC91c2VyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAqIERCIFRhYmxlOiB1c2VyXHJcbiAqIGRlc2NyaXB0aW9uOiBiZWJlIOyCrOyaqe2VmOuKlCDsnKDsoIBcclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5pbXBvcnQgeyBEYXRhVHlwZXMgfSBmcm9tICdzZXF1ZWxpemUnXHJcbmltcG9ydCB7IGdldERCIH0gZnJvbSAnQGdsb2JhbC1jb21tb24vZGIvZGItc2V0dXAnXHJcblxyXG5leHBvcnQgZW51bSBVc2VyU3RhdHVzIHtcclxuICAgIEFjdGl2YXRlZCA9ICdBY3RpdmF0ZWQnLFxyXG4gICAgRGVhY3RpdmF0ZWQgPSAnRGVhY3RpdmF0ZWQnLFxyXG59XHJcblxyXG5leHBvcnQgZW51bSBVc2VyR2VuZGVyIHtcclxuICBNYWxlID0gJ+uCqOyekCcsXHJcbiAgRmVtYWxlID0gJ+yXrOyekCdcclxufVxyXG5cclxubGV0IFVzZXJNb2RlbFxyXG5cclxuZnVuY3Rpb24gZGVmaW5lICgpIHtcclxuICBVc2VyTW9kZWwgPSBnZXREQigpLmRlZmluZShcclxuICAgICd1c2VyJyxcclxuICAgIHtcclxuICAgICAgbmFtZTogRGF0YVR5cGVzLlNUUklORyxcclxuICAgICAgZW1haWw6IERhdGFUeXBlcy5TVFJJTkcsXHJcbiAgICAgIHBhc3N3b3JkOiBEYXRhVHlwZXMuU1RSSU5HLFxyXG4gICAgICBnZW5kZXI6IERhdGFUeXBlcy5TVFJJTkcsXHJcbiAgICAgIGJpcnRoRGF0ZTogRGF0YVR5cGVzLkRBVEVPTkxZLFxyXG4gICAgICBhdmF0YXI6IERhdGFUeXBlcy5TVFJJTkcsXHJcbiAgICAgIHVzZXJTdGF0dXM6IHsgdHlwZTogRGF0YVR5cGVzLlNUUklORywgZGVmYXVsdFZhbHVlOiBVc2VyU3RhdHVzLkFjdGl2YXRlZCB9LFxyXG4gICAgICByZWZyZXNoVG9rZW46IHsgdHlwZTogRGF0YVR5cGVzLlNUUklORyB9LFxyXG4gICAgICBjcmVhdGVkQXQ6IHsgdHlwZTogRGF0YVR5cGVzLkRBVEUsIGRlZmF1bHRWYWx1ZTogRGF0YVR5cGVzLk5PVyB9LFxyXG4gICAgICB1cGRhdGVkQXQ6IHsgdHlwZTogRGF0YVR5cGVzLkRBVEUsIGRlZmF1bHRWYWx1ZTogRGF0YVR5cGVzLk5PVyB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgZnJlZXplVGFibGVOYW1lOiB0cnVlLFxyXG4gICAgICBpbmRleGVzOiBbeyBmaWVsZHM6IFsnZW1haWwnXSwgdW5pcXVlOiB0cnVlIH1dLFxyXG4gICAgICBkZWZhdWx0U2NvcGU6IHtcclxuICAgICAgICBhdHRyaWJ1dGVzOiB7XHJcbiAgICAgICAgICBleGNsdWRlOiBbXSxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICApXHJcblxyXG4gIHJldHVybiBVc2VyTW9kZWxcclxufVxyXG5cclxuY29uc3QgVXNlciA9ICgpID0+IFVzZXJNb2RlbCB8fCBkZWZpbmUoKVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVXNlclxyXG4iXSwibWFwcGluZ3MiOiI7Ozs7OztBQUlBO0FBQ0E7QUFMQTtBQUNBO0FBQ0E7QUFDQTtBQUhBLElBT1lBLFVBQVU7QUFBQTtBQUFBLFdBQVZBLFVBQVU7RUFBVkEsVUFBVTtFQUFWQSxVQUFVO0FBQUEsR0FBVkEsVUFBVSwwQkFBVkEsVUFBVTtBQUFBLElBS1ZDLFVBQVU7QUFBQTtBQUFBLFdBQVZBLFVBQVU7RUFBVkEsVUFBVTtFQUFWQSxVQUFVO0FBQUEsR0FBVkEsVUFBVSwwQkFBVkEsVUFBVTtBQUt0QixJQUFJQyxTQUFTO0FBRWIsU0FBU0MsTUFBTSxHQUFJO0VBQ2pCRCxTQUFTLEdBQUcsSUFBQUUsY0FBSyxHQUFFLENBQUNELE1BQU0sQ0FDeEIsTUFBTSxFQUNOO0lBQ0VFLElBQUksRUFBRUMsb0JBQVMsQ0FBQ0MsTUFBTTtJQUN0QkMsS0FBSyxFQUFFRixvQkFBUyxDQUFDQyxNQUFNO0lBQ3ZCRSxRQUFRLEVBQUVILG9CQUFTLENBQUNDLE1BQU07SUFDMUJHLE1BQU0sRUFBRUosb0JBQVMsQ0FBQ0MsTUFBTTtJQUN4QkksU0FBUyxFQUFFTCxvQkFBUyxDQUFDTSxRQUFRO0lBQzdCQyxNQUFNLEVBQUVQLG9CQUFTLENBQUNDLE1BQU07SUFDeEJPLFVBQVUsRUFBRTtNQUFFQyxJQUFJLEVBQUVULG9CQUFTLENBQUNDLE1BQU07TUFBRVMsWUFBWSxFQUFFaEIsVUFBVSxDQUFDaUI7SUFBVSxDQUFDO0lBQzFFQyxZQUFZLEVBQUU7TUFBRUgsSUFBSSxFQUFFVCxvQkFBUyxDQUFDQztJQUFPLENBQUM7SUFDeENZLFNBQVMsRUFBRTtNQUFFSixJQUFJLEVBQUVULG9CQUFTLENBQUNjLElBQUk7TUFBRUosWUFBWSxFQUFFVixvQkFBUyxDQUFDZTtJQUFJLENBQUM7SUFDaEVDLFNBQVMsRUFBRTtNQUFFUCxJQUFJLEVBQUVULG9CQUFTLENBQUNjLElBQUk7TUFBRUosWUFBWSxFQUFFVixvQkFBUyxDQUFDZTtJQUFJO0VBQ2pFLENBQUMsRUFDRDtJQUNFRSxlQUFlLEVBQUUsSUFBSTtJQUNyQkMsT0FBTyxFQUFFLENBQUM7TUFBRUMsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDO01BQUVDLE1BQU0sRUFBRTtJQUFLLENBQUMsQ0FBQztJQUM5Q0MsWUFBWSxFQUFFO01BQ1pDLFVBQVUsRUFBRTtRQUNWQyxPQUFPLEVBQUU7TUFDWDtJQUNGO0VBQ0YsQ0FBQyxDQUNGO0VBRUQsT0FBTzNCLFNBQVM7QUFDbEI7QUFFQSxNQUFNNEIsSUFBSSxHQUFHLE1BQU01QixTQUFTLElBQUlDLE1BQU0sRUFBRTtBQUFBLGVBRXpCMkIsSUFBSTtBQUFBIn0=