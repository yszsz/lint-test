import { Layout, Dropdown, Button, Menu } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import styles from './Layout.less';

const { Header } = Layout;

function LHeader ({ adsProfile, onChangeItem, zone }) {
  const menu = (
    <Menu onClick={param => onChangeItem(param)}>
      {adsProfile.map(({ profileId, storeName, imageUrl }) => <Menu.Item key={profileId}><img className={styles.img} src={imageUrl} alt="" />{storeName}</Menu.Item>)}
    </Menu>
  );
  return (
    <Header className={styles.header}>
      <ul className={styles.nav}>
        <li>
          卖家标志 <span>A327JDZH3RJEN7</span>
        </li>
        <li>
          <Dropdown overlay={menu}>
            <Button className={styles.zoneName}><img className={styles.img} src={zone.imageUrl} alt="" />{zone.storeName} <CaretDownOutlined style={{ color: '#2978FF' }} /></Button>
          </Dropdown>
        </li>
        <li>
          <span className={styles.username}>13628045433</span><Button type="primary" danger size="small">退出</Button>
        </li>
      </ul>
    </Header>
  );
}

export default LHeader;