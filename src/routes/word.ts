import * as Router from 'koa-router'
import * as jwt from 'koa-jwt'
import { youdao, collect, collectList, delCollect } from '../controllers/words'
import { _JWT_KEY_ } from '../conf/secretKeys'

const router = new Router({ prefix:'/word' })
const auth = jwt({ secret: _JWT_KEY_ })

router.get('/translate/:word', youdao)
router.post('/collect', auth, collect)
router.get('/collect', auth, collectList)
router.delete('/collect/:word', auth, delCollect)
export default router