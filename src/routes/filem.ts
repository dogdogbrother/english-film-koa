import * as Router from 'koa-router'
import * as jwt from 'koa-jwt'
import { _JWT_KEY_ } from '../conf/secretKeys'
import { filmList, addFilm, addFragment, getFragmentList, getFragment, getCaption, addCaption, getFragmentInfo } from '../controllers/films'

const router = new Router({ prefix: '/film' })
const auth = jwt({ secret: _JWT_KEY_ })

router.get('/list', filmList)
router.post('/', auth, addFilm)
router.post('/:filmId/fragment', auth, addFragment)
router.get('/:filmId/fragment', getFragmentList)
router.get('/fragment/:fragmentId', getFragment)
router.get('/:fragmentId/caption', getCaption)
router.post('/:fragmentId/caption', auth, addCaption)
router.post('/fragment/:fragmentId', auth, getFragmentInfo)

export default router