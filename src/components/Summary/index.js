import React from 'react';
import { Row, Col, DatePicker } from 'antd';
import AdsTotal from 'components/common/AdsTotal';
import IndexSelector from 'components/common/IndexSelector';
import styles from './index.less';

const { RangePicker } = DatePicker;

class Summary extends React.Component {
  render() {
    const { ads, indexSelectors } = this.props;
    return (
      <div className="main">
        <div className="title">
          <span>广告活动页面</span>
          <RangePicker style={{ marginLeft: 20 }} />
        </div>
        <Row>
          <Col span={8} className="gutter-row">
            <div className={styles['wrap-tab']}>
              <div className="wrap-tab-title">广告活动数目统计</div>
              <div className={styles.scene}>
                <div className={styles['scene-ad']}>
                  <div className={styles.icon}>xx</div>
                  <ul>
                    <li>已启用广告活动</li>
                    <li>234</li>
                  </ul>
                </div>
                <div className={styles['scene-ad']}>
                  <div className={styles.icon}>xx</div>
                  <ul>
                    <li>已启用广告活动</li>
                    <li>234</li>
                  </ul>
                </div>
                <div className={styles['scene-ad']}>
                  <div className={styles.icon}>xx</div>
                  <ul>
                    <li>已启用广告活动</li>
                    <li>234</li>
                  </ul>
                </div>
                <div className={styles['scene-ad']}>
                  <div className={styles.icon}>xx</div>
                  <ul>
                    <li>已启用广告活动</li>
                    <li>234</li>
                  </ul>
                </div>
              </div>
            </div>
          </Col>
          <Col span={16} className="gutter-row">
            <AdsTotal ads={ads} />
          </Col>
        </Row>
        <div className={styles.charts}>
          <div className={styles['wrap-tab']}>
            <div className="wrap-tab-title">广告活动数目统计</div>
            <div className={styles.wrap}>
              <IndexSelector indexSelectors={indexSelectors} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Summary;
