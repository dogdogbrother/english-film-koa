import * as Router from 'koa-router'
import * as jwt from 'koa-jwt'
import { youdao, collect } from '../controllers/words'
import { _JWT_KEY_ } from '../conf/secretKeys'

const router = new Router({ prefix:'/word' })
const auth = jwt({ secret: _JWT_KEY_ })

router.get('/translate/:word', youdao)
router.post('/collect/:word', auth, collect)

export default router