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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJNYWxsSXRlbU1vZGVsIiwiZGVmaW5lIiwiZ2V0REIiLCJuYW1lIiwiRGF0YVR5cGVzIiwiU1RSSU5HIiwicHJpY2UiLCJJTlRFR0VSIiwiZGVzY3JpcHRpb24iLCJpbWFnZSIsImNyZWF0ZWRBdCIsInR5cGUiLCJEQVRFIiwiZGVmYXVsdFZhbHVlIiwiTk9XIiwidXBkYXRlZEF0IiwiZnJlZXplVGFibGVOYW1lIiwiaW5kZXhlcyIsImhhc01hbnkiLCJJdGVtQ2F0ZWdvcnkiLCJNYWxsSXRlbSJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9nbG9iYWwtY29tbW9uL2RiL21vZGVsL21hbGwtaXRlbS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gKiBEQiBUYWJsZTogbWFsbF9pdGVtXHJcbiAqIGRlc2NyaXB0aW9uOiBiZWJlIOyHvO2VkeuqsCDsg4HtkohcclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5pbXBvcnQgeyBEYXRhVHlwZXMgfSBmcm9tICdzZXF1ZWxpemUnXHJcbmltcG9ydCB7IGdldERCIH0gZnJvbSAnQGdsb2JhbC1jb21tb24vZGIvZGItc2V0dXAnXHJcbmltcG9ydCBJdGVtQ2F0ZWdvcnkgZnJvbSAnQGdsb2JhbC1jb21tb24vZGIvbW9kZWwvaXRlbS1jYXRlZ29yeSdcclxuXHJcbmxldCBNYWxsSXRlbU1vZGVsXHJcblxyXG5mdW5jdGlvbiBkZWZpbmUgKCkge1xyXG4gIE1hbGxJdGVtTW9kZWwgPSBnZXREQigpLmRlZmluZShcclxuICAgICdtYWxsX2l0ZW0nLFxyXG4gICAge1xyXG4gICAgICBuYW1lOiBEYXRhVHlwZXMuU1RSSU5HLFxyXG4gICAgICBwcmljZTogRGF0YVR5cGVzLklOVEVHRVIsXHJcbiAgICAgIGRlc2NyaXB0aW9uOiBEYXRhVHlwZXMuU1RSSU5HLFxyXG4gICAgICBpbWFnZTogRGF0YVR5cGVzLlNUUklORyxcclxuICAgICAgY3JlYXRlZEF0OiB7IHR5cGU6IERhdGFUeXBlcy5EQVRFLCBkZWZhdWx0VmFsdWU6IERhdGFUeXBlcy5OT1cgfSxcclxuICAgICAgdXBkYXRlZEF0OiB7IHR5cGU6IERhdGFUeXBlcy5EQVRFLCBkZWZhdWx0VmFsdWU6IERhdGFUeXBlcy5OT1cgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGZyZWV6ZVRhYmxlTmFtZTogdHJ1ZSxcclxuICAgICAgaW5kZXhlczogW10sXHJcbiAgICB9LFxyXG4gIClcclxuXHJcbiAgTWFsbEl0ZW1Nb2RlbC5oYXNNYW55KEl0ZW1DYXRlZ29yeSgpKVxyXG5cclxuICByZXR1cm4gTWFsbEl0ZW1Nb2RlbFxyXG59XHJcblxyXG5jb25zdCBNYWxsSXRlbSA9ICgpID0+IE1hbGxJdGVtTW9kZWwgfHwgZGVmaW5lKClcclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1hbGxJdGVtXHJcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBSUE7QUFDQTtBQUNBO0FBQWdFO0FBTmhFO0FBQ0E7QUFDQTtBQUNBOztBQUtBLElBQUlBLGFBQWE7QUFFakIsU0FBU0MsTUFBTSxHQUFJO0VBQ2pCRCxhQUFhLEdBQUcsSUFBQUUsY0FBSyxHQUFFLENBQUNELE1BQU0sQ0FDNUIsV0FBVyxFQUNYO0lBQ0VFLElBQUksRUFBRUMsb0JBQVMsQ0FBQ0MsTUFBTTtJQUN0QkMsS0FBSyxFQUFFRixvQkFBUyxDQUFDRyxPQUFPO0lBQ3hCQyxXQUFXLEVBQUVKLG9CQUFTLENBQUNDLE1BQU07SUFDN0JJLEtBQUssRUFBRUwsb0JBQVMsQ0FBQ0MsTUFBTTtJQUN2QkssU0FBUyxFQUFFO01BQUVDLElBQUksRUFBRVAsb0JBQVMsQ0FBQ1EsSUFBSTtNQUFFQyxZQUFZLEVBQUVULG9CQUFTLENBQUNVO0lBQUksQ0FBQztJQUNoRUMsU0FBUyxFQUFFO01BQUVKLElBQUksRUFBRVAsb0JBQVMsQ0FBQ1EsSUFBSTtNQUFFQyxZQUFZLEVBQUVULG9CQUFTLENBQUNVO0lBQUk7RUFDakUsQ0FBQyxFQUNEO0lBQ0VFLGVBQWUsRUFBRSxJQUFJO0lBQ3JCQyxPQUFPLEVBQUU7RUFDWCxDQUFDLENBQ0Y7RUFFRGpCLGFBQWEsQ0FBQ2tCLE9BQU8sQ0FBQyxJQUFBQyxxQkFBWSxHQUFFLENBQUM7RUFFckMsT0FBT25CLGFBQWE7QUFDdEI7QUFFQSxNQUFNb0IsUUFBUSxHQUFHLE1BQU1wQixhQUFhLElBQUlDLE1BQU0sRUFBRTtBQUFBLGVBRWpDbUIsUUFBUTtBQUFBIn0=