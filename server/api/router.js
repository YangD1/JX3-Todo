const Router = require('koa-router')
const request = require('request')
const bodyParser = require('koa-bodyparser')
var rp = require('request-promise');

var router = new Router()
router.use(bodyParser())

router.get('/api/list', (ctx) => {
  ctx.body = "koa success make page"
});

router.post('/api/login',  (ctx) => {
  const token = 'this is token'
  const { email, password } = ctx.request.body
  console.log(email)
  console.log(password)
  const userInfo = {
    email: email,
    password: password
  }

  // res = request.post('http://127.0.0.1:3344/login', { form:{email, password} }, function(err,httpResponse,body){
  //   // ctx.cookie.set('token',body.token, {
  //   //   maxAge: 3600 * 1000,
  //   //   httpOnly: true
  //   // })
  //   return body
  // })
  // console.log(res)

  var options = {
    uri: 'http://127.0.0.1:3344/login',
    method: 'POST',
    form: {
      email, password
    },
  }
  var res
  var fctx = ctx
  // var res
  rp(options)
    .then(function (body) {
      // POST succeeded...
      // console.log(body)
      console.log(fctx)
      console.log(ctx)
      res = body
      fctx.body = '1212'
    })
    .catch(function (err) {
      // POST failed...
      console.log(err)
    });
  console.log(res)
  // ctx.cookie.set('token',body.token, {
  //   maxAge: 3600 * 1000,
  //   httpOnly: true
  // })
  // ctx.body = {
  //   token: body.message
  // }
  ctx.body = {
    token: 1312
  }

})

module.exports = router;
