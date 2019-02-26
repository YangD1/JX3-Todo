export default async ({ route, res, app }) => {
  // try {
  //   const { data } = await app.$axios.post('http://127.0.0.1:3344/verify')
  //   if(data){
  //     console.log(data)
  //   }else{
  //     console.log('没有数据返回')
  //   }
  // } catch (error) {
  //   console.log('接口无效')
  // }
  // return axios.post('http://127.0.0.1:3344/register', {
  //   url: route.fullPath
  // }).then((response) => {
  //   const token = response.data
  //   if (process.server) {
  //     res.setHeader('Set-Cookie', [`access_token=${token}; HttpOnly`]); // Server-side
  //   } else {
  //     document.cookie = `access_token=${token}` // Client-side
  //   }
  // })
}
