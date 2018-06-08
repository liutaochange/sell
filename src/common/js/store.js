const saveKey = '__seller__'
export function saveToLocal (id, key, value) {
  let seller = window.localStorage.getItem(saveKey)
  if (!seller) {
    seller = {}
    seller[id] = {}
  } else {
    seller = JSON.parse(seller)
    if (!seller[id]) {
      seller[id] = {}
    }
  }
  seller[id][key] = value
  window.localStorage.setItem(saveKey, JSON.stringify(seller))
};

export function loadFromLocal (id, key, def) {
  let seller = window.localStorage.getItem(saveKey)
  if (!seller) {
    return def
  }
  seller = JSON.parse(seller)[id]
  if (!seller) {
    return def
  }
  let ret = seller[key]
  return ret || def
};
