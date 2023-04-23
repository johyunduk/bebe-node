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
* DB Table: admin
* description: bebe 관리자
**************************************************************************/

let AdminModel;
function define() {
  AdminModel = (0, _dbSetup.getDB)().define('admin', {
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
    freezeTableName: true
  });
  AdminModel.belongsTo((0, _user.default)());
  return AdminModel;
}
const Admin = () => AdminModel || define();
var _default = Admin;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJBZG1pbk1vZGVsIiwiZGVmaW5lIiwiZ2V0REIiLCJjcmVhdGVkQXQiLCJ0eXBlIiwiRGF0YVR5cGVzIiwiREFURSIsImRlZmF1bHRWYWx1ZSIsIk5PVyIsInVwZGF0ZWRBdCIsInRpbWVzdGFtcHMiLCJmcmVlemVUYWJsZU5hbWUiLCJiZWxvbmdzVG8iLCJVc2VyIiwiQWRtaW4iXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZ2xvYmFsLWNvbW1vbi9kYi9tb2RlbC9hZG1pbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuKiBEQiBUYWJsZTogYWRtaW5cbiogZGVzY3JpcHRpb246IGJlYmUg6rSA66as7J6QXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbmltcG9ydCB7IERhdGFUeXBlcyB9IGZyb20gJ3NlcXVlbGl6ZSdcbmltcG9ydCB7IGdldERCIH0gZnJvbSAnQGdsb2JhbC1jb21tb24vZGIvZGItc2V0dXAnXG5pbXBvcnQgVXNlciBmcm9tICdAZ2xvYmFsLWNvbW1vbi9kYi9tb2RlbC91c2VyJ1xuXG5sZXQgQWRtaW5Nb2RlbFxuXG5mdW5jdGlvbiBkZWZpbmUgKCkge1xuICBBZG1pbk1vZGVsID0gZ2V0REIoKS5kZWZpbmUoXG4gICAgJ2FkbWluJyxcbiAgICB7XG4gICAgICBjcmVhdGVkQXQ6IHsgdHlwZTogRGF0YVR5cGVzLkRBVEUsIGRlZmF1bHRWYWx1ZTogRGF0YVR5cGVzLk5PVyB9LFxuICAgICAgdXBkYXRlZEF0OiB7IHR5cGU6IERhdGFUeXBlcy5EQVRFLCBkZWZhdWx0VmFsdWU6IERhdGFUeXBlcy5OT1cgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHRpbWVzdGFtcHM6IHRydWUsXG4gICAgICBmcmVlemVUYWJsZU5hbWU6IHRydWUsXG4gICAgfSxcbiAgKVxuXG4gIEFkbWluTW9kZWwuYmVsb25nc1RvKFVzZXIoKSlcblxuICByZXR1cm4gQWRtaW5Nb2RlbFxufVxuXG5jb25zdCBBZG1pbiA9ICgpID0+IEFkbWluTW9kZWwgfHwgZGVmaW5lKClcblxuZXhwb3J0IGRlZmF1bHQgQWRtaW5cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBSUE7QUFDQTtBQUNBO0FBQStDO0FBTi9DO0FBQ0E7QUFDQTtBQUNBOztBQUtBLElBQUlBLFVBQVU7QUFFZCxTQUFTQyxNQUFNLEdBQUk7RUFDakJELFVBQVUsR0FBRyxJQUFBRSxjQUFLLEdBQUUsQ0FBQ0QsTUFBTSxDQUN6QixPQUFPLEVBQ1A7SUFDRUUsU0FBUyxFQUFFO01BQUVDLElBQUksRUFBRUMsb0JBQVMsQ0FBQ0MsSUFBSTtNQUFFQyxZQUFZLEVBQUVGLG9CQUFTLENBQUNHO0lBQUksQ0FBQztJQUNoRUMsU0FBUyxFQUFFO01BQUVMLElBQUksRUFBRUMsb0JBQVMsQ0FBQ0MsSUFBSTtNQUFFQyxZQUFZLEVBQUVGLG9CQUFTLENBQUNHO0lBQUk7RUFDakUsQ0FBQyxFQUNEO0lBQ0VFLFVBQVUsRUFBRSxJQUFJO0lBQ2hCQyxlQUFlLEVBQUU7RUFDbkIsQ0FBQyxDQUNGO0VBRURYLFVBQVUsQ0FBQ1ksU0FBUyxDQUFDLElBQUFDLGFBQUksR0FBRSxDQUFDO0VBRTVCLE9BQU9iLFVBQVU7QUFDbkI7QUFFQSxNQUFNYyxLQUFLLEdBQUcsTUFBTWQsVUFBVSxJQUFJQyxNQUFNLEVBQUU7QUFBQSxlQUUzQmEsS0FBSztBQUFBIn0=