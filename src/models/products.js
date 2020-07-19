import Model from '../utils/model';

export default Model.extend({
  namespace: 'products',
  state: [],
  subscriptions: {
    setupSubscriber({ listen }) {
      listen('/products', () => {});
    },
  },
  effects: {},
  reducers: {
    delete(state, { payload: id }) {
      return state.filter(item => item.id !== id);
    },
  },
});
