import React from 'react';
import { Layout, Avatar, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import CreateUserButton from './CreateUserButton';
import Activities from "./Activities";

const { Header } = Layout;

const Navbar: React.FC = () => {
    return (
        <Layout>
            <Header
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    borderBottom: '1px solid #D9D9D9',
                }}
            >
                <h1 style={{ marginRight: 'auto', fontSize: 30 }}>E-casofond</h1>
                <Space style={{ marginLeft: 'auto' }}>

                    <Avatar icon={<UserOutlined />} />

                    <span>User Name</span>
                </Space>
            </Header>
        </Layout>
    );
};

export default Navbar;
