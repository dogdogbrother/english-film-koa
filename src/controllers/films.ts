import { Film } from '../models/index'
import type { Context } from "koa"

export async function filmList(ctx: Context) {
  ctx.body = await Film.findAll()
}