"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.AdminStatus = void 0;
var _sequelize = require("sequelize");
var _dbSetup = require("@global-common/db/db-setup");
/*************************************************************************
* DB Table: admin
* description: back-office 사용하는 유저
**************************************************************************/
let AdminStatus;
exports.AdminStatus = AdminStatus;
(function (AdminStatus) {
  AdminStatus["StandBy"] = "StandBy";
  AdminStatus["Activated"] = "Activated";
  AdminStatus["Deactivated"] = "Deactivated";
})(AdminStatus || (exports.AdminStatus = AdminStatus = {}));
let AdminModel;
function define() {
  AdminModel = (0, _dbSetup.getDB)().define('admin', {
    name: _sequelize.DataTypes.STRING,
    email: _sequelize.DataTypes.STRING,
    password: _sequelize.DataTypes.STRING,
    adminStatus: {
      type: _sequelize.DataTypes.STRING,
      defaultValue: AdminStatus.StandBy
    },
    adminGrade: {
      type: _sequelize.DataTypes.STRING,
      defaultValue: ''
    },
    // TODO: 추후에 등급에 따라 화면제한 필요
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
    timestamps: true,
    freezeTableName: true,
    indexes: [{
      fields: ['email'],
      unique: true
    }]
  });
  return AdminModel;
}
const Admin = () => AdminModel || define();
var _default = Admin;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJBZG1pblN0YXR1cyIsIkFkbWluTW9kZWwiLCJkZWZpbmUiLCJnZXREQiIsIm5hbWUiLCJEYXRhVHlwZXMiLCJTVFJJTkciLCJlbWFpbCIsInBhc3N3b3JkIiwiYWRtaW5TdGF0dXMiLCJ0eXBlIiwiZGVmYXVsdFZhbHVlIiwiU3RhbmRCeSIsImFkbWluR3JhZGUiLCJyZWZyZXNoVG9rZW4iLCJjcmVhdGVkQXQiLCJEQVRFIiwiTk9XIiwidXBkYXRlZEF0IiwidGltZXN0YW1wcyIsImZyZWV6ZVRhYmxlTmFtZSIsImluZGV4ZXMiLCJmaWVsZHMiLCJ1bmlxdWUiLCJBZG1pbiJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9nbG9iYWwtY29tbW9uL2RiL21vZGVsL2FkbWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4qIERCIFRhYmxlOiBhZG1pblxuKiBkZXNjcmlwdGlvbjogYmFjay1vZmZpY2Ug7IKs7Jqp7ZWY64qUIOycoOyggFxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5pbXBvcnQgeyBEYXRhVHlwZXMgfSBmcm9tICdzZXF1ZWxpemUnXG5pbXBvcnQgeyBnZXREQiB9IGZyb20gJ0BnbG9iYWwtY29tbW9uL2RiL2RiLXNldHVwJ1xuXG5leHBvcnQgZW51bSBBZG1pblN0YXR1cyB7XG4gIFN0YW5kQnkgPSAnU3RhbmRCeScsXG4gIEFjdGl2YXRlZCA9ICdBY3RpdmF0ZWQnLFxuICBEZWFjdGl2YXRlZCA9ICdEZWFjdGl2YXRlZCcsXG59XG5cbmxldCBBZG1pbk1vZGVsXG5cbmZ1bmN0aW9uIGRlZmluZSAoKSB7XG4gIEFkbWluTW9kZWwgPSBnZXREQigpLmRlZmluZShcbiAgICAnYWRtaW4nLFxuICAgIHtcbiAgICAgIG5hbWU6IERhdGFUeXBlcy5TVFJJTkcsXG4gICAgICBlbWFpbDogRGF0YVR5cGVzLlNUUklORyxcbiAgICAgIHBhc3N3b3JkOiBEYXRhVHlwZXMuU1RSSU5HLFxuXG4gICAgICBhZG1pblN0YXR1czogeyB0eXBlOiBEYXRhVHlwZXMuU1RSSU5HLCBkZWZhdWx0VmFsdWU6IEFkbWluU3RhdHVzLlN0YW5kQnkgfSxcbiAgICAgIGFkbWluR3JhZGU6IHsgdHlwZTogRGF0YVR5cGVzLlNUUklORywgZGVmYXVsdFZhbHVlOiAnJyB9LCAvLyBUT0RPOiDstpTtm4Tsl5Ag65Ox6riJ7JeQIOuUsOudvCDtmZTrqbTsoJztlZwg7ZWE7JqUXG4gICAgICByZWZyZXNoVG9rZW46IHsgdHlwZTogRGF0YVR5cGVzLlNUUklORyB9LFxuXG4gICAgICBjcmVhdGVkQXQ6IHsgdHlwZTogRGF0YVR5cGVzLkRBVEUsIGRlZmF1bHRWYWx1ZTogRGF0YVR5cGVzLk5PVyB9LFxuICAgICAgdXBkYXRlZEF0OiB7IHR5cGU6IERhdGFUeXBlcy5EQVRFLCBkZWZhdWx0VmFsdWU6IERhdGFUeXBlcy5OT1cgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHRpbWVzdGFtcHM6IHRydWUsXG4gICAgICBmcmVlemVUYWJsZU5hbWU6IHRydWUsXG4gICAgICBpbmRleGVzOiBbeyBmaWVsZHM6IFsnZW1haWwnXSwgdW5pcXVlOiB0cnVlIH1dLFxuICAgIH0sXG4gIClcblxuICByZXR1cm4gQWRtaW5Nb2RlbFxufVxuXG5jb25zdCBBZG1pbiA9ICgpID0+IEFkbWluTW9kZWwgfHwgZGVmaW5lKClcblxuZXhwb3J0IGRlZmF1bHQgQWRtaW5cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBSUE7QUFDQTtBQUxBO0FBQ0E7QUFDQTtBQUNBO0FBSEEsSUFPWUEsV0FBVztBQUFBO0FBQUEsV0FBWEEsV0FBVztFQUFYQSxXQUFXO0VBQVhBLFdBQVc7RUFBWEEsV0FBVztBQUFBLEdBQVhBLFdBQVcsMkJBQVhBLFdBQVc7QUFNdkIsSUFBSUMsVUFBVTtBQUVkLFNBQVNDLE1BQU0sR0FBSTtFQUNqQkQsVUFBVSxHQUFHLElBQUFFLGNBQUssR0FBRSxDQUFDRCxNQUFNLENBQ3pCLE9BQU8sRUFDUDtJQUNFRSxJQUFJLEVBQUVDLG9CQUFTLENBQUNDLE1BQU07SUFDdEJDLEtBQUssRUFBRUYsb0JBQVMsQ0FBQ0MsTUFBTTtJQUN2QkUsUUFBUSxFQUFFSCxvQkFBUyxDQUFDQyxNQUFNO0lBRTFCRyxXQUFXLEVBQUU7TUFBRUMsSUFBSSxFQUFFTCxvQkFBUyxDQUFDQyxNQUFNO01BQUVLLFlBQVksRUFBRVgsV0FBVyxDQUFDWTtJQUFRLENBQUM7SUFDMUVDLFVBQVUsRUFBRTtNQUFFSCxJQUFJLEVBQUVMLG9CQUFTLENBQUNDLE1BQU07TUFBRUssWUFBWSxFQUFFO0lBQUcsQ0FBQztJQUFFO0lBQzFERyxZQUFZLEVBQUU7TUFBRUosSUFBSSxFQUFFTCxvQkFBUyxDQUFDQztJQUFPLENBQUM7SUFFeENTLFNBQVMsRUFBRTtNQUFFTCxJQUFJLEVBQUVMLG9CQUFTLENBQUNXLElBQUk7TUFBRUwsWUFBWSxFQUFFTixvQkFBUyxDQUFDWTtJQUFJLENBQUM7SUFDaEVDLFNBQVMsRUFBRTtNQUFFUixJQUFJLEVBQUVMLG9CQUFTLENBQUNXLElBQUk7TUFBRUwsWUFBWSxFQUFFTixvQkFBUyxDQUFDWTtJQUFJO0VBQ2pFLENBQUMsRUFDRDtJQUNFRSxVQUFVLEVBQUUsSUFBSTtJQUNoQkMsZUFBZSxFQUFFLElBQUk7SUFDckJDLE9BQU8sRUFBRSxDQUFDO01BQUVDLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQztNQUFFQyxNQUFNLEVBQUU7SUFBSyxDQUFDO0VBQy9DLENBQUMsQ0FDRjtFQUVELE9BQU90QixVQUFVO0FBQ25CO0FBRUEsTUFBTXVCLEtBQUssR0FBRyxNQUFNdkIsVUFBVSxJQUFJQyxNQUFNLEVBQUU7QUFBQSxlQUUzQnNCLEtBQUs7QUFBQSJ9