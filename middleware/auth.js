import axios from 'axios'

export default function ({ route }) {
  return axios.post('http://127.0.0.1:3344/register', {
    url: route.fullPath
  }).then((response) => {
    // console.log(response)
  })
}
