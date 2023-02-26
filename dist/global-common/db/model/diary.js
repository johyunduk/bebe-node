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
 * DB Table: diary
 * description: bebe 일기
 **************************************************************************/

let DiaryModel;
function define() {
  DiaryModel = (0, _dbSetup.getDB)().define('diary', {
    title: _sequelize.DataTypes.STRING,
    content: _sequelize.DataTypes.TEXT,
    weight: _sequelize.DataTypes.DECIMAL,
    height: _sequelize.DataTypes.DECIMAL,
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
    defaultScope: {
      attributes: {
        exclude: []
      }
    }
  });
  DiaryModel.belongsTo((0, _user.default)(), {
    foreignKey: 'userId'
  });
  return DiaryModel;
}
const Diary = () => DiaryModel || define();
var _default = Diary;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJEaWFyeU1vZGVsIiwiZGVmaW5lIiwiZ2V0REIiLCJ0aXRsZSIsIkRhdGFUeXBlcyIsIlNUUklORyIsImNvbnRlbnQiLCJURVhUIiwid2VpZ2h0IiwiREVDSU1BTCIsImhlaWdodCIsImNyZWF0ZWRBdCIsInR5cGUiLCJEQVRFIiwiZGVmYXVsdFZhbHVlIiwiTk9XIiwidXBkYXRlZEF0IiwiZnJlZXplVGFibGVOYW1lIiwiZGVmYXVsdFNjb3BlIiwiYXR0cmlidXRlcyIsImV4Y2x1ZGUiLCJiZWxvbmdzVG8iLCJVc2VyIiwiZm9yZWlnbktleSIsIkRpYXJ5Il0sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2dsb2JhbC1jb21tb24vZGIvbW9kZWwvZGlhcnkudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICogREIgVGFibGU6IGRpYXJ5XHJcbiAqIGRlc2NyaXB0aW9uOiBiZWJlIOydvOq4sFxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbmltcG9ydCB7IERhdGFUeXBlcyB9IGZyb20gJ3NlcXVlbGl6ZSdcclxuaW1wb3J0IHsgZ2V0REIgfSBmcm9tICdAZ2xvYmFsLWNvbW1vbi9kYi9kYi1zZXR1cCdcclxuaW1wb3J0IFVzZXIgZnJvbSAnQGdsb2JhbC1jb21tb24vZGIvbW9kZWwvdXNlcidcclxuXHJcbmxldCBEaWFyeU1vZGVsXHJcblxyXG5mdW5jdGlvbiBkZWZpbmUgKCkge1xyXG4gIERpYXJ5TW9kZWwgPSBnZXREQigpLmRlZmluZShcclxuICAgICdkaWFyeScsXHJcbiAgICB7XHJcbiAgICAgIHRpdGxlOiBEYXRhVHlwZXMuU1RSSU5HLFxyXG4gICAgICBjb250ZW50OiBEYXRhVHlwZXMuVEVYVCxcclxuICAgICAgd2VpZ2h0OiBEYXRhVHlwZXMuREVDSU1BTCxcclxuICAgICAgaGVpZ2h0OiBEYXRhVHlwZXMuREVDSU1BTCxcclxuICAgICAgY3JlYXRlZEF0OiB7IHR5cGU6IERhdGFUeXBlcy5EQVRFLCBkZWZhdWx0VmFsdWU6IERhdGFUeXBlcy5OT1cgfSxcclxuICAgICAgdXBkYXRlZEF0OiB7IHR5cGU6IERhdGFUeXBlcy5EQVRFLCBkZWZhdWx0VmFsdWU6IERhdGFUeXBlcy5OT1cgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGZyZWV6ZVRhYmxlTmFtZTogdHJ1ZSxcclxuICAgICAgZGVmYXVsdFNjb3BlOiB7XHJcbiAgICAgICAgYXR0cmlidXRlczoge1xyXG4gICAgICAgICAgZXhjbHVkZTogW10sXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgKVxyXG5cclxuICBEaWFyeU1vZGVsLmJlbG9uZ3NUbyhVc2VyKCksIHsgZm9yZWlnbktleTogJ3VzZXJJZCcgfSlcclxuXHJcbiAgcmV0dXJuIERpYXJ5TW9kZWxcclxufVxyXG5cclxuY29uc3QgRGlhcnkgPSAoKSA9PiBEaWFyeU1vZGVsIHx8IGRlZmluZSgpXHJcblxyXG5leHBvcnQgZGVmYXVsdCBEaWFyeVxyXG4iXSwibWFwcGluZ3MiOiI7Ozs7OztBQUlBO0FBQ0E7QUFDQTtBQUErQztBQU4vQztBQUNBO0FBQ0E7QUFDQTs7QUFLQSxJQUFJQSxVQUFVO0FBRWQsU0FBU0MsTUFBTSxHQUFJO0VBQ2pCRCxVQUFVLEdBQUcsSUFBQUUsY0FBSyxHQUFFLENBQUNELE1BQU0sQ0FDekIsT0FBTyxFQUNQO0lBQ0VFLEtBQUssRUFBRUMsb0JBQVMsQ0FBQ0MsTUFBTTtJQUN2QkMsT0FBTyxFQUFFRixvQkFBUyxDQUFDRyxJQUFJO0lBQ3ZCQyxNQUFNLEVBQUVKLG9CQUFTLENBQUNLLE9BQU87SUFDekJDLE1BQU0sRUFBRU4sb0JBQVMsQ0FBQ0ssT0FBTztJQUN6QkUsU0FBUyxFQUFFO01BQUVDLElBQUksRUFBRVIsb0JBQVMsQ0FBQ1MsSUFBSTtNQUFFQyxZQUFZLEVBQUVWLG9CQUFTLENBQUNXO0lBQUksQ0FBQztJQUNoRUMsU0FBUyxFQUFFO01BQUVKLElBQUksRUFBRVIsb0JBQVMsQ0FBQ1MsSUFBSTtNQUFFQyxZQUFZLEVBQUVWLG9CQUFTLENBQUNXO0lBQUk7RUFDakUsQ0FBQyxFQUNEO0lBQ0VFLGVBQWUsRUFBRSxJQUFJO0lBQ3JCQyxZQUFZLEVBQUU7TUFDWkMsVUFBVSxFQUFFO1FBQ1ZDLE9BQU8sRUFBRTtNQUNYO0lBQ0Y7RUFDRixDQUFDLENBQ0Y7RUFFRHBCLFVBQVUsQ0FBQ3FCLFNBQVMsQ0FBQyxJQUFBQyxhQUFJLEdBQUUsRUFBRTtJQUFFQyxVQUFVLEVBQUU7RUFBUyxDQUFDLENBQUM7RUFFdEQsT0FBT3ZCLFVBQVU7QUFDbkI7QUFFQSxNQUFNd0IsS0FBSyxHQUFHLE1BQU14QixVQUFVLElBQUlDLE1BQU0sRUFBRTtBQUFBLGVBRTNCdUIsS0FBSztBQUFBIn0=