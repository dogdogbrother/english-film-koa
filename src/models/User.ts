import seq from '../db/seq'
import { STRING } from '../db/types'

const User = seq.define('user', {
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

export default User