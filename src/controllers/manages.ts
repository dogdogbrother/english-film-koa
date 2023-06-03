import type { Context } from "koa"
import { LoginProp, register, sign } from "./users"
import { ManageUser, Film } from '../models/index'
import doCrypto from '../utils/cryp'
import * as Sequelize from 'sequelize'

const Op = Sequelize.Op

export async function login(ctx: Context) {
  ctx.verifyParams({
    username: { type: 'string', required: true, min: 1 },
    password: { type: 'string', required: true, min: 1 },
  })
  const { username, password } = ctx.request.body as LoginProp
  if (username !== 'tsdhr1') {
    return ctx.throw(403, '只有管理员才可以登录')
  }
  const findUserName = await ManageUser.findOne({
    where: { username }
  })
  const user = await ManageUser.findOne({
    attributes: ['username', 'id'],
    where: {
      [Op.and]: [{ username },{ password: doCrypto(password) }]
    }
  })
  // 连用户名都没,直接注册
  if (!findUserName) {
    const createUser = await register({username, password}, ManageUser)
    return sign(ctx, createUser.id, createUser.username, 'register')
  }
  // 有用户名但是密码不对
  if (findUserName && !user) {
    return ctx.throw(403, '密码错误')
  }
  // 匹配 登录
  return sign(ctx, user.id, user.username, 'login')
}

export async function info(ctx: Context) {
  const { id } = ctx.state.user
  const user = await ManageUser.findByPk(id)
  ctx.body = user
}

export async function filmList(ctx: Context) {
  
}

export async function addFilm(ctx: Context) {
  ctx.verifyParams({
    filmName: { type: 'string', required: true, min: 1 },
    filmCover: { type: 'string', required: true, min: 1 },
  })
  const { filmName, filmCover } = ctx.request.body
  const findFilmName = await Film.findOne({
    where: { filmName }
  })
  if (findFilmName) {
    return ctx.throw(400, '已经有这部电影了')
  }
  await Film.create({ filmName, filmCover })
  return ctx.status = 201
}