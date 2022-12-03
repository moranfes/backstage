import axios from 'axios'

const myAxios = axios.create({
  // 请求的根路径
  baseURL: 'http://localhost:3000'
})

export default myAxios