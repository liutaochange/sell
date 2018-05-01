import axios from 'axios'
const request = axios.create({
  withCredentials: true
})
// 获取商家信息
export const getSeller = () => {
  const url = '/api/seller'
  return request.get(url).then(res => {
    return Promise.resolve(res.data)
  })
}
