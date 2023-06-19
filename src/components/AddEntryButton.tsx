import { Button, DatePicker, Dropdown, Form, Input, InputNumber, Menu, Modal, Select } from 'antd';
import React, {useEffect, useState} from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../utils/hooks';
import { fetchEntryTypes } from '../slices/entryTypesSlice';
import { Dayjs } from 'dayjs';
import { addNewEntry } from '../slices/entriesSlice';

const {RangePicker} = DatePicker;

const AddEntryButton: React.FC = () => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    
    const currentUserId = 2; //TODO HARD CODED NEED TO REPLACE LATER
    
    const [addEntryType, setAddEntryType] = useState<string | null>(null);
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const [hourCount, setHourCount] = useState<number | null>();
    const [typeId, setTypeId] = useState<number>();
    const [day, setDay] = useState<Dayjs | null>();
    const [description, setDescription] = useState<string>();


    const entryTypes = useAppSelector(state => state.entryTypes.entryTypes).map(entryType => {
        return {
            value: entryType.id,
            label: entryType.name
        };
    });

    const entryTypesStatus = useAppSelector(state => state.entries.status);

    const handleMenuClick = (e: any) => {
        setAddEntryType(e.key);
        setModalVisible(true);
    };

    const handleJobModalOk = async () => {

        if (!typeId || !description || !hourCount) return;

        console.log({
            userId: currentUserId,
            typeId,
            description,
            hourCount,
        })
        await dispatch(addNewEntry({
            userId: currentUserId,
            typeId,
            description,
            hourCount,
        }));

        setModalVisible(false);
    };

    const handleJobModalCancel = () => {
        setModalVisible(false);
    };

    const handleHolidayModalOk = () => {
        const form = document.querySelector('#holidayForm') as HTMLFormElement;
        form.dispatchEvent(new Event('submit'));
        setModalVisible(false);
    };

    const handleHolidayModalCancel = () => {
        setModalVisible(false);
    };

    const handleHolidayFormFinish = (values: any) => {
        const {duration, description} = values;

        const startDate = duration[0].format('YYYY-MM-DD');
        const endDate = duration[1].format('YYYY-MM-DD');

        const newEntry = {
            type: 'holiday',
            description: description,
        };

        setModalVisible(false);
    };

    useEffect(() => {
        if(entryTypesStatus === 'idle')
            dispatch(fetchEntryTypes());
    }, [entryTypesStatus, dispatch]);

    const addEntryMenu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="job">{t('addjob')}</Menu.Item>
            <Menu.Item key="holiday">{t('addholiday')}</Menu.Item>
        </Menu>
    );
    
    return <>
        <Dropdown overlay={addEntryMenu} trigger={['click']}>
            <Button type="primary" size="large" style={{marginTop: '10px'}}>
                {t('add+')}
            </Button>
        </Dropdown>

        <Modal
            title={t('addjob')}
            visible={modalVisible && addEntryType === 'job'}
            onOk={handleJobModalOk}
            onCancel={handleJobModalCancel}
        >
            <Form.Item label={t('timespent')}>
                <InputNumber value={hourCount} onChange={setHourCount} min={1}/>
            </Form.Item>
            <Form.Item label={t('entryselect')}>
                <Select value={typeId} options={entryTypes} onChange={setTypeId}/>
            </Form.Item>
            <Form.Item label={t('timerange')}>
                <DatePicker value={day} onChange={e => setDay(e)}/>
            </Form.Item>
            <Form.Item label={t('description')}>
                <Input.TextArea value={description} onChange={e => setDescription(e.target.value)}/>
            </Form.Item>
        </Modal>

        <Modal
            title={t('addholiday')}
            visible={modalVisible && addEntryType === 'holiday'}
            onOk={handleHolidayModalOk}
            onCancel={handleHolidayModalCancel}
        >
            <Form id="holidayForm" onFinish={handleHolidayFormFinish}>
                <Form.Item name="duration" label={t('selectdate')}>
                    <RangePicker/>
                </Form.Item>
                <Form.Item name="description" label={t('description')}>
                    <Input.TextArea/>
                </Form.Item>
            </Form>
    </Modal>
    </>;
};

export default AddEntryButton;