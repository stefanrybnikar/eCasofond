import React, {useState} from 'react';
import {Button, Modal, Form, Input, Select} from 'antd';
import {useTranslation} from 'react-i18next';
import {UserOutlined} from '@ant-design/icons';
import {TFunction} from 'i18next';
import { useAppDispatch } from '../utils/hooks';

const {Option} = Select;

const CreateUserButton: React.FC = () => {
    const {t}: { t: TFunction } = useTranslation();
    const dispatch = useAppDispatch();
    const [modalVisible, setModalVisible] = useState(false);
    const [form] = Form.useForm();

    const handleCreateUser = () => {
        setModalVisible(true);
    };

    const handleModalOk = () => {
        form
            .validateFields()
            .then((values) => {
                setModalVisible(false);
                form.resetFields();
            })
            .catch((error) => {
                console.log('Form validation error:', error);
            });
    };


    const handleModalCancel = () => {
        setModalVisible(false);
        form.resetFields();
    };

    return (
        <>
            <Button
                style={{marginRight: '1rem', marginLeft: '1rem'}}
                type="primary"
                size="middle"
                onClick={handleCreateUser}
            >
                {t('createuser+')}
            </Button>

            <Modal
                title={t('createuser')}
                visible={modalVisible}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
            >
                <Form form={form}>
                    <Form.Item
                        name="name"
                        label={t('name')}
                        rules={[{required: true, message: String(t('warninguser'))}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name="role"
                        label={t('role')}
                        rules={[{required: true, message: String(t('warningrole'))}]}
                    >
                        <Select>
                            <Option value="Admin">{t('admin')}</Option>
                            <Option value="Auditor">{t('auditor')}</Option>
                            <Option value="Employee">{t('employee')}</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default CreateUserButton;
