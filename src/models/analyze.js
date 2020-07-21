import Model from 'utils/model';
import services from 'services';
import cookie from 'js-cookie';

export default Model.extend({
  namespace: 'analyze',
  state: [

  ],
  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen('/analyze', () => {
        dispatch({ type: 'login'})
      });
    },
  },
  effects: {
    *login({ payload }, { call }) {
      const { data: { token } } = yield call(services.common.login, { mobile: '19912345678', smsKey: 'cce089a7ec', smsCode: '8888' })
      cookie.set('token', token);
    },
  },
  reducers: {},
});
