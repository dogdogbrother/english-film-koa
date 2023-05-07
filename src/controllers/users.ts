import { Context } from "koa";
import { _JWT_KEY_ } from '../conf/secretKeys'
import * as Sequelize from 'sequelize'
import jsonwebtoken from 'jsonwebtoken'
import doCrypto from '../utils/cryp'

const { User } = require('../models/index')

const Op = Sequelize.Op

interface LoginProp{
  username: string
  password: string
}
export async function login(ctx: Context) {
  ctx.verifyParams({
    username: { type: 'string', required: true },
    password: { type: 'string', required: true },
  })
  const { username, password } = ctx.request.body as LoginProp
  const user = await User.findOne({
    attributes: ['username'],
    where: {
      [Op.and]: [{ username },{ password: doCrypto(password) }]
    }
  })
  if (user) {
    const { nickname, id } = user
    const token = jsonwebtoken.sign(
      { 
        id,
      }, 
      _JWT_KEY_, 
      { expiresIn: '20d' }
    )
    ctx.body = {
      nickname,
      id,
      token
    }
  } else {
    return ctx.throw(403, '账户名或者密码错误')
  }
}