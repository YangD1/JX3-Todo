export default function (req, res, app, next, redirect) {
  // req 是 Node.js http request 对象
  app.axios.post('http://127.0.0.1:3344/register', {
    url: route.fullPath
  }).then((response) => {
    return redirect('/login')
  })

  // res 是 Node.js http response 对象

  //next是一个调用下一个中间件的函数
  // 如果您的中间件不是最终执行，请不要忘记在最后调用next！
  next()
}
