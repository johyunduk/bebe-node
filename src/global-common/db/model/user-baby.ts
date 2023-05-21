/*************************************************************************
 * DB Table: user_baby
 * description: bebe 사용하는 유저의 아이
 **************************************************************************/
import { DataTypes } from 'sequelize'
import { getDB } from '@global-common/db/db-setup'
import User from '@global-common/db/model/user'

let UserBabyModel

function define () {
  UserBabyModel = getDB().define(
    'user_baby',
    {
      name: DataTypes.STRING,
      birthDate: DataTypes.DATE,
      gender: DataTypes.STRING,
      face: DataTypes.STRING,
      expectDate: DataTypes.DATEONLY,
      pregnantDate: DataTypes.DATEONLY,
      createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    {
      freezeTableName: true,
    },
  )

  UserBabyModel.belongsTo(User(), { foreignKey: 'userId' })

  return UserBabyModel
}

const UserBaby = () => UserBabyModel || define()

export default UserBaby
