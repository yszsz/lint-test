import Model from 'utils/model';

export default Model.extend({
  namespace: 'summary',
  state: [],
  subscriptions: {
    setup({ listen }) {
      listen('/summary', () => {});
    },
  },
  effects: {},
  reducers: {},
});
