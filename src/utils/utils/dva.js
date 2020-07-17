import { connect } from 'dva';
import _ from 'lodash';
import Type from './type';

// 缓存dva app对象
export function store(dvaApp) {
  return (window.$$dvaApp = dvaApp);
}

// 获取对应的effect函数
export function getEffect(effectName, curNamespace) {
  const targetNamespace = effectName.includes('/') ? effectName.split('/')[0] : curNamespace;
  const targetEffectName = effectName.includes('/') ? effectName : `${curNamespace}/${effectName}`;
  const targetModel = window.$$dvaApp._models.find(({ namespace }) => namespace == targetNamespace);
  return targetModel.effects[targetEffectName];
}

// 附加loading信息, 需与call配置
export function withLoading(service, key, successMsg, errorMsg, withDone) {
  const config = Type.isString(key) ? { key } : { ...key };
  service.withExtra = {
    type: 'loading',
    successMsg,
    errorMsg,
    withDone,
    ...config
  };
  return service;
}

// 附加消息信息, 需与call配置
export function withMessage(service, successMsg, errorMsg) {
  service.withExtra = {
    type: 'message',
    successMsg,
    errorMsg
  };
  return service;
}

// 附加confirmLoading信息, 需与call配置
export function withConfirmLoading(service, successMsg, errorMsg, withDone) {
  return withLoading(service, { successMsg, errorMsg, withDone, key: 'confirm' });
}

// 附加spinning信息, 需与call配置
export function withSpinning(service, successMsg, errorMsg, withDone) {
  return withLoading(service, { successMsg, errorMsg, withDone, key: 'spinning' });
}


// 获取model
export function getModel(targetNamespace) {
  if (!window.$$dvaApp) {
    throw new Error('store dvaApp first please');
  }
  return window.$$dvaApp._models.find(({ namespace }) => namespace == targetNamespace);
}

// 将model effects 和 reducers 封装 自动封装dispatch
function mapEffectsAndReducers({ effects, reducers }, dispatch) {
    return Object.keys({...effects, ...reducers}).reduce((prev, next) => {
      const key = next.split('/')[1];
      return {
        ...prev,
        [key]: param => dispatch({
          type: next,
          payload: param
        })
      };
    }, {});
}

/**
 * 使用model 注解实现将model 数据注入到入口组件  自动封装connect功能
 * model 定义的effects 和 reducers props可以直接使用
 * 支持多model 不过要注意 多个model 方法和 state 不要重名
 * @param {*} keys model keys
 */
export function model(...keys) {
  return function tar(target) {
    const mapStateToProps = state => keys.reduce((prev, next) => ({ ...prev, ...state[next] }), {});
    const mapDispatchToProps = (dispatch) => {
      let extraActions = {};
      const lastKey = _.last(keys);
      if (typeof lastKey === 'function') {
        extraActions = lastKey(dispatch);
      }

      const mapDispatch = { dispatch };
      const allKeysActions = keys.reduce((prev, next) => {
        const md = getModel(next);
        if (md) {
          const actions = mapEffectsAndReducers(md, dispatch);
          return { ...prev, ...actions };
        }
        return { ...prev };
      }, mapDispatch);

      const actions = { ...allKeysActions, ...extraActions };

      return { ...actions, actions };
    };
    return connect(mapStateToProps, mapDispatchToProps)(target);
  };
}
