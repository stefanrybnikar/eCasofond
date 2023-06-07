import React, {useState} from 'react';
import {Button, Modal, Form, Input, Select} from 'antd';
import {UserOutlined} from '@ant-design/icons';

const {Option} = Select;

const CreateUserButton: React.FC = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [form] = Form.useForm();

    const handleCreateUser = () => {
        setModalVisible(true);
    };

    const handleModalOk = () => {
        form.validateFields().then((values) => {
            // Vytvořit nového uživatele s hodnotami z formuláře
            // Přidat nového uživatele do seznamu dat
            setModalVisible(false);
            form.resetFields();
        });
    };

    const handleModalCancel = () => {
        setModalVisible(false);
        form.resetFields();
    };

    return (
        <>
            <Button style={{marginRight: '1rem', marginLeft: '1rem'}} type="primary" size="middle"
                    onClick={handleCreateUser}>
                Create User +
            </Button>

            <Modal
                title="Create User"
                visible={modalVisible}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
            >
                <Form form={form}>
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
                            <Option value="Admin">Admin</Option>
                            <Option value="Auditor">Auditor</Option>
                            <Option value="Employee">Employee</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default CreateUserButton;
