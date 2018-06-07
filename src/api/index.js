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
// 获取商品信息
export const getGoods = () => {
  const url = '/api/goods'
  return request.get(url).then(res => {
    return Promise.resolve(res.data)
  })
}
// 获取评论信息
export const getRatings = () => {
  const url = '/api/ratings'
  return request.get(url).then(res => {
    return Promise.resolve(res.data)
  })
}
