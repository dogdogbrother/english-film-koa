import * as Router from 'koa-router'
import * as jwt from 'koa-jwt'
import { _JWT_KEY_ } from '../conf/secretKeys'
import { login, info, addFilm } from '../controllers/manages'

const router = new Router({ prefix: '/manage' })
const auth = jwt({ secret: _JWT_KEY_ })

router.post('/user/login', login)
router.get('/user/info', auth, info)

// router.get('/film/list', auth, filmList)
router.post('/film', auth, addFilm)

export default router