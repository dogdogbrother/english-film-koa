import seq from '../db/seq'
import { STRING, INTEGER } from '../db/types'

const Word = seq.define('word', {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '关联的上传用户id'
  },
  filmId: {
    type: INTEGER,
    allowNull: false,
    comment: '关联的电影id'
  },
  word: {
    type: STRING,
    allowNull: false,
    comment: '单词名'
  },
  keyWord: {
    type: STRING,
    allowNull: false,
    comment: '关联有道翻译API的'
  },
})

export default Word