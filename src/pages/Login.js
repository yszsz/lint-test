import { connect } from 'dva';
import { Form, Input, Button, Checkbox } from 'antd';

class Login extends React.Component {
  onFinish() {
    const { onLogin } = this.props;
    onLogin({ mobile: '19912345678', smsKey: 'cce089a7ec', smsCode: '8888' })
  }

  render() {
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };
    const tailLayout = {
      wrapperCol: { offset: 8, span: 16 },
    };
    return (
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={val => this.onFinish(val)}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input value="19912345678" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

function mapStateToProps({ layout }) {
  return {
    layout
  };
}
function mapStateToDispatch(dispatch) {
  return {
    onLogin(param) {
      dispatch({ type: 'layout/login', payload: param })
    }
  }
}

export default connect(mapStateToProps, mapStateToDispatch)(Login);
