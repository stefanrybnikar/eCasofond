import React, {useState, useEffect} from 'react';
import {Layout, Space, Dropdown, Menu, Button, Avatar, Popconfirm} from 'antd';
import {UserOutlined, LogoutOutlined, LoginOutlined} from '@ant-design/icons';
import {useTranslation} from 'react-i18next';
import i18n from '../i18n';
import { useAppDispatch, useAppSelector } from '../utils/hooks';
import { clearSession } from '../utils/session';
import { clearCurrentUser } from '../slices/currentUserSlice';

const {Header} = Layout;

const Navbar: React.FC = () => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();

    const [selectedLanguageCode, setSelectedLanguageCode] = useState('en');
    const [selectedLanguage, setSelectedLanguage] = useState(t('english'));

    const currentUser = useAppSelector(state => state.currentUser.user);

    const handleLogout = () => {
        clearSession();
        dispatch(clearCurrentUser());
    }

    const changeLanguage = (language: string) => {
        i18n.changeLanguage(language);
        setSelectedLanguageCode(language);
    };

    useEffect(() => {
        setSelectedLanguage(t(selectedLanguageCode));
    }, [selectedLanguageCode, t]);

    const languageMenu = (
        <Menu>
            <Menu.Item key="en" onClick={() => changeLanguage('en')}>
                {t('english')}
            </Menu.Item>
            <Menu.Item key="es" onClick={() => changeLanguage('es')}>
                {t('spanish')}
            </Menu.Item>
            <Menu.Item key="cz" onClick={() => changeLanguage('cz')}>
                {t('czech')}
            </Menu.Item>
            <Menu.Item key="sk" onClick={() => changeLanguage('sk')}>
                {t('slovakia')}
            </Menu.Item>
        </Menu>
    );

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
                <h1 style={{marginRight: 'auto', fontSize: 30}}>E-casofond</h1>
                <Space style={{marginLeft: 'auto'}}>
                    <Dropdown overlay={languageMenu} placement="bottomRight">
                        <Button>
                            {t('languages')} {selectedLanguage}
                        </Button>
                    </Dropdown>
                    {currentUser &&
                        <>
                            <span>{currentUser?.displayName}</span>
                            <Avatar icon={<UserOutlined/>}/>
                            <Popconfirm  title="Do you really want to log out?" onConfirm={handleLogout} placement='left' arrow={false}>
                                <LogoutOutlined/>
                            </Popconfirm>
                        </>
                    }
                </Space>
            </Header>
        </Layout>
    );
};

export default Navbar;
