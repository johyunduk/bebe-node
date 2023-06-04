/*************************************************************************
 * DB Table: mall_item
 * description: bebe 쇼핑몰 상품
 **************************************************************************/
import { DataTypes } from 'sequelize'
import { getDB } from '@global-common/db/db-setup'
import ItemCategory from '@global-common/db/model/item-category'

let MallItemModel

function define () {
  MallItemModel = getDB().define(
    'mall_item',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
      description: DataTypes.STRING,
      image: DataTypes.STRING,
      createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    {
      freezeTableName: true,
      indexes: [],
    },
  )

  MallItemModel.hasMany(ItemCategory())

  return MallItemModel
}

const MallItem = () => MallItemModel || define()

export default MallItem
