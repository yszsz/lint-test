import React from 'react';
import { connect } from 'dva';
import { Switch, Route, Link } from 'dva/router';
import { Layout, Menu, Select } from 'antd';
import {
  StepBackwardOutlined,
  PieChartOutlined,
  RiseOutlined,
  CalculatorOutlined
} from '@ant-design/icons';
import pages from 'pages';
import styles from  './Layout.less';

const { Header, Sider } = Layout;
const { Option } = Select;

class HLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      pathname: 'summary'
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect({ key }) {
    this.setState({ pathname: key })
  }

  render() {
    const { pathname } = this.state;
    return (
      <Layout className="layout">
        <Sider width='160'>
          <div className="logo">LOGO</div>
          <Menu 
            className={styles.menu} 
            mode="inline"
            selectedKeys={[pathname]}
            defaultSelectedKeys={[pathname]}
            onSelect={this.handleSelect}
          >
            <Menu.Item key="summary">
              <Link to="/summary">
                <div>
                  <div><PieChartOutlined style={{ fontSize: '22px' }} /></div>
                  <div className="menu-title">广告活动汇总</div>
                </div>
              </Link>
            </Menu.Item>
            <Menu.Item key="analyze">
              <Link to="/analyze">
                <div>
                  <div><RiseOutlined style={{ fontSize: '22px' }} /></div>
                  <div className="menu-title">广告效率分析</div>
                </div>
              </Link>
            </Menu.Item>
            <Menu.Item key="budget">
              <Link to="/budget">
                <div>
                  <div><CalculatorOutlined style={{ fontSize: '22px' }} /></div>
                  <div className="menu-title">预算管理</div>
                </div>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="content">
          <Header className="header">
            <ul className="nav">
              <li>卖家标志：<span>A327JDZH3RJEN7</span></li>
              <li>
                <Select defaultValue="lucy" style={{ width: 120 }}>
                  <Option value="jack"><StepBackwardOutlined />ABCD-</Option>
                  <Option value="lucy"><StepBackwardOutlined />ABCD-US</Option>
                  <Option value="disabled" disabled>
                    Disabled
                  </Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              </li>
            </ul>
          </Header>
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

function mapStateToProps() {
    return {  }
  }
  
  function mapDispatchToProps(dispatch) {
    return {}
  }

export default connect(mapStateToProps, mapDispatchToProps)(HLayout);