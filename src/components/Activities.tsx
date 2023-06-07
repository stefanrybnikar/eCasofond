import React, {useState} from 'react';
import {Button, Modal, Form, Input, Select} from 'antd';
import {UserOutlined} from '@ant-design/icons';

const {Option} = Select;

const Activities: React.FC = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [form] = Form.useForm();

    const handleCreateUser = () => {
        setModalVisible(true);
    };

    const handleModalOk = () => {
        form.validateFields().then((values) => {
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
            <Button style={{marginRight: '1rem'}} type="primary" size="middle"
                    onClick={handleCreateUser}>
                Create job title +
            </Button>

            <Modal
                title="Job title"
                visible={modalVisible}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
            >
                <Form form={form}>
                    <Form.Item
                        name="name"
                        label="job title"
                        rules={[{required: true, message: 'Please enter a job title...'}]}
                    >
                        <Input/>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default Activities;
