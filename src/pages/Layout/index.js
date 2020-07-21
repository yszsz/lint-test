import React from 'react';
import { connect } from 'dva';
import { Switch, Route, Link } from 'dva/router';
import { Layout, Menu } from 'antd';
import {
  PieChartOutlined,
  RiseOutlined,
  CalculatorOutlined,
} from '@ant-design/icons';
import pages from 'pages';
import Header from './Header';
import styles from './Layout.less';
import { keyBy } from 'lodash';

const { Sider } = Layout;

class HLayout extends React.Component {
  constructor(props) {
    super(props);
    const { location: { pathname } } = props;
    this.state = {
      collapsed: false,
      pathname: pathname || 'summary',
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect({ key }) {
    this.setState({ pathname: key });
  }
  handleChangeItem(key) {
    const { adsProfile, onUpdateState } = this.props;
    const { profileId, storeName, imageUrl } = adsProfile.find(item => {
      return item.profileId === Number(key);
    });
    onUpdateState({ zone: { profileId, storeName, imageUrl } });
  }

  render() {
    const { pathname } = this.state;
    const { adsProfile, zone } = this.props;
    const headerProps = {
      zone,
      adsProfile,
      onChangeItem: ({ key }) => this.handleChangeItem(key)
    }

    return (
      <Layout className="layout">
        <Sider width="160">
          <div className="logo">LOGO</div>
          <Menu
            className={styles.menu}
            mode="inline"
            selectedKeys={[pathname]}
            defaultSelectedKeys={[pathname]}
            onSelect={this.handleSelect}
          >
            <Menu.Item key="/summary">
              <Link to="/summary">
                <div>
                  <div>
                    <PieChartOutlined style={{ fontSize: '22px' }} />
                  </div>
                  <div className="menu-title">广告活动汇总</div>
                </div>
              </Link>
            </Menu.Item>
            <Menu.Item key="/analyze">
              <Link to="/analyze">
                <div>
                  <div>
                    <RiseOutlined style={{ fontSize: '22px' }} />
                  </div>
                  <div className="menu-title">广告效率分析</div>
                </div>
              </Link>
            </Menu.Item>
            <Menu.Item key="/budget">
              <Link to="/budget">
                <div>
                  <div>
                    <CalculatorOutlined style={{ fontSize: '22px' }} />
                  </div>
                  <div className="menu-title">预算管理</div>
                </div>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="content">
          <Header {...headerProps} />
          <Switch>
            <Route exact path="/" component={pages.Summary} />
            <Route path="/summary" component={pages.Summary} />
            <Route path="/analyze" component={pages.Analyze} />
            <Route path="/budget" component={pages.Budget} />
          </Switch>
        </Layout>
      </Layout>
    );
  }
}

function mapStateToProps({ layout }) {
  return { ...layout };
}

function mapDispatchToProps(dispatch) {
  return {
    onUpdateState(param) {
      dispatch({ type: 'layout/updateState', payload: param });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HLayout);
