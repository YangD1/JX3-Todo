const axios = require('axios')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')

var router = new Router()
router.use(bodyParser())

router.get('/api/list', (ctx) => {
  ctx.body = "koa success make page"
});

router.post('/api/login',  async (ctx) => {
  const { email, password } = ctx.request.body
  let backInfo
  try {
    const res = await axios.post('http://127.0.0.1:3344/login', { email, password })
  } catch (error) {
    ctx.status = 403
    backInfo = {
      type: 'error',
      ...error.response.data
    }
    ctx.body = backInfo
    return
  }

  if(res.data.token){
    ctx.cookies.set('token',res.data.token, {
      maxAge: 3600 * 1000,
      httpOnly: true
    })
    backInfo = {
      message: res.data.message,
      type: 'success'
    }
  }else{
    backInfo = {
      type: 'error',
      message: res.data.message
    }
  }

  ctx.body = backInfo
})

module.exports = router;
