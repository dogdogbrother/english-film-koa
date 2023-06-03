import routing from './routes'
import * as Koa from 'koa'
import { koaBody } from 'koa-body'
import * as parameter from 'koa-parameter'
const app = new Koa()   

app.use(koaBody({multipart: true}))
app.use(parameter(app))
routing(app)

app.listen(7001, () => console.log('7001端口已经开启'))