import seq from '../db/seq'
import { INTEGER, TEXT } from '../db/types'
import { Model, InferAttributes, InferCreationAttributes } from 'sequelize'

class CaptionProp  {
  value: string
  fragmentId: string
}
class CaptionModel extends Model<InferAttributes<CaptionModel>, InferCreationAttributes<CaptionModel>>  {
  public id?: number;
  public value!: string;
  public fragmentId!: string
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
const Caption = seq.define<CaptionModel, CaptionProp>('caption', {
  value: {
    type: TEXT,
    allowNull: false,
    comment: '字幕内容 '
  },
  fragmentId: {
    type: INTEGER,
    allowNull: false,
    unique: true,
    comment: '关联的片段id'
  }
})

export default Caption