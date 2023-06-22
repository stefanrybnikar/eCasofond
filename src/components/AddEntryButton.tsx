import { Button, DatePicker, Dropdown, Form, Input, InputNumber, Menu, Modal, Select } from 'antd';
import React, {useEffect, useState} from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../utils/hooks';
import { fetchEntryTypes } from '../slices/entryTypesSlice';
import dayjs, { Dayjs } from 'dayjs';
import { addNewEntry } from '../slices/entriesSlice';
import { HOLIDAY_ID } from '../utils/constants';

const iterateDateRange = (startDate: Dayjs, endDate: Dayjs) => {
  let currentDate = dayjs(startDate);
  const finalDate = dayjs(endDate);

  const dates: Dayjs[] = [];

  while (currentDate.isBefore(finalDate) || currentDate.isSame(finalDate)) {
    dates.push(currentDate);
    currentDate = currentDate.add(1, 'day');
  }

  return dates;
}

const {RangePicker} = DatePicker;

const AddEntryButton: React.FC = () => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    
    const currentUserId = 1; //TODO HARD CODED NEED TO REPLACE LATER
    
    const [addEntryType, setAddEntryType] = useState<string | null>(null);
    const [modalVisible, setModalVisible] = useState<boolean>(false);


    //job entry states
    const [hourCount, setHourCount] = useState<number | null>();
    const [typeId, setTypeId] = useState<number>();
    const [day, setDay] = useState<Dayjs | null>();
    const [description, setDescription] = useState<string>();


    //holiday entry states
    const [holidayRange, setHolidayRange] = useState<[Dayjs | null, Dayjs | null] | null>();
    const [holidayDescription, setHolidayDescription] = useState<string>();


    const entryTypes = useAppSelector(state => state.entryTypes.entryTypes).filter(entryType => entryType.id !== HOLIDAY_ID).map(entryType => {
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

        if (!typeId || !description || !hourCount || !day) return;

        await dispatch(addNewEntry({
            userId: currentUserId,
            typeId,
            description,
            hourCount,
            day: day.format("YYYY-MM-DD"),
        }));

        setTypeId(undefined);
        setDescription(undefined);
        setHourCount(undefined);
        setDay(undefined);

        setModalVisible(false);
    };

    const handleModalCancel = () => {
        setModalVisible(false);
    };

    const handleHolidayModalOk = async () => {

        if (!holidayRange?.[0] || !holidayRange?.[1] || !holidayDescription) return;

        const days = iterateDateRange(holidayRange[0], holidayRange[1]);
        

        days.forEach(day => {
            dispatch(addNewEntry({
                userId: currentUserId,
                typeId: HOLIDAY_ID,
                description: holidayDescription,
                hourCount: 0,
                day: day.format("YYYY-MM-DD"),
            }));
        });

        setHolidayRange(undefined);
        setHolidayDescription(undefined);
        setModalVisible(false)
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
            open={modalVisible && addEntryType === 'job'}
            onOk={handleJobModalOk}
            onCancel={handleModalCancel}
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
            open={modalVisible && addEntryType === 'holiday'}
            onOk={handleHolidayModalOk}
            onCancel={handleModalCancel}
        >
            <Form.Item label={t('selectdate')}>
                <RangePicker value={holidayRange} onChange={setHolidayRange}/>
            </Form.Item>
            <Form.Item label={t('description')}>
                <Input.TextArea value={holidayDescription} onChange={e => setHolidayDescription(e.target.value)}/>
            </Form.Item>
    </Modal>
    </>;
};

export default AddEntryButton;