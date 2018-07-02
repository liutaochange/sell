export const getGoodsList = state => state.goodsList

export const totalCount = (state) => {
  let goodsList = state.goodsList || []
  let totalCount = 0
  goodsList.forEach(element => {
    totalCount += element.count
  })
  return totalCount
}

export const totalPrice = (state) => {
  let goodsList = state.goodsList || []
  let totalPrice = 0
  goodsList.forEach(element => {
    totalPrice += (element.price * element.count)
  })
  return totalPrice
}
