import Model from 'utils/model';
import services from 'services';

export default Model.extend({
  namespace: 'summary',
  state: {
    ads: [],
    indexSelectors: [{
      name: '曝光量',
      num: 222,
      checked: true
    },{
      name: 'CPC',
      num: 222,
      checked: false
    },{
      name: 'ACoS',
      num: 222,
      checked: false
    },{
      name: '花费($)',
      num: 222,
      checked: false
    },{
      name: '点击率',
      num: 222,
      checked: true
    },{
      name: '单品点击费($)',
      num: 222,
      checked: false
    },{
      name: '每单点击量(次)',
      num: 222,
      checked: false
    },{
      name: '订单转化率(CVR)',
      num: 222,
      checked: false
    },{
      name: '点击次数',
      num: 222,
      checked: false
    }]
  },
  subscriptions: {
    setup({ listen, dispatch }) {
      listen('/summary', () => {
        dispatch({ type: 'layout/fetchAdsProfile' });
        dispatch({ type: 'getAdsTotal' });
      });
    },
  },
  effects: {
    *getAdsTotal({ payload }, { call, update }) {
      const { data } = yield call(services.summary.getAdsTotal, { durationType: '7d' });
      yield update({ ads: data });
    }
  },
  reducers: {},
});
