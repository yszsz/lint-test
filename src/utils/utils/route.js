import qs from 'qs';
import { routerRedux, Route } from 'dva/router';
import * as pathToRegexp from 'path-to-regexp';
import { REMAIN_CORE_STATE } from '../model';

// 跳转页面并替换上一个url
export function historyReplaceState(url, searchParam, obj) {
  const paramUrl = qs.stringify(searchParam); // 把对象变成url字符串
  const noParamUrl = window.location.href.split('?')[0]; // 去掉当前url中的参数

  window.history.replaceState(obj, '', `${noParamUrl}?${paramUrl}`);

  if (typeof url == 'string') {
    window.location.hash = url;
  } else {
    url();
  }
}

// 创建支持路由嵌套的页面
export function createNestPage(Comp) {
  return props => {
    const { children, ...others } = props;
    return children || <Comp {...others} />;
  };
}

// 路由跳转
export function redirect(url, params = {}) {
  return routerRedux.push(pathToRegexp.compile(url)(params));
}

// 返回指定的路由, 调用此方法后，进入下一个路由会保留state(loading等状态例外), 如果没有穿入参数则返回前一个路由
export function goBack(url, params) {
  localStorage.setItem(REMAIN_CORE_STATE, true);
  return Boolean(url) ? redirect(url, params) : routerRedux.goBack();
}

// 获取当前path, 仅支持hash方式
export function getCurrentPath() {
  const hash = window.location.hash;
  let pathname = decodeURIComponent(hash);

  const hashIndex = pathname.indexOf('#');
  if (hashIndex !== -1) {
    pathname = pathname.substring(hashIndex + 1);
  }

  const searchIndex = pathname.indexOf('?');
  if (searchIndex !== -1) {
    pathname = pathname.substring(0, searchIndex);
  }

  return pathname;
}

// 使用routeConfig方式渲染路由
export function renderRoutes(routes) {
  return routes
    ? routes.map(
      (route, i) =>
        route.children ? (
          renderRoutes(route.children)
        ) : (
          <Route
            key={route.key || i}
            path={route.path}
            exact={route.exact}
            strict={route.strict}
            breadcrumbName={route.title}
            render={props => (route.render ? route.render({ ...props }) : <route.component {...props} />)}
          />
        )
    )
    : null;
}
