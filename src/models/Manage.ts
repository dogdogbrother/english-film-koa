import seq from '../db/seq'
import { STRING } from '../db/types'
import { Model, InferAttributes, InferCreationAttributes } from 'sequelize'

class ManageUserProp  {
  username: string
  password: string
}
class ManageUserModel extends Model<InferAttributes<ManageUserModel>, InferCreationAttributes<ManageUserModel>>  {
  public id?: number;
  public username!: string;
  public password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
const ManageUser = seq.define<ManageUserModel, ManageUserProp>('user', {
  username: {
    type: STRING,
    allowNull: false,
    unique: true,
    comment: '用户名'
  },
  password: {
    type: STRING,
    allowNull: false,
    comment: '密码'
  }
}, {
  defaultScope: {
    attributes: {
      // 排除密码，不返回密码
      exclude: ['password']
    }
  }
})

export default ManageUser