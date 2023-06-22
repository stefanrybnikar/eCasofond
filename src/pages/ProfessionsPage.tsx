import React, { useEffect, useState } from 'react';
import { Table, Input, Button, Modal, Form, Input as AntdInput, Select, Tag } from 'antd';
import { useAppDispatch, useAppSelector } from '../utils/hooks';
import { ProfessionType, deleteProfession, fetchProfessions } from '../slices/professionsSlice';
import { EntryType, fetchEntryTypes } from '../slices/entryTypesSlice';
import { fetchProfessionTypeEntryTypes } from '../slices/professionTypeEntryTypesSlice';
import EditProfessionButton from '../components/EditProfessionButton';
import AddProfessionButton from '../components/AddProfessionButton';

interface TableItem {
  key: string;
  profession: string;
  activity: string;
}


const ProfessionsPage: React.FC = () => {

    const dispatch = useAppDispatch();

    const professions = useAppSelector(state => state.professions.professions);
    const entryTypes = useAppSelector(state => state.entryTypes.entryTypes);
    const professionTypeEntryTypes = useAppSelector(state => state.professionTypeEntryTypes.professionTypeEntryTypes);

    const professionsStatus = useAppSelector(state => state.professions.status);
    const entryTypesStatus = useAppSelector(state => state.entryTypes.status);
    const professionTypeEntryTypesStatus = useAppSelector(state => state.professionTypeEntryTypes.status);

    
    useEffect(() => {
        if (professionsStatus === 'idle')
            dispatch(fetchProfessions());
        if (entryTypesStatus === 'idle')
            dispatch(fetchEntryTypes());
        if (professionTypeEntryTypesStatus === 'idle')
            dispatch(fetchProfessionTypeEntryTypes());
    },[professionsStatus, entryTypesStatus, professionTypeEntryTypesStatus, dispatch]);

    type Data = {
      profession: ProfessionType,
      entryTypes: {
          connectionId: number,
          entryType: EntryType
      }[]
    }

    const parsedProfessions = professions.map(profession => {

        const data: Data = {
            profession: profession,
            entryTypes: []
        }

        professionTypeEntryTypes.filter(item => item.professionTypeId === profession.id).forEach(
            item => {
                const entryType = entryTypes.find(entryType => entryType.id === item.entryTypeId);
                if (entryType)
                    data.entryTypes.push({
                      connectionId: item.id,
                      entryType
                    });
            }
        );

        return data
    });

    // professionTypeEntryTypes.forEach(item => {
    //     const existingItem = parsedProfessions.find(
    //         formattedItem => formattedItem.profession.id === item.professionTypeId
    //     );

    //     const entryType = entryTypes.find(entryType => entryType.id === item.entryTypeId);

    //     if (existingItem) {
    //         existingItem.entryTypes.push(entryType);
    //     } else {
    //         const newItem = {
    //             profession: professions.find(profession => profession.id ===item.professionTypeId),
    //             entryTypes: [entryType]
    //         };
    //         parsedProfessions.push(newItem);
    //     }
    // });


  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState<TableItem[]>([
    { key: '1', profession: 'Racer', activity: 'ss'},
    { key: '2', profession: 'Chef', activity: 'ss'},
    { key: '3', profession: 'Tester', activity: 'ss'},
  ]);

  const professionOptions = ['Racer', 'Chef', 'Tester', 'Engineer', 'Teacher'];

  const [addItemForm] = Form.useForm();
  const [isAddItemModalVisible, setIsAddItemModalVisible] = useState(false);
  const [deleteItem, setDeleteItem] = useState<Data>();
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const handleDelete = (record: Data) => {
    setDeleteItem(record);
    setIsDeleteModalVisible(true);
  };

  const handleConfirmDelete = () => {
    if (deleteItem?.profession.id) {
      dispatch(deleteProfession(deleteItem.profession.id))
    }
    setIsDeleteModalVisible(false);
  };

  const columns = [
    {
      title: 'Profession',
      dataIndex: ['profession', 'name'],
      key: 'profession',
    },
    {
        title: 'Activity',
        key: 'activity',
        render: (record: Data) => (<>{record.entryTypes.map((e: any) => <Tag>{e.entryType.name}</Tag>)}</>)
    },
    {
        title: 'Action',
        key: 'action',
        render: (text: string, record: Data) => (
            <span>
            <EditProfessionButton record={record} allEntryTypes={entryTypes}/>
            <Button type="link" onClick={() => handleDelete(record)}>
                Delete
            </Button>
            </span>
        ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Input.Search
          placeholder="Search activity"
          style={{ width: 200, marginRight: 8 }}
          onSearch={handleSearch}
        />
        <AddProfessionButton/>
      </div>
      <Table columns={columns} dataSource={parsedProfessions} />

      <Modal
        title="Confirm Delete"
        open={isDeleteModalVisible}
        onCancel={() => setIsDeleteModalVisible(false)}
        onOk={handleConfirmDelete}
      >
        Are you sure you want to delete the activity "{deleteItem?.profession.name}"?
      </Modal>
    </div>
  );
};

export default ProfessionsPage;
