const Router = require('koa-router')
const request = require('request')
const bodyParser = require('koa-bodyparser')
var rp = require('request-promise');

var router = new Router()
router.use(bodyParser())

router.get('/api/list', (ctx) => {
  ctx.body = "koa success make page"
});

router.post('/api/login',  async (ctx) => {
  const token = 'this is token'
  const { email, password } = ctx.request.body
  console.log(email)
  console.log(password)
  const userInfo = {
    email: email,
    password: password
  }

  var options = {
    uri: 'http://127.0.0.1:3344/login',
    method: 'POST',
    form: {
      email, password
    },
  }
  // var res
  let res = await rp(options)
  res = JSON.parse(res)
  ctx.cookies.set('token',res.token, {
    maxAge: 3600 * 1000,
    httpOnly: true
  })
  ctx.body = {
    message: res.message
  }

})

module.exports = router;
