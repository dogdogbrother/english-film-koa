import { Context } from 'koa'
import { getYoudaoAndFormat } from '../server/word'
export async function youdao(ctx: Context) {
  ctx.verifyParams({
    word: { type: 'string', required: true }
  })
  // console.log(ctx.params, ctx.request.query);
  const { word  } = ctx.params

  const data = await getYoudaoAndFormat(word)
  ctx.body = {
    data
  }
}