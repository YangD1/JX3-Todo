const Koa = require('koa')
const consola = require('consola')
const Router = require('koa-router');
const bodyParser = require('koa-bodyParser')  /* parser post */

const {
  Nuxt,
  Builder
} = require('nuxt')

const app = new Koa()
app.use(bodyParser())

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(app.env === 'production')

async function start() {
  // loader router
  let router = new Router()
  app.use(require('./api/index').routes())
  app.use(router.routes(), router.allowedMethods());

  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
      port = process.env.PORT || 3000
  } = nuxt.options.server

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  app.use(ctx => {
    ctx.status = 200
    ctx.respond = false
    ctx.req.ctx = ctx
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
