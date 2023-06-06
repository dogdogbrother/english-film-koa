import * as Router from 'koa-router'
import * as jwt from 'koa-jwt'
import { _JWT_KEY_ } from '../conf/secretKeys'
import { filmList, addFilm, addFragment, getFragmentList } from '../controllers/films'

const router = new Router({ prefix: '/film' })
const auth = jwt({ secret: _JWT_KEY_ })

router.get('/list', auth, filmList)
router.post('/', auth, addFilm)
router.post('/:filmId/fragment', auth, addFragment)
router.get('/:filmId/fragment', auth, getFragmentList)
export default router