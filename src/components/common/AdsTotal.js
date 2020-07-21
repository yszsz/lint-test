import { Row, Col } from 'antd';
import styles from './index.less';

function AdsTotal({ ads }) {
  return (
    <div className={styles['wrap-tab']}>
      <div className="wrap-tab-title">店铺所有广告活动关键指标</div>
      <div className={styles.scene}>
        <div className={styles['scene-shop']}>
          <Row className={styles['scene-data']}>
            <Col span="6">
              <ul>
                <li>CPC</li>
                <li>{ads.cpc}</li>
              </ul>
            </Col>
            <Col span="6">
              <ul>
                <li>ACoS</li>
                <li>{ads.acos}</li>
              </ul>
            </Col>
            <Col span="6">
              <ul>
                <li>花费($)</li>
                <li>{ads.cost}</li>
              </ul>
            </Col>  
            <Col span="6">
              <ul>
                <li>点击率</li>
                <li>{ads.clicks}</li>
              </ul>
            </Col>
          </Row>
          <Row className={styles['scene-data']}>
            <Col span="6">
              <ul>
                <li>单品点击费($)</li>
                <li>{ads.order}</li>
              </ul>
            </Col>
            <Col span="6">
              <ul>
                <li>每单点击量(次)</li>
                <li>2.89</li>
              </ul>
            </Col>
            <Col span="6">
              <ul>
                <li>每单点击费($)</li>
                <li>2.89</li>
              </ul>
            </Col>  
            <Col span="6">
              <ul>
                <li>订单转化率(CVR)</li>
                <li>{ads.sales}</li>
              </ul>
            </Col>
          </Row>
        </div>
        <div className={styles.funnel}>
          <ul>
            <li><span className={styles.item}>曝光量</span><span className={styles.val}>108</span></li>
            <li><span className={styles.item}>点击次数</span><span className={styles.val}>11</span></li>
            <li><span className={styles.item}>订单数</span><span className={styles.val}>23</span></li>
            <li><span className={styles.item}>销售额($)</span><span className={styles.val}>231212121</span></li>
          </ul>
        </div>
      </div>
    </div>  
  );
}

export default AdsTotal;