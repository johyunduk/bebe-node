/*************************************************************************
 * DB Table: diary
 * description: bebe 일기
 **************************************************************************/
import { DataTypes } from 'sequelize'
import { getDB } from '@global-common/db/db-setup'
import User from '@global-common/db/model/user'

let DiaryModel

function define () {
  DiaryModel = getDB().define(
    'diary',
    {
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      weight: DataTypes.DECIMAL(5, 2),
      height: DataTypes.DECIMAL(5, 2),
      createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    {
      freezeTableName: true,
      defaultScope: {
        attributes: {
          exclude: [],
        },
      },
    },
  )

  DiaryModel.belongsTo(User(), { foreignKey: 'userId' })

  return DiaryModel
}

const Diary = () => DiaryModel || define()

export default Diary
