import React from 'react';
import { routerRedux, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import Layout from '@/layouts/BaseLayout';
import Loader from 'components/Loader';

const { ConnectedRouter } = routerRedux;

let config = [
  {
    path: "/",
    LoadingComponent: Loader,
    layout: Layout,
    models: () => [import("pages/home/model")], //models可多个
    component: () => import("pages/home")
  },
  {
    path: "/login",
    LoadingComponent: Loader,
    models: () => [import("pages/login/model")], //models可多个
    component: () => import("pages/login/index")
  },
  {
    path: "/home",
    LoadingComponent: Loader,
    layout: Layout,
    models: () => [import("pages/home/model")], //models可多个
    component: () => import("pages/home")
  },
];

function RouterConfig({ history, app }) {
  return (
    <LocaleProvider locale={zhCN}>
      <ConnectedRouter history={history}>
        <Switch>
          {config.map(({ path, layout, ...dynamics }, index) => {
            const Component = dynamic({ app, ...dynamics });
            return (
              <Route
                key={path + index}
                path={path}
                exact
                render={props => {
                  if (layout) {
                    return (
                      <Layout>
                        <Component {...props} />
                      </Layout>
                    );
                  }
                  return <Component {...props} />;
                }}
              />
            );
          })}
        </Switch>
      </ConnectedRouter>
    </LocaleProvider>
  );
}

export default RouterConfig;