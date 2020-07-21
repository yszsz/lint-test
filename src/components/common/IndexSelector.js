import { InfoCircleOutlined, CheckCircleOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import styles from './index.less';

class IndexSelector extends React.Component {
  constructor(props) {
    super(props);
    const { indexSelectors } = props;
    this.state = {
      curPage: 1,
      pagenum: 1,
      total: (indexSelectors.length) / 7
    }
  }
  handleClickIndex() {

  }

  render() {
    return (
      <div className={styles.selector}>
        <div className={styles.leftHand}><LeftOutlined style={{ fontSize: 20 }} /></div>
        <ul>
          <li onClick={() => this.handleClickIndex()}>
            <div>
              <span>曝光量</span>
              <InfoCircleOutlined style={{ marginLeft: 10, fontSize: 18 }} />
              <CheckCircleOutlined style={{ float: 'right', fontSize: 18 }} />
            </div>
            <div>4,219,639</div>
          </li>
          <li>
            <div>
              <span>曝光量</span>
              <InfoCircleOutlined style={{ marginLeft: 10, fontSize: 18 }} />
              <CheckCircleOutlined style={{ float: 'right', fontSize: 18 }} />
            </div>
            <div>4,219,639</div>
          </li>
          <li>
            <div>
              <span>曝光量</span>
              <InfoCircleOutlined style={{ marginLeft: 10, fontSize: 18 }} />
              <CheckCircleOutlined style={{ float: 'right', fontSize: 18 }} />
            </div>
            <div>4,219,639</div>
          </li>
          <li>
            <div>
              <span>曝光量</span>
              <InfoCircleOutlined style={{ marginLeft: 10, fontSize: 18 }} />
              <CheckCircleOutlined style={{ float: 'right', fontSize: 18 }} />
            </div>
            <div>4,219,639</div>
          </li>
          <li>
            <div>
              <span>曝光量</span>
              <InfoCircleOutlined style={{ marginLeft: 10, fontSize: 18 }} />
              <CheckCircleOutlined style={{ float: 'right', fontSize: 18 }} />
            </div>
            <div>4,219,639</div>
          </li>
          <li>
            <div>
              <span>曝光量</span>
              <InfoCircleOutlined style={{ marginLeft: 10, fontSize: 18 }} />
              <CheckCircleOutlined style={{ float: 'right', fontSize: 18 }} />
            </div>
            <div>4,219,639</div>
          </li>
          <li>
            <div>
              <span>曝光量</span>
              <InfoCircleOutlined style={{ marginLeft: 10, fontSize: 18 }} />
              <CheckCircleOutlined style={{ float: 'right', fontSize: 18 }} />
            </div>
            <div>4,219,639</div>
          </li>
        </ul>
        <div className={styles.rightHand}><RightOutlined style={{ fontSize: 20 }} /></div>
      </div>
    )
  }
}

export default IndexSelector;