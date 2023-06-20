import React, { useState } from 'react';
import { Button, Form, Input, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import client from '../utils/apiUtils'
import { useAppDispatch } from '../utils/hooks';
import { fetchCurrentUser } from '../slices/currentUserSlice';


const { Title } = Typography;

const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Error', errorInfo);
};

const App: React.FC = () => {

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!username || !password) return;
    
    if (!await client.token(username, password)) {
      setError("Invalid credentials");
      return;
    }

    await dispatch(fetchCurrentUser());

    navigate("/");
  };

  return <>
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
          <Input size="large" style={{width: '45vw'}} value={username} onChange={e => setUsername(e.target.value)}/>
        </Form.Item>

        <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Enter password' }]}
        >
          <Input.Password size="large" style={{width: '45vw'}} value={password} onChange={e => setPassword(e.target.value)}/>
        </Form.Item>

        <Form.Item  wrapperCol={{ offset: 8, span: 24 }}>
          <Button type="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Form.Item>
        <Form.ErrorList errors={[error]}/>
      </Form>
    </div>
  </>
};

export default App;        
