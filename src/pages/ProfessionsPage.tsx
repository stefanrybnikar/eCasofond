import React, { useEffect, useState } from 'react';
import { Table, Input, Button, Modal, Form, Input as AntdInput, Select } from 'antd';
import { useAppDispatch, useAppSelector } from '../utils/hooks';
import { fetchProfessions } from '../slices/professionsSlice';
import { fetchEntryTypes } from '../slices/entryTypesSlice';
import { fetchProfessionTypeEntryTypes } from '../slices/professionTypeEntryTypesSlice';

interface TableItem {
  key: string;
  activity: string;
  profession: string;
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


  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState<TableItem[]>([
    { key: '1', activity: 'Driving', profession: 'Racer' },
    { key: '2', activity: 'Cooking', profession: 'Chef' },
    { key: '3', activity: 'Testing', profession: 'Tester' },
  ]);

  const professionOptions = ['Racer', 'Chef', 'Tester', 'Engineer', 'Teacher'];

  const [addItemForm] = Form.useForm();
  const [isAddItemModalVisible, setIsAddItemModalVisible] = useState(false);
  const [isAddMoreModalVisible, setIsAddMoreModalVisible] = useState(false);
  const [editItem, setEditItem] = useState<TableItem | null>(null);
  const [editForm] = Form.useForm();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [deleteItem, setDeleteItem] = useState<TableItem | null>(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const handleAddItem = () => {
    setIsAddItemModalVisible(true);
  };

  const handleAddMore = () => {
    setIsAddMoreModalVisible(true);
  };

  const handleAddItemSubmit = () => {
    addItemForm.validateFields().then((values) => {
      const newItem: TableItem = {
        key: Math.random().toString(),
        activity: values.activity,
        profession: values.profession,
      };
      setData([...data, newItem]);
      setIsAddItemModalVisible(false);
      addItemForm.resetFields();
    });
  };

  const handleAddMoreSubmit = () => {
    addItemForm.validateFields().then((values) => {
      const newItem: TableItem = {
        key: Math.random().toString(),
        activity: values.activity,
        profession: values.profession.join(', '),
      };
      setData([...data, newItem]);
      setIsAddMoreModalVisible(false);
      addItemForm.resetFields();
    });
  };

  const handleEdit = (record: TableItem) => {
    setEditItem(record);
    setIsEditModalVisible(true);
    editForm.setFieldsValue({
      activity: record.activity,
      profession: record.profession.split(', '),
    });
  };

  const handleEditSubmit = () => {
    editForm.validateFields().then((values) => {
      const updatedData = data.map((item) =>
        item.key === editItem?.key ? { ...item, ...values, profession: values.profession.join(', ') } : item
      );
  
      setData(updatedData);
      setIsEditModalVisible(false);
    });
  };
  
  

  const handleDelete = (record: TableItem) => {
    setDeleteItem(record);
    setIsDeleteModalVisible(true);
  };

  const handleConfirmDelete = () => {
    if (deleteItem) {
      const updatedData = data.filter((item) => item.key !== deleteItem.key);
      setData(updatedData);
    }
    setIsDeleteModalVisible(false);
  };

  const filteredData = data.filter((item) =>
    item.activity.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: 'Profession',
      dataIndex: 'profession',
      key: 'profession',
    },
    {
        title: 'Activity',
        dataIndex: 'activity',
        key: 'activity',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, record: TableItem) => (
        <span>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
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
        <Button type="primary" onClick={handleAddItem}>
          Add Item
        </Button>
        <Button type="primary" onClick={handleAddMore}>
          Add More
        </Button>
      </div>
      <Table columns={columns} dataSource={filteredData} />
      <Modal
        title="Add Item"
        open={isAddItemModalVisible}
        onCancel={() => setIsAddItemModalVisible(false)}
        onOk={handleAddItemSubmit}
      >
        <Form form={addItemForm} layout="vertical">
          <Form.Item name="activity" label="Activity" rules={[{ required: true }]}>
            <AntdInput />
          </Form.Item>
          <Form.Item name="profession" label="Profession" rules={[{ required: true }]}>
            <Select>
              {professionOptions.map((profession) => (
                <Select.Option key={profession} value={profession}>
                  {profession}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Add More"
        open={isAddMoreModalVisible}
        onCancel={() => setIsAddMoreModalVisible(false)}
        onOk={handleAddMoreSubmit}
      >
        <Form form={addItemForm} layout="vertical">
          <Form.Item name="activity" label="Activity" rules={[{ required: true, message:'Activity is required' }]}>
            <AntdInput />
          </Form.Item>
          <Form.Item name="profession" label="Profession" rules={[{ required: true }]}>
            <Select mode="multiple">
              {professionOptions.map((profession) => (
                <Select.Option key={profession} value={profession}>
                  {profession}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Edit Item"
        open={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        onOk={handleEditSubmit}
      >
        <Form form={editForm} layout="vertical">
          <Form.Item name="activity" label="Activity">
            <AntdInput />
          </Form.Item>
          <Form.Item name="profession" label="Profession">
            <Select mode="multiple" defaultValue={editItem ? editItem.profession.split(', ') : []}>
              {professionOptions.map((profession) => (
                <Select.Option key={profession} value={profession}>
                  {profession}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Confirm Delete"
        open={isDeleteModalVisible}
        onCancel={() => setIsDeleteModalVisible(false)}
        onOk={handleConfirmDelete}
      >
        Are you sure you want to delete the activity "{deleteItem?.activity}"?
      </Modal>
    </div>
  );
};

export default ProfessionsPage;
