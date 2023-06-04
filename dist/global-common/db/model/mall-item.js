"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _sequelize = require("sequelize");
var _dbSetup = require("@global-common/db/db-setup");
var _itemCategory = _interopRequireDefault(require("@global-common/db/model/item-category"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*************************************************************************
 * DB Table: mall_item
 * description: bebe 쇼핑몰 상품
 **************************************************************************/

let MallItemModel;
function define() {
  MallItemModel = (0, _dbSetup.getDB)().define('mall_item', {
    id: {
      type: _sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: _sequelize.DataTypes.STRING,
    price: _sequelize.DataTypes.INTEGER,
    description: _sequelize.DataTypes.STRING,
    image: _sequelize.DataTypes.STRING,
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
    indexes: []
  });
  MallItemModel.hasMany((0, _itemCategory.default)());
  return MallItemModel;
}
const MallItem = () => MallItemModel || define();
var _default = MallItem;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJNYWxsSXRlbU1vZGVsIiwiZGVmaW5lIiwiZ2V0REIiLCJpZCIsInR5cGUiLCJEYXRhVHlwZXMiLCJJTlRFR0VSIiwicHJpbWFyeUtleSIsImF1dG9JbmNyZW1lbnQiLCJuYW1lIiwiU1RSSU5HIiwicHJpY2UiLCJkZXNjcmlwdGlvbiIsImltYWdlIiwiY3JlYXRlZEF0IiwiREFURSIsImRlZmF1bHRWYWx1ZSIsIk5PVyIsInVwZGF0ZWRBdCIsImZyZWV6ZVRhYmxlTmFtZSIsImluZGV4ZXMiLCJoYXNNYW55IiwiSXRlbUNhdGVnb3J5IiwiTWFsbEl0ZW0iXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZ2xvYmFsLWNvbW1vbi9kYi9tb2RlbC9tYWxsLWl0ZW0udHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICogREIgVGFibGU6IG1hbGxfaXRlbVxyXG4gKiBkZXNjcmlwdGlvbjogYmViZSDsh7ztlZHrqrAg7IOB7ZKIXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuaW1wb3J0IHsgRGF0YVR5cGVzIH0gZnJvbSAnc2VxdWVsaXplJ1xyXG5pbXBvcnQgeyBnZXREQiB9IGZyb20gJ0BnbG9iYWwtY29tbW9uL2RiL2RiLXNldHVwJ1xyXG5pbXBvcnQgSXRlbUNhdGVnb3J5IGZyb20gJ0BnbG9iYWwtY29tbW9uL2RiL21vZGVsL2l0ZW0tY2F0ZWdvcnknXHJcblxyXG5sZXQgTWFsbEl0ZW1Nb2RlbFxyXG5cclxuZnVuY3Rpb24gZGVmaW5lICgpIHtcclxuICBNYWxsSXRlbU1vZGVsID0gZ2V0REIoKS5kZWZpbmUoXHJcbiAgICAnbWFsbF9pdGVtJyxcclxuICAgIHtcclxuICAgICAgaWQ6IHsgdHlwZTogRGF0YVR5cGVzLklOVEVHRVIsIHByaW1hcnlLZXk6IHRydWUsIGF1dG9JbmNyZW1lbnQ6IHRydWUgfSxcclxuICAgICAgbmFtZTogRGF0YVR5cGVzLlNUUklORyxcclxuICAgICAgcHJpY2U6IERhdGFUeXBlcy5JTlRFR0VSLFxyXG4gICAgICBkZXNjcmlwdGlvbjogRGF0YVR5cGVzLlNUUklORyxcclxuICAgICAgaW1hZ2U6IERhdGFUeXBlcy5TVFJJTkcsXHJcbiAgICAgIGNyZWF0ZWRBdDogeyB0eXBlOiBEYXRhVHlwZXMuREFURSwgZGVmYXVsdFZhbHVlOiBEYXRhVHlwZXMuTk9XIH0sXHJcbiAgICAgIHVwZGF0ZWRBdDogeyB0eXBlOiBEYXRhVHlwZXMuREFURSwgZGVmYXVsdFZhbHVlOiBEYXRhVHlwZXMuTk9XIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBmcmVlemVUYWJsZU5hbWU6IHRydWUsXHJcbiAgICAgIGluZGV4ZXM6IFtdLFxyXG4gICAgfSxcclxuICApXHJcblxyXG4gIE1hbGxJdGVtTW9kZWwuaGFzTWFueShJdGVtQ2F0ZWdvcnkoKSlcclxuXHJcbiAgcmV0dXJuIE1hbGxJdGVtTW9kZWxcclxufVxyXG5cclxuY29uc3QgTWFsbEl0ZW0gPSAoKSA9PiBNYWxsSXRlbU1vZGVsIHx8IGRlZmluZSgpXHJcblxyXG5leHBvcnQgZGVmYXVsdCBNYWxsSXRlbVxyXG4iXSwibWFwcGluZ3MiOiI7Ozs7OztBQUlBO0FBQ0E7QUFDQTtBQUFnRTtBQU5oRTtBQUNBO0FBQ0E7QUFDQTs7QUFLQSxJQUFJQSxhQUFhO0FBRWpCLFNBQVNDLE1BQU0sR0FBSTtFQUNqQkQsYUFBYSxHQUFHLElBQUFFLGNBQUssR0FBRSxDQUFDRCxNQUFNLENBQzVCLFdBQVcsRUFDWDtJQUNFRSxFQUFFLEVBQUU7TUFBRUMsSUFBSSxFQUFFQyxvQkFBUyxDQUFDQyxPQUFPO01BQUVDLFVBQVUsRUFBRSxJQUFJO01BQUVDLGFBQWEsRUFBRTtJQUFLLENBQUM7SUFDdEVDLElBQUksRUFBRUosb0JBQVMsQ0FBQ0ssTUFBTTtJQUN0QkMsS0FBSyxFQUFFTixvQkFBUyxDQUFDQyxPQUFPO0lBQ3hCTSxXQUFXLEVBQUVQLG9CQUFTLENBQUNLLE1BQU07SUFDN0JHLEtBQUssRUFBRVIsb0JBQVMsQ0FBQ0ssTUFBTTtJQUN2QkksU0FBUyxFQUFFO01BQUVWLElBQUksRUFBRUMsb0JBQVMsQ0FBQ1UsSUFBSTtNQUFFQyxZQUFZLEVBQUVYLG9CQUFTLENBQUNZO0lBQUksQ0FBQztJQUNoRUMsU0FBUyxFQUFFO01BQUVkLElBQUksRUFBRUMsb0JBQVMsQ0FBQ1UsSUFBSTtNQUFFQyxZQUFZLEVBQUVYLG9CQUFTLENBQUNZO0lBQUk7RUFDakUsQ0FBQyxFQUNEO0lBQ0VFLGVBQWUsRUFBRSxJQUFJO0lBQ3JCQyxPQUFPLEVBQUU7RUFDWCxDQUFDLENBQ0Y7RUFFRHBCLGFBQWEsQ0FBQ3FCLE9BQU8sQ0FBQyxJQUFBQyxxQkFBWSxHQUFFLENBQUM7RUFFckMsT0FBT3RCLGFBQWE7QUFDdEI7QUFFQSxNQUFNdUIsUUFBUSxHQUFHLE1BQU12QixhQUFhLElBQUlDLE1BQU0sRUFBRTtBQUFBLGVBRWpDc0IsUUFBUTtBQUFBIn0=