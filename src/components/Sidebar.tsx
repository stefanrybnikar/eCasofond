import React, {useState} from 'react';
import {PlusCircleOutlined, EditOutlined} from '@ant-design/icons';
import {Layout, Menu, theme, Input, Modal} from 'antd';
import AddCompanyButton from './AddCompanyButton';
import EmployeesTable from "./EmployeesTable";

const {Content, Sider} = Layout;
const {Search} = Input;

const Sidebar: React.FC = () => {
    const {
        token: {colorBgContainer},
    } = theme.useToken();

    const [searchValue, setSearchValue] = useState('');
    const [companyName, setCompanyName] = useState<string>('');
    const [companies, setCompanies] = useState<string[]>([]);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(-1);

    const handleSearch = (value: string) => {
        setSearchValue(value);
    };

    const handleCreateCompany = (name: string) => {
        setCompanies([...companies, name]);
        setSearchValue('');
    };

    const handleEditCompany = (newName: string) => {
        const updatedCompanies = companies.map((company, index) =>
            index === selectedIndex ? newName : company
        );
        setCompanies(updatedCompanies);
        setEditModalVisible(false);
    };

    const filteredOptions = companies.filter((company) =>
        company.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <Layout>
            <Content style={{padding: '0 0px'}}>
                <Layout style={{padding: '24px 0', background: colorBgContainer}}>
                    <Sider style={{background: colorBgContainer}} width={300}>
                        <Menu mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']}
                              style={{height: '100%'}}>
                            <Menu.SubMenu
                                key="sub1"
                                title={
                                    <span>
                    <AddCompanyButton onCreateCompany={handleCreateCompany}/>
                    Companies
                  </span>
                                }
                            >
                                <div style={{display: 'flex', width: '100%', padding: '10px'}}>
                                    <Search
                                        placeholder="Search Companies"
                                        onSearch={handleSearch}
                                        onChange={(e) => handleSearch(e.target.value)}
                                        value={searchValue}
                                        style={{width: '100%'}}
                                    />
                                </div>
                                {filteredOptions.map((company, index) => (
                                    <Menu.Item key={company}>
                    <span onClick={() => {
                        setSelectedIndex(index);
                        setSelectedCompany(company);
                        setEditModalVisible(true);
                    }}>
                      <EditOutlined/>
                      <span style={{marginRight: 'auto'}}>{company}</span>
                    </span>
                                    </Menu.Item>
                                ))}
                            </Menu.SubMenu>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Content style={{backgroundColor: 'white', padding: '0px 20px'}}>
                            <div style={{display: 'flex', flexDirection: 'row'}}>
                                <span style={{fontSize: 24, fontWeight: 500, paddingBottom: '10px'}}>Company</span>
                            </div>
                            <EmployeesTable></EmployeesTable>
                        </Content>
                    </Layout>
                </Layout>
            </Content>
            <Modal
                title="Edit Company Name"
                visible={editModalVisible}
                onCancel={() => setEditModalVisible(false)}
                onOk={() => handleEditCompany(selectedCompany)}
            >
                <Input
                    value={selectedCompany}
                    onChange={(e) => setSelectedCompany(e.target.value)}
                />
            </Modal>
        </Layout>
    );
};

export default Sidebar;
