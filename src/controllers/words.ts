import { Context } from 'koa'
import { getYoudaoAndFormat } from '../server/word'
import { Word, Youdao } from '../models'

export async function youdao(ctx: Context) {
  ctx.verifyParams({
    word: { type: 'string', required: true }
  })
  const { word  } = ctx.params
  const searchWrod = await Youdao.findOne({
    where: { word }
  })
  // 如果能搜到结果,直接给用户即可
  if (searchWrod) {
    const { explains, web, ...rest } = searchWrod.dataValues
    return ctx.body = {
      ...rest,
      explains: explains? JSON.parse(explains) : null,
      web: web ? JSON.parse(web) : null
    }
  }
  const _youdao_ = await getYoudaoAndFormat(word)
  if (_youdao_.error) {
    return ctx.throw(400, '翻译失败了呀,请检查下单词是否正常')
  }
  const saveWord = await Youdao.create(_youdao_)
  const { explains, web: _web, ...rest } = saveWord.dataValues
  ctx.body = {
    ...rest,
    explains: JSON.parse(explains),
    web: _web ? JSON.parse(_web) : null
  }
}

interface CollectProp {
  word: string
  filmId: string
  keyWord: string
}
export async function collect(ctx: Context) {
  ctx.verifyParams({
    word: { type: 'string', required: true },
    filmId: { type: 'string', required: true },
  })
  const { id: userId } = ctx.state.user
  const { word, filmId } = ctx.request.body as CollectProp 
  await Word.create({
    word,
    keyWord: word,  // 暂时用一个 后续用户端优化
    filmId,
    userId
  })
  ctx.status = 201
}

export async function collectList(ctx: Context) {
  const { id: userId } = ctx.state.user
  ctx.body = await Word.findAll({where: { userId }})
}