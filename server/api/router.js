const router = require('koa-router')()

router.get('/api/list', (ctx) => {
  ctx.body = "koa success make page"
});

router.post('/api/login', (ctx) => {
  const token = 'this is token'
  ctx.cookies.set('token', token, {
    httpOnly: true,
    // expires: time
    maxAge: 3600 * 1000
  });
  ctx.body = {
    message: '登录成功！'
  }
})

module.exports = router;
