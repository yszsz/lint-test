import React from 'react';
import { ConfigProvider  } from 'antd';
import { Router, Route, Switch } from 'dva/router';
import 'moment/locale/zh-cn';
import zhCN from 'antd/es/locale/zh_CN';

import pages from './pages';

function RouterConfig({ history }) {
  return (
    <ConfigProvider locale={zhCN}>
      <Router history={history}>
        <Switch>
          <Route path="/login" exact component={pages.Login} />
          <Route path="" component={pages.Layout} />
        </Switch>
      </Router>
    </ConfigProvider>
  );
}

export default RouterConfig;
