import React, {useState, useEffect} from 'react';
import {Space, Table, Input, Modal, Form, Button} from 'antd';
import {ColumnsType} from 'antd/es/table';
import Activities from './Activities';
import CreateUserButton from './CreateUserButton';

const {Search} = Input;

interface DataType {
    key: string;
    profession: string;
}

const data: DataType[] = [
    {
        key: '1',
        profession: 'Ředitel',
    },
    {
        key: '2',
        profession: 'Uředník',
    },
    {
        key: '3',
        profession: 'Zaměstnanec',
    },
    {
        key: '4',
        profession: 'Ředitel',
    },
];

const ProfessionTable: React.FC = () => {
    const [filteredData, setFilteredData] = useState<DataType[]>(data);
    const [selectedRecord, setSelectedRecord] = useState<DataType | undefined>(undefined);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [form] = Form.useForm();

    useEffect(() => {
        form.resetFields();
    }, [form, selectedRecord]);

    const handleSearch = (value: string) => {
        // Filtrujte data na základě hledané hodnoty
        const filtered = data.filter((item) =>
            item.profession.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredData(filtered);
    };

    const handleDelete = (record: DataType) => {
        const updatedData = filteredData.filter((item) => item.key !== record.key);
        setFilteredData(updatedData);
    };

    const handleEdit = (record: DataType) => {
        setSelectedRecord(record);
        setModalVisible(true);
        form.setFieldsValue({profession: record.profession});
    };

    const handleModalOk = () => {
        form.validateFields().then((values) => {
            // Aktualizujte záznam s novými hodnotami
            const updatedData = filteredData.map((item) => {
                if (item.key === selectedRecord?.key) {
                    return {
                        ...item,
                        profession: values.profession,
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
            title: 'Profese',
            dataIndex: 'profession',
            key: 'profession',
        },
        {
            title: 'Administrace uživatele',
            key: 'action',
            render: (_: any, record: DataType) => (
                <Space size="middle">
                    <a onClick={() => handleEdit(record)}>Upravit</a>
                    <a onClick={() => handleDelete(record)}>Smazat</a>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Search
                style={{maxWidth: '220px', marginLeft: 'auto', marginBottom: '10px', marginRight: '1rem'}}
                placeholder="Hledat podle profesního titulu"
                enterButton="Hledat"
                size="middle"
                onSearch={handleSearch}
            />
            <Activities/>
            <Table columns={columns} dataSource={filteredData}/>

            <Modal
                title="Upravit záznam"
                visible={modalVisible}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
            >
                <Form form={form} initialValues={selectedRecord}
                      style={{width: '80%', display: 'flex', flexDirection: 'column'}}>
                    <Form.Item
                        name="profession"
                        label="Profese"
                        rules={[{required: true, message: 'Prosím zadejte profesní titul'}]}
                    >
                        <Input/>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default ProfessionTable;
