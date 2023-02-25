/*************************************************************************
* DB Table: admin
* description: back-office 사용하는 유저
**************************************************************************/
import { DataTypes } from 'sequelize'
import { getDB } from '@global-common/db/db-setup'

export enum AdminStatus {
  StandBy = 'StandBy',
  Activated = 'Activated',
  Deactivated = 'Deactivated',
}

let AdminModel

function define () {
  AdminModel = getDB().define(
    'admin',
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,

      adminStatus: { type: DataTypes.STRING, defaultValue: AdminStatus.StandBy },
      adminGrade: { type: DataTypes.STRING, defaultValue: '' }, // TODO: 추후에 등급에 따라 화면제한 필요
      refreshToken: { type: DataTypes.STRING },

      createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    {
      timestamps: true,
      freezeTableName: true,
      indexes: [{ fields: ['email'], unique: true }],
    },
  )

  return AdminModel
}

const Admin = () => AdminModel || define()

export default Admin
