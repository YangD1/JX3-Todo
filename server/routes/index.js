const KoaRouter = require('koa-router')
var router = new KoaRouter()
const koaCompose = require('koa-compose')
const session = require('../controller/session')

module.exports = () => {
  router.post('/api/login', session.login)
  router.post('/api/logout', session.logout)
  router.post('/api/register', session.register)

  return koaCompose([router.routes(), router.allowedMethods()])
}
