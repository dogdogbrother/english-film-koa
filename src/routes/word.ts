import * as Router from 'koa-router'
import { youdao } from '../controllers/words'

const router = new Router({ prefix:'/word' })
router.get('/translate/:word', youdao)

export default router