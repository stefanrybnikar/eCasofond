import React from 'react';
import { Outlet } from "react-router-dom";
import Sidebar from '../components/Sidebar';
import { Layout } from 'antd';

const {Content} = Layout;

const AuditorPage: React.FC = () =>  <Layout style={{height: '80vh'}}>
    <Sidebar/>
    <Content>
        <Outlet />
    </Content>
</Layout>;

export default AuditorPage;