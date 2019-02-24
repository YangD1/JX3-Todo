const router = require('koa-router')()

router.get('/list', (ctx) => {
  ctx.body = "koa success make page"
});

module.exports = router;
