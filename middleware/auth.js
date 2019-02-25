import axios from 'axios'

export default function ({ route, res }) {
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
