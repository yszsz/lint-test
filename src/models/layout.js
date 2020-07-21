import Model from 'utils/model';
import services from 'services';
import cookie from 'js-cookie';

export default Model.extend({
  namespace: 'layout',
  state: {
    zone: { // 分区
      profileId: '',
      storeName: '',
      imageUrl: ''
    },
    adsProfile: []
  },
  subscriptions: {
    setupSubscriber({ listen }) {
      listen('/', () => {});
    },
  },
  effects: {
    *login({ payload }, { call, put }) {
      const { data: { token } } = yield call(services.common.login, payload)
      cookie.set('token', token);
      yield put({ type: 'fetchAdsProfile' });
    },
    *fetchAdsProfile({ payload }, { call, update }) {
      const { data } = yield call(services.common.getAdsProfile);
      let zone = {};
      if (data) {
        zone = data[0];
      }
      yield update({ adsProfile: data, zone });
    }
  },
  reducers: {},
});
