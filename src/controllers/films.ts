import { Film, Fragment } from '../models/index'
import type { Context } from "koa"

export async function filmList(ctx: Context) {
  ctx.body = await Film.findAll()
}

export async function addFilm(ctx: Context) {
  ctx.verifyParams({
    filmName: { type: 'string', required: true, min: 1 },
    filmCover: { type: 'string', required: true},
  })
  const { filmName, filmCover } = ctx.request.body
  const [ _, created ] = await Film.findOrCreate({
    where: { filmName },
    defaults: { filmCover }
  })
  if (created) {
    return ctx.status = 201
  }
  return ctx.throw(403, '电影名已重复')
}

export async function addFragment(ctx: Context) {
  ctx.verifyParams({
    filmId: { type: 'string', required: true },
    fragmentUrl: { type: 'string', required: true }
  })
  const { filmId }  = ctx.params
  const { fragmentUrl } = ctx.request.body
  await Fragment.create({ filmId, fragmentUrl })
  return ctx.status = 201
}

export async function getFragmentList(ctx: Context) {
  ctx.verifyParams({
    filmId: { type: 'string', required: true },
  })
  const { filmId }  = ctx.params
  const fragments = await Fragment.findAll({
    where: { filmId }
  })
  ctx.body = fragments
}