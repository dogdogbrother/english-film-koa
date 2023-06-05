import * as Router from 'koa-router'
import * as jwt from 'koa-jwt'
import { _JWT_KEY_ } from '../conf/secretKeys'
import { filmList, addFilm } from '../controllers/films'

const router = new Router({ prefix: '/film' })
const auth = jwt({ secret: _JWT_KEY_ })

router.get('/list', auth, filmList)
router.post('/', auth, addFilm)
export default router