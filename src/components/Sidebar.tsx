import React, {useEffect, useState} from 'react';
import {PlusCircleOutlined, EditOutlined} from '@ant-design/icons';
import {Layout, Menu, theme, Input, Modal} from 'antd';
import AddCompanyButton from './AddCompanyButton';
import {useAppDispatch, useAppSelector} from '../utils/hooks';
import {fetchCompanies} from '../slices/companiesSlice';
import {fetchUsers} from '../slices/usersSlice';

const {Content, Sider} = Layout;
const {Search} = Input;

interface CompanyType {
    id: number;
    name: string;
}

const Sidebar: React.FC = () => {
    const {
        token: {colorBgContainer},
    } = theme.useToken();

    const [searchValue, setSearchValue] = useState('');
    const [companies, setCompanies] = useState<CompanyType[]>([]);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState<CompanyType | null>(null);
    const companyStatus = useAppSelector((state) => state.companies.status);
    const companiesData = useAppSelector((state) => state.companies.companies);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (companyStatus === 'idle') {
            dispatch(fetchCompanies());
        }
    }, [dispatch, companyStatus]);

    useEffect(() => {
        // Mapování dat firem na CompanyType
        const mappedCompanies = companiesData.map((company: any) => ({
            id: company.id,
            name: company.name,
        }));
        setCompanies(mappedCompanies);
    }, [companiesData]);

    const handleSearch = (value: string) => {
        setSearchValue(value);
    };

    const handleCreateCompany = (name: string) => {
        // Logika pro vytvoření nové společnosti
    };

    const handleEditCompany = (newName: string) => {
        // Logika pro úpravu názvu společnosti
    };

    const filteredOptions = companies.filter((company) =>
        company.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    return (
        <Sider style={{background: colorBgContainer}} width={300}>
            <Menu mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} style={{height: '100%'}}>
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
                    {filteredOptions.map((company) => (
                        <Menu.Item key={company.id}>
              <span
                  onClick={() => {
                      setSelectedCompany(company);
                      setEditModalVisible(true);
                  }}
              >
                <EditOutlined/> {company.name}
              </span>
                        </Menu.Item>
                    ))}
                </Menu.SubMenu>
            </Menu>
            <Modal
                title="Edit Company Name"
                visible={editModalVisible}
                onCancel={() => setEditModalVisible(false)}
                onOk={() => handleEditCompany(selectedCompany ? selectedCompany.name : '')}
            >
                <Input
                    value={selectedCompany ? selectedCompany.name : ''}
                    onChange={(e) =>
                        setSelectedCompany(selectedCompany ? {...selectedCompany, name: e.target.value} : null)
                    }
                />
            </Modal>
        </Sider>
    );
};

export default Sidebar;
