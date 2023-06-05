import { Card } from 'antd';
import React from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

const CompanyPage: React.FC = () => {

    const tabList = [
        {
          key: 'employees',
          tab: 'Employees',
        },
        {
          key: 'audit',
          tab: 'Audit',
        },
        {
          key: 'activities',
          tab: 'Activities',
        },
    ];

    const navigate = useNavigate();

    const onTabChange = (e: string) => {
        navigate(e)
    }

    return <>
        <Card
            title="//Company Name//"
            tabList={tabList}
            onTabChange={onTabChange}
            >
            <Outlet />
        </Card>
    </>;
}

export default CompanyPage;