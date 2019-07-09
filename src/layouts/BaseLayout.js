import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import MyLayout from 'components/Layout';
import { Layout } from 'antd';
// import store from 'store'
import Error from 'pages/404/404';
import styles from './BaseLayout.less';
import config from 'utils/config';
import { pathMatchRegexp } from 'utils';
import { withRouter } from 'dva/router';

const { Content } = Layout;
const { Header, Sider } = MyLayout;

@connect(({ app, loading }) => ({ app, loading }))
class PrimaryLayout extends PureComponent {
  state = {
    newRouteList: [
      {
        icon: "home",
        id: "01",
        route: "/home",
        zhName: "首页",
        name: "首页"
      },
    ]
  };

  redirectRoute = () => {
    const { location, history, app } = this.props;
    const { isLogin } = app;
    if (isLogin) {
      if (location.pathname === "/") {
        history.push("/home");
        return;
      }
      history.push(location.pathname);
    } else {
      history.push("/login");
    }
  };

  UNSAFE_componentWillMount() {
    this.redirectRoute();
    // let userInfo = store.get('userInfo')
    // if (userInfo) {
    //   const permission = userInfo.permission
    //   let newRouteList = []
    //   permission.forEach((i, index) => {
    //     newRouteList.push({
    //       breadcrumbParentId: i.parentNo? '2': '1',
    //       icon: i.icon,
    //       id: i.menuNo.toString(),
    //       name: i.menuname,
    //       zhName: i.menuname
    //     })
    //     if(i.parentNo) newRouteList[index].menuParentId = i.parentNo.toString()
    //     if(i.route) newRouteList[index].route = i.route.toString()
    //   });
    //   newRouteList.push(
    //     {
    //       menuParentId: '-1',
    //       route: '/rule/addInsurance',
    //       id: '22',
    //       name: '新增险种类别',
    //       zhName: '新增险种类别'
    //     },
    //     {
    //       menuParentId: '-1',
    //       route: '/rule/addDoubtful',
    //       id: '23',
    //       name: '新增疑点类别',
    //       zhName: '新增疑点类别'
    //     },
    //     {
    //       menuParentId: '-1',
    //       route: '/event/detail',
    //       id: '31',
    //       name: '疑点事件详情',
    //       zhName: '疑点事件详情'
    //     },
    //   )
    //   this.setState({
    //     newRouteList
    //   })
    // }
  }

  onCollapseChange = collapsed => {
    this.props.dispatch({
      type: "app/handleCollapseChange",
      payload: collapsed
    });
  };

  render() {
    const { app, children, dispatch, loading } = this.props;
    const { collapsed, notifications, updatePwdModalVisible } = app;
    const { location } = children.props;

    const { onCollapseChange } = this;

    // MenuParentId is equal to -1 is not a available menu.
    const newRouteList = this.state.newRouteList;

    // Find a route that matches the pathname.
    const currentRoute = newRouteList.find(
      _ => _.route && pathMatchRegexp(_.route, location.pathname)
    );

    const permissions = {
      visit: []
    };

    permissions.visit = newRouteList.map(item => item.id);

    // Query whether you have permission to enter this page
    const hasPermission = currentRoute
      ? permissions.visit.includes(currentRoute.id)
      : false;

    // MenuParentId is equal to -1 is not a available menu.
    const menus = newRouteList.filter(_ => _.menuParentId !== "-1");

    const headerProps = {
      menus,
      collapsed,
      notifications,
      onCollapseChange,
      updatePwdModalVisible,
      fixed: config.fixedHeader,
      loading,
      onAllNotificationsRead() {
        dispatch({ type: "app/allNotificationsRead" });
      },
      onSignOut: () => {
        dispatch({ type: "app/signOut" });
      },
      showModal() {
        dispatch({
          type: "app/showModal"
        });
      },
      hideModal() {
        dispatch({
          type: "app/hideModal"
        });
      },
      updateUserPwd(payload) {
        dispatch({
          type: "app/updateUserPwd",
          payload
        });
      }
    };

    const siderProps = {
      menus,
      collapsed,
      onCollapseChange,
      location
    };

    return (
      <Fragment>
        <Layout>
          <Sider {...siderProps} />
          <div
            className={styles.container}
            style={{ paddingTop: config.fixedHeader ? 62 : 0 }}
            id="primaryLayout"
          >
            <Header {...headerProps} />
            <Content className={styles.content}>
              {hasPermission ? children : <Error />}
            </Content>
          </div>
        </Layout>
      </Fragment>
    );
  }
}

PrimaryLayout.propTypes = {
  routes: PropTypes.array,
  location: PropTypes.object,
  loading: PropTypes.object
};

export default withRouter(PrimaryLayout)