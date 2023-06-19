import React, {useState, useEffect} from 'react';
import {Space, Table, Input, Modal, Form, Button} from 'antd';
import {ColumnsType} from 'antd/es/table';
import Activities from './Activities';
import {useTranslation} from 'react-i18next';

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
    const {t} = useTranslation();

    useEffect(() => {
        form.resetFields();
    }, [form, selectedRecord]);

    const handleSearch = (value: string) => {
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
            title: String(t('profession')),
            dataIndex: 'profession',
            key: 'profession',
        },
        {
            title: String(t('useradministration')),
            key: 'action',
            render: (_: any, record: DataType) => (
                <Space size="middle">
                    <a onClick={() => handleEdit(record)}>{String(t('edit'))}</a>
                    <a onClick={() => handleDelete(record)}>{String(t('delete'))}</a>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Search
                style={{maxWidth: '220px', marginLeft: 'auto', marginBottom: '10px', marginRight: '1rem'}}
                placeholder={String(t('searchforaprofession'))}
                enterButton={String(t('search'))}
                size="middle"
                onSearch={handleSearch}
            />
            <Activities/>
            <Table columns={columns} dataSource={filteredData}/>

            <Modal
                title={String(t('edit'))}
                visible={modalVisible}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
            >
                <Form form={form} initialValues={selectedRecord}
                      style={{width: '80%', display: 'flex', flexDirection: 'column'}}>
                    <Form.Item
                        name="profession"
                        label={String(t('profession'))}
                        rules={[{required: true, message: String(t('warningjob'))}]}
                    >
                        <Input/>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default ProfessionTable;
