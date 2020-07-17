import Model from '../utils/model';

export default Model.extend({
    namespace: 'products',
    state: [],
    subscriptions: {
      setupSubscriber({ listen, dispatch }) {
        listen('/products', ({ params }) => {
          console.log('11', dispatch)
        });
      }
    },
    effects: {
      
    },
    reducers: {
      delete(state, { payload: id }) {
        return state.filter(item => item.id !== id);
      },
    },
  });