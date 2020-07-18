// 返回一个object副本，只过滤出keys参数指定的属性值
export function pick(obj, keys) {
  return keys.reduce(
    (res, k) => (k in obj ? { ...res, [k]: obj[k] } : res),
    {}
  );
}

// extend，与assign的区别在于不会继承undefined属性
export function extend(dest = {}, source = {}) {
  const result = { ...dest };
  Object.keys(source).forEach(key => {
    if (source[key] !== undefined) {
      result[key] = source[key];
    }
  });
  return result;
}

// 将对象转换为数组
export function toArray(obj, keyId, valueId) {
  return Object.keys(obj).reduce((arr, key) => {
    return arr.concat({ [keyId]: key, [valueId]: obj[key] });
  }, []);
}
