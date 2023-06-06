import seq from '../db/seq'
import { STRING, INTEGER } from '../db/types'
import { Model, InferAttributes, InferCreationAttributes } from 'sequelize'

class FragmentProp  {
  fragmentUrl: string
  filmId: number
}
class FragmentModel extends Model<InferAttributes<FragmentModel>, InferCreationAttributes<FragmentModel>>  {
  public id?: number;
  public fragmentUrl!: string;
  public filmId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
const Fragment = seq.define<FragmentModel, FragmentProp>('fragment', {
  fragmentUrl: {
    type: STRING,
    allowNull: false,
    comment: '剧集分段的链接地址'
  },
  filmId: {
    type: INTEGER,
    allowNull: false,
    comment: '关联的电影id'
  }
})

export default Fragment