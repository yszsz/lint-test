import http from 'utils/request';

const { get } = http.create('az');

// 广告活动指标
export function getAdsTotal(param) {
  return get('/ads/total', param);
}

export function getAdsGroupFlatten(param) {
  return get('')
}
