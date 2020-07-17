// 将数组转换为对象
export function toObject(arr, keyId = 'value', valueId = 'label') {
  return arr.reduce((obj, item) => {
    obj[item[keyId]] = item[valueId];
    return obj;
  }, {});
}

// 合并数组
export function merge(source, dest) {
  return [...source, ...dest].reduce((occ, key) => occ.includes(key) ? occ : occ.concat([key]), []);
}