import routing from './routes'
import * as Koa from 'koa'
import * as bodyparser from 'koa-bodyparser'
import * as parameter from 'koa-parameter'

const app = new Koa()
app.use(bodyparser())
app.use(parameter(app))
routing(app)

app.listen(7001, () => console.log('7001端口已经开启'))