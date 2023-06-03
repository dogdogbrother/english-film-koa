import seq from '../db/seq'
import { STRING } from '../db/types'
import { Model, InferAttributes, InferCreationAttributes } from 'sequelize'

class FilmProp  {
  filmName: string
  filmCover: string
}
class FilmModel extends Model<InferAttributes<FilmModel>, InferCreationAttributes<FilmModel>>  {
  public id?: number;
  public filmName!: string;
  public filmCover!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
const Film = seq.define<FilmModel, FilmProp>('film', {
  filmName: {
    type: STRING,
    allowNull: false,
    unique: true,
    comment: '电影名'
  },
  filmCover: {
    type: STRING,
    allowNull: false,
    unique: true,
    comment: '电影封面'
  }
})

export default Film