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
    weight: _sequelize.DataTypes.DECIMAL(5, 2),
    height: _sequelize.DataTypes.DECIMAL(5, 2),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJEaWFyeU1vZGVsIiwiZGVmaW5lIiwiZ2V0REIiLCJ0aXRsZSIsIkRhdGFUeXBlcyIsIlNUUklORyIsImNvbnRlbnQiLCJURVhUIiwid2VpZ2h0IiwiREVDSU1BTCIsImhlaWdodCIsImNyZWF0ZWRBdCIsInR5cGUiLCJEQVRFIiwiZGVmYXVsdFZhbHVlIiwiTk9XIiwidXBkYXRlZEF0IiwiZnJlZXplVGFibGVOYW1lIiwiZGVmYXVsdFNjb3BlIiwiYXR0cmlidXRlcyIsImV4Y2x1ZGUiLCJiZWxvbmdzVG8iLCJVc2VyIiwiZm9yZWlnbktleSIsIkRpYXJ5Il0sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2dsb2JhbC1jb21tb24vZGIvbW9kZWwvZGlhcnkudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICogREIgVGFibGU6IGRpYXJ5XHJcbiAqIGRlc2NyaXB0aW9uOiBiZWJlIOydvOq4sFxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbmltcG9ydCB7IERhdGFUeXBlcyB9IGZyb20gJ3NlcXVlbGl6ZSdcclxuaW1wb3J0IHsgZ2V0REIgfSBmcm9tICdAZ2xvYmFsLWNvbW1vbi9kYi9kYi1zZXR1cCdcclxuaW1wb3J0IFVzZXIgZnJvbSAnQGdsb2JhbC1jb21tb24vZGIvbW9kZWwvdXNlcidcclxuXHJcbmxldCBEaWFyeU1vZGVsXHJcblxyXG5mdW5jdGlvbiBkZWZpbmUgKCkge1xyXG4gIERpYXJ5TW9kZWwgPSBnZXREQigpLmRlZmluZShcclxuICAgICdkaWFyeScsXHJcbiAgICB7XHJcbiAgICAgIHRpdGxlOiBEYXRhVHlwZXMuU1RSSU5HLFxyXG4gICAgICBjb250ZW50OiBEYXRhVHlwZXMuVEVYVCxcclxuICAgICAgd2VpZ2h0OiBEYXRhVHlwZXMuREVDSU1BTCg1LCAyKSxcclxuICAgICAgaGVpZ2h0OiBEYXRhVHlwZXMuREVDSU1BTCg1LCAyKSxcclxuICAgICAgY3JlYXRlZEF0OiB7IHR5cGU6IERhdGFUeXBlcy5EQVRFLCBkZWZhdWx0VmFsdWU6IERhdGFUeXBlcy5OT1cgfSxcclxuICAgICAgdXBkYXRlZEF0OiB7IHR5cGU6IERhdGFUeXBlcy5EQVRFLCBkZWZhdWx0VmFsdWU6IERhdGFUeXBlcy5OT1cgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGZyZWV6ZVRhYmxlTmFtZTogdHJ1ZSxcclxuICAgICAgZGVmYXVsdFNjb3BlOiB7XHJcbiAgICAgICAgYXR0cmlidXRlczoge1xyXG4gICAgICAgICAgZXhjbHVkZTogW10sXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgKVxyXG5cclxuICBEaWFyeU1vZGVsLmJlbG9uZ3NUbyhVc2VyKCksIHsgZm9yZWlnbktleTogJ3VzZXJJZCcgfSlcclxuXHJcbiAgcmV0dXJuIERpYXJ5TW9kZWxcclxufVxyXG5cclxuY29uc3QgRGlhcnkgPSAoKSA9PiBEaWFyeU1vZGVsIHx8IGRlZmluZSgpXHJcblxyXG5leHBvcnQgZGVmYXVsdCBEaWFyeVxyXG4iXSwibWFwcGluZ3MiOiI7Ozs7OztBQUlBO0FBQ0E7QUFDQTtBQUErQztBQU4vQztBQUNBO0FBQ0E7QUFDQTs7QUFLQSxJQUFJQSxVQUFVO0FBRWQsU0FBU0MsTUFBTSxHQUFJO0VBQ2pCRCxVQUFVLEdBQUcsSUFBQUUsY0FBSyxHQUFFLENBQUNELE1BQU0sQ0FDekIsT0FBTyxFQUNQO0lBQ0VFLEtBQUssRUFBRUMsb0JBQVMsQ0FBQ0MsTUFBTTtJQUN2QkMsT0FBTyxFQUFFRixvQkFBUyxDQUFDRyxJQUFJO0lBQ3ZCQyxNQUFNLEVBQUVKLG9CQUFTLENBQUNLLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQy9CQyxNQUFNLEVBQUVOLG9CQUFTLENBQUNLLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQy9CRSxTQUFTLEVBQUU7TUFBRUMsSUFBSSxFQUFFUixvQkFBUyxDQUFDUyxJQUFJO01BQUVDLFlBQVksRUFBRVYsb0JBQVMsQ0FBQ1c7SUFBSSxDQUFDO0lBQ2hFQyxTQUFTLEVBQUU7TUFBRUosSUFBSSxFQUFFUixvQkFBUyxDQUFDUyxJQUFJO01BQUVDLFlBQVksRUFBRVYsb0JBQVMsQ0FBQ1c7SUFBSTtFQUNqRSxDQUFDLEVBQ0Q7SUFDRUUsZUFBZSxFQUFFLElBQUk7SUFDckJDLFlBQVksRUFBRTtNQUNaQyxVQUFVLEVBQUU7UUFDVkMsT0FBTyxFQUFFO01BQ1g7SUFDRjtFQUNGLENBQUMsQ0FDRjtFQUVEcEIsVUFBVSxDQUFDcUIsU0FBUyxDQUFDLElBQUFDLGFBQUksR0FBRSxFQUFFO0lBQUVDLFVBQVUsRUFBRTtFQUFTLENBQUMsQ0FBQztFQUV0RCxPQUFPdkIsVUFBVTtBQUNuQjtBQUVBLE1BQU13QixLQUFLLEdBQUcsTUFBTXhCLFVBQVUsSUFBSUMsTUFBTSxFQUFFO0FBQUEsZUFFM0J1QixLQUFLO0FBQUEifQ==