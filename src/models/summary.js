import Model from 'utils/model';

export default Model.extend({
  namespace: 'summary',
  state: [],
  subscriptions: {
    setup({ listen, dispatch }) {
      listen('/summary', () => {
        console.log('summary model');
      });
    }
  },
  effects: {
    
  },
  reducers: {},
});