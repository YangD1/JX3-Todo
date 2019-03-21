const axios = require('axios')
const config = require('../../nuxt.config.js')

module.exports = {
  login: async (ctx) => {
    const { email, password } = ctx.request.body
    let backInfo
    let res
    try {
      res = await axios.post('http://127.0.0.1:3344/login', { email, password })
      if(res.data.token){
        ctx.cookies.set('token',res.data.token, {
          maxAge: 3600 * 1000,
          httpOnly: true
        })
        backInfo = {
          message: res.data.message,
          type: 'success',
          user: res.data.user
        }
      }else{
        backInfo = {
          type: 'error',
          message: res.data.message
        }
      }
      return ctx.body = backInfo
    } catch (error) {
      ctx.status = 403
      backInfo = {
        type: 'error',
        ...error.response.data
      }
      return ctx.body = backInfo
    }
  },
  signOut: async (ctx) => {

  },
  register: async (ctx) => {
    const { email, password } = ctx.request.body
    let backInfo
    let res
    try {
      res = await axios.post('http://127.0.0.1:3344/register', { email, password })
      if(res.data.token){
        ctx.cookies.set('token',res.data.token, {
          maxAge: 3600 * 1000,
          httpOnly: true
        })
        backInfo = {
          message: res.data.message,
          type: 'success',
          user: res.data.user
        }
      }else{
        backInfo = {
          type: 'error',
          message: res.data.message,
        }
      }
      return ctx.body = backInfo
      } catch (error) {
      ctx.status = 403
      backInfo = {
        type: 'error',
        ...error.response.data
      }
      return ctx.body = backInfo
    }
  }
}
