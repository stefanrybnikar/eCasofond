import React, {useState, useEffect} from 'react';
import {Space, Table, Input, Modal, Form, Button, Select} from 'antd';
import {ColumnsType} from "antd/es/table";

const {Option} = Select;

interface DataType {
    key: string;
    name: string;
    role: string;
}

const {Search} = Input;

const data: DataType[] = [
    {
        key: '1',
        name: 'John Brown',
        role: 'Admin',
    },
    {
        key: '2',
        name: 'Jim Green',
        role: 'Employee',
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
];

const EmployeesTable: React.FC = () => {
    const [filteredData, setFilteredData] = useState<DataType[]>(data);
    const [selectedRecord, setSelectedRecord] = useState<DataType | undefined>(undefined);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [form] = Form.useForm();

    useEffect(() => {
        form.resetFields();
    }, [form, selectedRecord]);

    const handleSearch = (value: string) => {
        // Filter the data based on the search value
        const filtered = data.filter(item =>
            item.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredData(filtered);
    };

    const handleDelete = (record: DataType) => {
        const updatedData = filteredData.filter(item => item.key !== record.key);
        setFilteredData(updatedData);
    };

    const handleEdit = (record: DataType) => {
        setSelectedRecord(record);
        setModalVisible(true);
        form.setFieldsValue({role: record.role});
    };

    const handleModalOk = () => {
        form.validateFields().then(values => {
            // Update the record with new values
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
        });
    };

    const handleModalCancel = () => {
        setModalVisible(false);
        setSelectedRecord(undefined);
    };

    const columns: ColumnsType<DataType> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text: string) => <a>{text}</a>,
        },
        {
            title: 'Role',
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
            title: 'User Administration',
            key: 'action',
            render: (_: any, record: DataType) => (
                <Space size="middle">
                    <a onClick={() => handleEdit(record)}>Edit</a>
                    <a onClick={() => handleDelete(record)}>Delete</a>
                </Space>
            ),
        },
    ];


    return (
        <>
            <Search
                style={{maxWidth: '220px', marginLeft: 'auto', marginBottom: '10px'}}
                placeholder="Search for a name"
                enterButton="Search"
                size="middle"
                onSearch={handleSearch}
            />
            <Table columns={columns} dataSource={filteredData}/>

            <Modal
                title="Edit Record"
                visible={modalVisible}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
            >
                <Form form={form} initialValues={selectedRecord}
                      style={{width: '80%', display: 'flex', flexDirection: 'column'}}>
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{required: true, message: 'Please enter a name'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name="role"
                        label="Roles"
                        rules={[{required: true, message: 'Please select a role'}]}
                    >
                        <Select>
                            <Option style={{color: 'red'}} value="Admin">Admin</Option>
                            <Option style={{color: 'green'}} value="Auditor">Auditor</Option>
                            <Option style={{color: 'blue'}} value="Employee">Employee</Option>
                        </Select>
                    </Form.Item>
                </Form>

            </Modal>
        </>
    );
};

export default EmployeesTable;
