import { Modal, Form, Input, Button } from 'antd';
import { useState } from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';

interface AddCompanyButtonProps {
    onCreateCompany: (name: string) => void;
}

const AddCompanyButton: React.FC<AddCompanyButtonProps> = ({ onCreateCompany }) => {
    const [visible, setVisible] = useState(false);

    const handleIconClick = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const handleFormSubmit = (values: { [key: string]: any }) => {
        console.log('Form submitted with values:', values);

        // Close the modal
        setVisible(false);

        // Pass the company name to the parent component
        onCreateCompany(values.name);
    };

    return (
        <>
      <span onClick={handleIconClick} style={{ cursor: 'pointer' }}>
        <PlusCircleOutlined style={{ color: 'blue', marginRight: 8 }} />
      </span>

            <Modal visible={visible} title="Create a Company" onCancel={handleCancel} footer={null}>
                <Form onFinish={handleFormSubmit}>
                    <Form.Item name="name" label="Company Name" rules={[{ required: true, message: 'Please enter the company name' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Create
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default AddCompanyButton;
