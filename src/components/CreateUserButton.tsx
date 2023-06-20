import React, {useState} from 'react';
import {Button, Modal, Form, Input, Select} from 'antd';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../utils/store'; // Import AppDispatch and RootState from the store
import {addNewUser} from '../slices/usersSlice';
import {TFunction} from 'i18next';

const {Option} = Select;

const CreateUserButton: React.FC = () => {
    const {t}: { t: TFunction } = useTranslation();
    const dispatch: AppDispatch = useDispatch(); // Define the type of dispatch as AppDispatch
    const [modalVisible, setModalVisible] = useState(false);
    const [form] = Form.useForm();

    const error = useSelector((state: RootState) => state.users.error);

    const handleCreateUser = () => {
        setModalVisible(true);
    };

    const handleModalOk = () => {
        form
            .validateFields()
            .then((values) => {
                dispatch(addNewUser(values) as any); // Dispatch the addNewUser action with form values
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
                {error && <div>Error: {error}</div>}
            </Modal>
        </>
    );
};

export default CreateUserButton;
