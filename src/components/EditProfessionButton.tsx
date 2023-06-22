import { Button, Form, Input, Modal, Select } from "antd"
import { useState } from "react";
import { ProfessionType } from "../slices/professionsSlice";
import { EntryType } from "../slices/entryTypesSlice";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { addNewProfessionTypeEntryType, deleteProfessionTypeEntryType } from "../slices/professionTypeEntryTypesSlice";

type Data = {
    profession: ProfessionType,
    entryTypes: {
        connectionId: number,
        entryType: EntryType
    }[]
  }

const EditProfessionButton : React.FC<{record: Data; allEntryTypes: EntryType[]}> = ({record, allEntryTypes}) => {

    const dispatch = useAppDispatch();

    const [isEditModalVisible, setIsEditModalVisible] = useState(false);

    const [editProfession, setEditProfession] = useState('')
    const [editEntryTypes, setEditEntryTypes] = useState<number[]>()

    const handleEdit = (record: Data) => {

        setEditProfession(record.profession.name);
        setEditEntryTypes(record.entryTypes.map(item => item.entryType.id));
        
        setIsEditModalVisible(true);
    };

    const handleEditSubmit = () => {
        console.log(record.entryTypes, editEntryTypes);
        const deletedArr = record.entryTypes.filter(item => !editEntryTypes?.includes(item.entryType.id))
            .map(item => item.connectionId)
        console.log(deletedArr);
        
        const addedArr = editEntryTypes && editEntryTypes.filter(item => !record.entryTypes.map(item => item.entryType.id).includes(item))
            
        console.log(addedArr);

        deletedArr.forEach(id => {
            dispatch(deleteProfessionTypeEntryType(id));
        })

        addedArr?.forEach(entryTypeId => {
            dispatch(addNewProfessionTypeEntryType({
                professionTypeId: record.profession.id,
                entryTypeId
            }))
        })

        setIsEditModalVisible(false);
    };

    return <>
        <Button type="link" onClick={() => handleEdit(record)}>
            Edit
        </Button>

        <Modal
        title="Edit Item"
        open={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        onOk={handleEditSubmit}
        >
            <Form.Item label="Profession">
                <Input value={editProfession} onChange={e => setEditProfession(e.target.value)}/>
            </Form.Item>
            <Form.Item label="Activity">
                <Select mode="multiple" value={editEntryTypes} onChange={setEditEntryTypes}>
                    {allEntryTypes.map(item => (
                    <Select.Option key={item.id} value={item.id}>
                        {item.name}
                    </Select.Option>
                    ))}
                </Select>
            </Form.Item>
        </Modal>
    </>
}

export default EditProfessionButton; 