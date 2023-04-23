"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _sequelize = require("sequelize");
var _dbSetup = require("@global-common/db/db-setup");
var _mallItem = _interopRequireDefault(require("@global-common/db/model/mall-item"));
var _category = _interopRequireDefault(require("@global-common/db/model/category"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*************************************************************************
 * DB Table: item-category
 * description: bebe 쇼핑몰 상품 카테고리
 **************************************************************************/

let ItemCategoryModel;
function define() {
  ItemCategoryModel = (0, _dbSetup.getDB)().define('item_category', {
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
  ItemCategoryModel.belongsTo((0, _mallItem.default)(), {
    foreignKey: 'mallItemId'
  });
  ItemCategoryModel.belongsTo((0, _category.default)(), {
    foreignKey: 'categoryId'
  });
  return ItemCategoryModel;
}
const ItemCategory = () => ItemCategoryModel || define();
var _default = ItemCategory;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJJdGVtQ2F0ZWdvcnlNb2RlbCIsImRlZmluZSIsImdldERCIiwiY3JlYXRlZEF0IiwidHlwZSIsIkRhdGFUeXBlcyIsIkRBVEUiLCJkZWZhdWx0VmFsdWUiLCJOT1ciLCJ1cGRhdGVkQXQiLCJmcmVlemVUYWJsZU5hbWUiLCJpbmRleGVzIiwiYmVsb25nc1RvIiwiTWFsbEl0ZW0iLCJmb3JlaWduS2V5IiwiQ2F0ZWdvcnkiLCJJdGVtQ2F0ZWdvcnkiXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZ2xvYmFsLWNvbW1vbi9kYi9tb2RlbC9pdGVtLWNhdGVnb3J5LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAqIERCIFRhYmxlOiBpdGVtLWNhdGVnb3J5XHJcbiAqIGRlc2NyaXB0aW9uOiBiZWJlIOyHvO2VkeuqsCDsg4Htkogg7Lm07YWM6rOg66asXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuaW1wb3J0IHsgRGF0YVR5cGVzIH0gZnJvbSAnc2VxdWVsaXplJ1xyXG5pbXBvcnQgeyBnZXREQiB9IGZyb20gJ0BnbG9iYWwtY29tbW9uL2RiL2RiLXNldHVwJ1xyXG5pbXBvcnQgTWFsbEl0ZW0gZnJvbSAnQGdsb2JhbC1jb21tb24vZGIvbW9kZWwvbWFsbC1pdGVtJ1xyXG5pbXBvcnQgQ2F0ZWdvcnkgZnJvbSAnQGdsb2JhbC1jb21tb24vZGIvbW9kZWwvY2F0ZWdvcnknXHJcblxyXG5sZXQgSXRlbUNhdGVnb3J5TW9kZWxcclxuXHJcbmZ1bmN0aW9uIGRlZmluZSAoKSB7XHJcbiAgSXRlbUNhdGVnb3J5TW9kZWwgPSBnZXREQigpLmRlZmluZShcclxuICAgICdpdGVtX2NhdGVnb3J5JyxcclxuICAgIHtcclxuICAgICAgY3JlYXRlZEF0OiB7IHR5cGU6IERhdGFUeXBlcy5EQVRFLCBkZWZhdWx0VmFsdWU6IERhdGFUeXBlcy5OT1cgfSxcclxuICAgICAgdXBkYXRlZEF0OiB7IHR5cGU6IERhdGFUeXBlcy5EQVRFLCBkZWZhdWx0VmFsdWU6IERhdGFUeXBlcy5OT1cgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGZyZWV6ZVRhYmxlTmFtZTogdHJ1ZSxcclxuICAgICAgaW5kZXhlczogW10sXHJcbiAgICB9LFxyXG4gIClcclxuXHJcbiAgSXRlbUNhdGVnb3J5TW9kZWwuYmVsb25nc1RvKE1hbGxJdGVtKCksIHsgZm9yZWlnbktleTogJ21hbGxJdGVtSWQnIH0pXHJcbiAgSXRlbUNhdGVnb3J5TW9kZWwuYmVsb25nc1RvKENhdGVnb3J5KCksIHsgZm9yZWlnbktleTogJ2NhdGVnb3J5SWQnIH0pXHJcblxyXG4gIHJldHVybiBJdGVtQ2F0ZWdvcnlNb2RlbFxyXG59XHJcblxyXG5jb25zdCBJdGVtQ2F0ZWdvcnkgPSAoKSA9PiBJdGVtQ2F0ZWdvcnlNb2RlbCB8fCBkZWZpbmUoKVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgSXRlbUNhdGVnb3J5XHJcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFBdUQ7QUFQdkQ7QUFDQTtBQUNBO0FBQ0E7O0FBTUEsSUFBSUEsaUJBQWlCO0FBRXJCLFNBQVNDLE1BQU0sR0FBSTtFQUNqQkQsaUJBQWlCLEdBQUcsSUFBQUUsY0FBSyxHQUFFLENBQUNELE1BQU0sQ0FDaEMsZUFBZSxFQUNmO0lBQ0VFLFNBQVMsRUFBRTtNQUFFQyxJQUFJLEVBQUVDLG9CQUFTLENBQUNDLElBQUk7TUFBRUMsWUFBWSxFQUFFRixvQkFBUyxDQUFDRztJQUFJLENBQUM7SUFDaEVDLFNBQVMsRUFBRTtNQUFFTCxJQUFJLEVBQUVDLG9CQUFTLENBQUNDLElBQUk7TUFBRUMsWUFBWSxFQUFFRixvQkFBUyxDQUFDRztJQUFJO0VBQ2pFLENBQUMsRUFDRDtJQUNFRSxlQUFlLEVBQUUsSUFBSTtJQUNyQkMsT0FBTyxFQUFFO0VBQ1gsQ0FBQyxDQUNGO0VBRURYLGlCQUFpQixDQUFDWSxTQUFTLENBQUMsSUFBQUMsaUJBQVEsR0FBRSxFQUFFO0lBQUVDLFVBQVUsRUFBRTtFQUFhLENBQUMsQ0FBQztFQUNyRWQsaUJBQWlCLENBQUNZLFNBQVMsQ0FBQyxJQUFBRyxpQkFBUSxHQUFFLEVBQUU7SUFBRUQsVUFBVSxFQUFFO0VBQWEsQ0FBQyxDQUFDO0VBRXJFLE9BQU9kLGlCQUFpQjtBQUMxQjtBQUVBLE1BQU1nQixZQUFZLEdBQUcsTUFBTWhCLGlCQUFpQixJQUFJQyxNQUFNLEVBQUU7QUFBQSxlQUV6Q2UsWUFBWTtBQUFBIn0=