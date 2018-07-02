import * as types from './mutation-types'
const mutations = {
  [types.clearGoodsList] (state) {
    state.goodsList = []
  },
  [types.addCountMap] (state, item) {
    let list = state.goodsList.slice(0)
    if (list.indexOf(item) >= 0) {
      list[list.indexOf(item)].count += 1
    } else {
      list.push(item)
      list[list.length - 1].count = 1
    }
    state.goodsList = list.slice(0)
  },
  [types.reduceCountMap] (state, item) {
    let list = state.goodsList.slice(0)
    if (item.count > 0) {
      let currentIndex = list.indexOf(item)
      let getItem = list[currentIndex]
      getItem.count -= 1
      if (getItem.count === 0) {
        list.splice(currentIndex, 1)
      }
    }
    state.goodsList = list.slice(0)
  }
}
export default mutations
