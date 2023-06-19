import React, {useState} from 'react';
import {Space, Table, Input, Modal, Form, Button, Select} from 'antd';
import {ColumnsType} from 'antd/es/table';
import {useTranslation} from 'react-i18next';
import Activities from './Activities';
import CreateUserButton from './CreateUserButton';

const {Option} = Select;

interface UserType {
    key: string;
    name: string;
    role: string;
}

const EmployeesTable: React.FC = () => {
    const {t} = useTranslation();
    const [data, setData] = useState<UserType[]>([
        {
            key: '1',
            name: 'John Brown',
            role: 'Admin',
        },
        {
            key: '2',
            name: 'Jim Green',
            role: 'Auditor',
        },
        {
            key: '3',
            name: 'Joe Black',
            role: 'Employee',
        },
        {
            key: '4',
            name: 'Patrik Řepa',
            role: 'Admin',
        },
    ]);
    const [filteredData, setFilteredData] = useState<UserType[]>(data);
    const [selectedRecord, setSelectedRecord] = useState<UserType | undefined>(undefined);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [form] = Form.useForm();

    const handleSearch = (value: string) => {
        const filtered = data.filter(item =>
            item.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredData(filtered);
    };

    const handleDelete = (record: UserType) => {
        const updatedData = filteredData.filter(item => item.key !== record.key);
        setFilteredData(updatedData);
    };

    const handleEdit = (record: UserType) => {
        setSelectedRecord(record);
        setModalVisible(true);
        form.setFieldsValue({role: record.role});
    };

    const handleModalOk = () => {
        form
            .validateFields()
            .then(values => {
                const updatedData = filteredData.map(item => {
                    if (item.key === selectedRecord?.key) {
                        return {
                            ...item,
                            name: values.name,
                            role: values.role,
                        };
                    }
                    return item;
                });
                setFilteredData(updatedData);
                setModalVisible(false);
                setSelectedRecord(undefined);
            })
            .catch(error => {
                console.log('Form validation error:', error);
            });
    };

    const handleModalCancel = () => {
        setModalVisible(false);
        setSelectedRecord(undefined);
    };

    const columns: ColumnsType<UserType> = [
        {
            title: t('name'),
            dataIndex: 'name',
            key: 'name',
            render: (text: string) => <a>{text}</a>,
        },
        {
            title: t('role'),
            dataIndex: 'role',
            key: 'role',
            render: (text: string) => {
                let color = '';
                if (text === 'Admin') {
                    color = 'red';
                } else if (text === 'Auditor') {
                    color = 'green';
                } else if (text === 'Employee') {
                    color = 'blue';
                }
                return <span style={{color}}>{text}</span>;
            },
        },
        {
            title: t('useradministration'),
            key: 'action',
            render: (_: any, record: UserType) => (
                <Space size="middle">
                    <a onClick={() => handleEdit(record)}>{t('edit')}</a>
                    <a onClick={() => handleDelete(record)}>{t('delete')}</a>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Input.Search
                style={{maxWidth: '220px', marginLeft: 'auto', marginBottom: '10px'}}
                placeholder={String(t('searchforname'))}
                enterButton={t('search')}
                size="middle"
                onSearch={handleSearch}
            />
            <CreateUserButton/>
            <Activities/>
            <Table columns={columns} dataSource={filteredData}/>

            <Modal
                title={t('editrecord')}
                visible={modalVisible}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
            >
                <Form form={form} initialValues={selectedRecord}
                      style={{width: '80%', display: 'flex', flexDirection: 'column'}}>
                    <Form.Item
                        name="name"
                        label={t('name')}
                        rules={[{required: true, message: String(t('pleasename'))}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name="role"
                        label={t('roles')}
                        rules={[{required: true, message: String(t('pleaseselectrole'))}]}
                    >
                        <Select>
                            <Option style={{color: 'red'}} value="Admin">
                                {t('admin')}
                            </Option>
                            <Option style={{color: 'green'}} value="Auditor">
                                {t('auditor')}
                            </Option>
                            <Option style={{color: 'blue'}} value="Employee">
                                {t('employee')}
                            </Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default EmployeesTable;
