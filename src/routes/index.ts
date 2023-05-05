const fs = require('fs')
import Application = require('koa')

export default (app: Application) => {
  fs.readdirSync(__dirname).forEach(async (file: string) => {
    if (file === 'index.ts') return
    const route = await import(`./${file}`)
    app.use(route.default.routes())
  })
}