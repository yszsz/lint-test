// eslint-disable-next-line
export const createNestReducer = parentKey => (state, { payload }) => {
  return {
    ...state,
    [parentKey]: {
      ...state[parentKey],
      ...payload,
    },
  };
};
