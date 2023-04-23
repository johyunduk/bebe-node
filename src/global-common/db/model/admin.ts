/*************************************************************************
* DB Table: admin
* description: bebe 관리자
**************************************************************************/
import { DataTypes } from 'sequelize'
import { getDB } from '@global-common/db/db-setup'
import User from '@global-common/db/model/user'

let AdminModel

function define () {
  AdminModel = getDB().define(
    'admin',
    {
      createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    {
      timestamps: true,
      freezeTableName: true,
    },
  )

  AdminModel.belongsTo(User())

  return AdminModel
}

const Admin = () => AdminModel || define()

export default Admin
