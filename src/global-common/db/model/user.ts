/*************************************************************************
 * DB Table: user
 * description: bebe 사용하는 유저
 **************************************************************************/
import { DataTypes } from 'sequelize'
import { getDB } from '@global-common/db/db-setup'

export enum UserStatus {
    Activated = 'Activated',
    Deactivated = 'Deactivated',
}

let UserModel

function define () {
  UserModel = getDB().define(
    'user',
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      gender: DataTypes.STRING,
      birthDate: DataTypes.DATE,
      userStatus: { type: DataTypes.STRING, defaultValue: UserStatus.Activated },
      refreshToken: { type: DataTypes.STRING },
      createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    {
      freezeTableName: true,
      indexes: [{ fields: ['email'], unique: true }],
      defaultScope: {
        attributes: {
          exclude: [],
        },
      },
    },
  )

  return UserModel
}

const User = () => UserModel || define()

export default User
