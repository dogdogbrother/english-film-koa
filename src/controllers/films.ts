import { Film, Fragment, Caption } from '../models/index'
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

export async function getFragment(ctx: Context) {
  ctx.verifyParams({
    fragmentId: { type: 'string', required: true },
  })
  const { fragmentId }  = ctx.params
  ctx.body = await Fragment.findByPk(fragmentId)
}

export async function getCaption(ctx: Context) {
  ctx.verifyParams({
    fragmentId: { type: 'string', required: true },
  })
  const { fragmentId }  = ctx.params
  const findCaption = await Caption.findOne({
    where: { fragmentId }
  })
  if (findCaption) {
    const { value } = findCaption
    ctx.body = JSON.parse(value)
  } else ctx.body = []
}

export async function addCaption(ctx: Context) {
  ctx.verifyParams({
    fragmentId: { type: 'string', required: true },
  })
  const { fragmentId }  = ctx.params
  const { caption } = ctx.request.body
  const value = JSON.stringify(caption)

  const [_, created] = await Caption.findOrCreate({
    where: { fragmentId },
    defaults: {
      value
    }
  })
  if (created) {
    return ctx.status = 201
  }
  await Caption.update(
    { value },
    {
      where: { fragmentId }
    }
  )
  return ctx.status = 201
}

export async function getFragmentInfo(ctx: Context) {
  ctx.verifyParams({
    fragmentId: { type: 'string', required: true },
  })
  const { fragmentId }  = ctx.params
  const findFragment = await Fragment.findByPk(fragmentId)
  ctx.body = findFragment
}