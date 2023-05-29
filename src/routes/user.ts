import * as Router from 'koa-router'
import * as jwt from 'koa-jwt'
import { _JWT_KEY_ } from '../conf/secretKeys'
import { login, info } from '../controllers/users'

const router = new Router({ prefix: '/user' })
const auth = jwt({ secret: _JWT_KEY_ })

router.post('/login', login)
router.get('/info', auth, info)
export default router