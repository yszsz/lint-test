import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import pages from './pages';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/login" exact component={pages.Login} />
        <Route path="/products" exact component={pages.Products} />
        <Route path="" component={pages.Layout} />
        {/* <Route path="" component={pages.Example} /> */}
      </Switch>
    </Router>
  );
}

export default RouterConfig;
