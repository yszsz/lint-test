import { Row, Col } from 'antd';
import styles from './index.less';

class Wrapper extends React.Component {
  render() {
    const { title, children } = this.props;
    return (
      <div className="main">
        <Row>
          <Col span={24} className={styles.title}>
            {title}
          </Col>
        </Row>
        {children}
      </div>
    );
  }
}

export default Wrapper;