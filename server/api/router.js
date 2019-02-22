const Router = require('koa-router')

let router = new Router

router.get('/list', (ctx) => {
  ctx.body = '请求list';
});


// app.use(router.routes(), router.allowedMethods());
