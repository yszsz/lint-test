const defaultLoading = {
  list: false,
  confirm: false,
  submit: false,
  spin: false,
};

export default (configState = {}, state = {}, localState = {}) => {
  const search = {
    ...(configState.search || {}),
    ...(state.search || {}),
    ...(localState.search || {}),
  };

  const loading = {
    ...defaultLoading,
    ...(configState.loading || {}),
    ...(state.loading || {}),
    ...(localState.loading || {}),
  };

  return {
    detail: {},
    list: [],
    total: 0,
    ...configState,
    ...state,
    ...localState,
    search,
    loading,
  };
};
