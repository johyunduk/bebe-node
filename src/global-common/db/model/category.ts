/*************************************************************************
 * DB Table: category
 * description: bebe 카테고리
 **************************************************************************/
import { DataTypes } from 'sequelize'
import { getDB } from '@global-common/db/db-setup'
import ItemCategory from '@global-common/db/model/item-category'

let CategoryModel

function define () {
  CategoryModel = getDB().define(
    'category',
    {
      name: DataTypes.STRING,
      createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    {
      freezeTableName: true,
      indexes: [],
    },
  )

  CategoryModel.hasMany(ItemCategory())

  return CategoryModel
}

const Category = () => CategoryModel || define()

export default Category
