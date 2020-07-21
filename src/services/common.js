import http from 'utils/request';

const { post, get } = http.create('az');

export function login(param) {
  return post('/user/login/mobile', param);
}

// 获取分区
export function getAdsProfile() {
  return get('/ads/profile');
}
