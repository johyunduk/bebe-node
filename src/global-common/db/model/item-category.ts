/*************************************************************************
 * DB Table: item-category
 * description: bebe 쇼핑몰 상품 카테고리
 **************************************************************************/
import { DataTypes } from 'sequelize'
import { getDB } from '@global-common/db/db-setup'
import MallItem from '@global-common/db/model/mall-item'
import Category from '@global-common/db/model/category'

let ItemCategoryModel

function define () {
  ItemCategoryModel = getDB().define(
    'item_category',
    {
      createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    {
      freezeTableName: true,
      indexes: [],
    },
  )

  ItemCategoryModel.belongsTo(MallItem(), { foreignKey: 'mallItemId' })
  ItemCategoryModel.belongsTo(Category(), { foreignKey: 'categoryId' })

  return ItemCategoryModel
}

const ItemCategory = () => ItemCategoryModel || define()

export default ItemCategory
