import React from 'react';
import { Button, Form, Input, Typography } from 'antd';


const { Title } = Typography;

const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Error', errorInfo);
};

const App: React.FC = () => (
    <>
      <div style={{
        marginTop: "20vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%"
      }}>
        <Title>Login</Title>
      </div>
      <div style={{
        marginLeft: "10vw",
        height: "100%",
        marginTop: "5vh"
      }}>

        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 24 }}
            style={{ maxWidth: 900 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
          <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Enter username' }]}
              style={{}}
          >
            <Input size="large" style={{width: '45vw'}} />
          </Form.Item>

          <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Enter password' }]}
          >
            <Input.Password size="large" style={{width: '45vw'}} />
          </Form.Item>



          <Form.Item  wrapperCol={{ offset: 8, span: 24 }}>
            <Button  type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
);

export default App;        
