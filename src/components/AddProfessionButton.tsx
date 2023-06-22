import { Button, Form, Input, Modal } from 'antd';
import React, { useState } from 'react';
import { useAppDispatch } from '../utils/hooks';
import { addNewProfession } from '../slices/professionsSlice';

const AddProfessionButton: React.FC = () => {

    const dispatch = useAppDispatch();

    const [isAddProfessionModalVisible, setIsAddProfessionModalVisible] = useState(false);
    const [professionName, setProfessionName] = useState('');

    const handleAddProfessionSubmit = () => {
        if (professionName) {
            dispatch(addNewProfession({
                name: professionName
            }));
            setProfessionName('');
            setIsAddProfessionModalVisible(false);
        }
    }

    return <>
        <Button type="primary" onClick={() => setIsAddProfessionModalVisible(true)}>
        Add profession
        </Button>
        <Modal
            title="Add Item"
            open={isAddProfessionModalVisible}
            onCancel={() => setIsAddProfessionModalVisible(false)}
            onOk={handleAddProfessionSubmit}
        >
            <Form.Item label="Profession" rules={[{ required: true }]}>
                <Input value={professionName} onChange={e => setProfessionName(e.target.value)}/>
            </Form.Item>
        </Modal>
    </>
}

export default AddProfessionButton;