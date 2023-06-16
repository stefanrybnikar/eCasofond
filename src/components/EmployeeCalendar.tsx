import React, {useEffect, useRef, useState} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import {EventContentArg} from '@fullcalendar/core';
import {InputNumber, Select, TimePicker} from 'antd';
import {Button, Dropdown, Menu, Modal, Input, Form, DatePicker} from 'antd';
import {useTranslation} from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../utils/hooks';
import { addNewEntry, fetchEntries } from '../slices/entriesSlice';
import { fetchEntryTypes } from '../slices/entryTypesSlice';

interface CalendarEvent {
    start: string;
    entries: any[];
}

type EntryInputForm = {
    hourCount: number;
    typeId: number;
    day: Date;
    description: string;
}

const EmployeeCalendar: React.FC = () => {
    const {t} = useTranslation();
    const {RangePicker} = DatePicker;
    const calendarRef = useRef<FullCalendar>(null);
    const [addEntryType, setAddEntryType] = useState<string | null>(null);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [] = useState<number | undefined>(undefined);
    const [] = useState<string>('');

    const currentUserId = 2; //TODO HARD CODED NEED TO REPLACE LATER

    const dispatch = useAppDispatch();
    
    const userEntries = useAppSelector(state => state.entries.entries.filter(entry => entry.userId === currentUserId)).map(entry => { //remove map function afetr day value is implemented on backend, aiwen pls
        return {
            day: '2023-06-16',
            ...entry
        }
    });

    const entriesStatus = useAppSelector(state => state.entries.status);

    const entriesError = useAppSelector(state => state.entries.error);

    useEffect(() => {
        if(entriesStatus === 'idle')
            dispatch(fetchEntries());
    }, [entriesStatus, dispatch]);


    const entryTypes = useAppSelector(state => state.entryTypes.entryTypes).map(entryType => {
        return {
            value: entryType.id,
            label: entryType.name
        };
    });

    const entryTypesStatus = useAppSelector(state => state.entries.status);

    useEffect(() => {
        if(entryTypesStatus === 'idle')
            dispatch(fetchEntryTypes());
    }, [entryTypesStatus, dispatch]);


    const groupedEntriesByDays = userEntries.reduce((groups, obj) => {
        const { day } = obj;
        
        if (!groups[day]) {
          groups[day] = [];
        }
        
        groups[day].push(obj);
        
        return groups;
      }, {});


    const events: CalendarEvent[] = Object.keys(groupedEntriesByDays).map((key, value) => {
        return {
            start: key,
            entries: groupedEntriesByDays[key]
        }
    });

    const customEvent = (content: EventContentArg) => {
        const entries = content.event.extendedProps.entries;

        return (
            <>
                {entries &&
                    entries.map((entry: any) => (
                        <div style={{display: 'flex'}}>
                            <div style={{width: '10%'}}>
                                <span style={{color: '#52C41A'}}>•</span>
                            </div>
                            <div
                                style={{
                                    width: '80%',
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden',
                                }}
                            >
                                {entry.hourCount}h - {entry.description}
                            </div>
                        </div>
                    ))}
            </>
        );
    };

    const handleAddEvent = () => {
        // logika přidání události
    };

    const handleMenuClick = (e: any) => {
        setAddEntryType(e.key);
        setModalVisible(true);
    };

    const addEntryMenu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="job">{t('addjob')}</Menu.Item>
            <Menu.Item key="holiday">{t('addholiday')}</Menu.Item>
        </Menu>
    );

    const handleJobModalOk = () => {
        const form = document.querySelector('#jobForm') as HTMLFormElement;
        form.dispatchEvent(new Event('submit'));
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

    const handleJobFormFinish = async (data: EntryInputForm) => {
        const {hourCount, typeId, day, description} = data;
        
        console.log(data)
        // await dispatch(addNewEntry({
        //     userId: currentUserId,
        //     typeId: 1,
        //     description,
        //     hourCount,
        // }));

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

        const newEvent = {
            start: startDate,
            end: endDate,
            entries: [newEntry],
        };

        if (calendarRef.current) {
            calendarRef.current.getApi().addEvent(newEvent);
        }

        setModalVisible(false);
    };

    const calendarOptions = {
        events,
        plugins: [dayGridPlugin],
        initialView: 'dayGridWeek',
        headerToolbar: {
            start: 'title',
            center: '',
            end: 'dayGridMonth,dayGridWeek today prev,next',
        },
        eventContent: customEvent,
        height: '75vh',
        buttonText: {
            today: t('today') as string,
            month: t('month') as string,
            week: t('week') as string,
        },
    };

    return (
        <div>
            <FullCalendar {...calendarOptions} ref={calendarRef}/>

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
                <Form id="jobForm" onFinish={handleJobFormFinish}>
                    <Form.Item name="hourCount" label={t('timespent')}>
                        <InputNumber/>
                    </Form.Item>
                    <Form.Item name="typeId" label={t('entryselect')}>
                        <Select defaultValue={entryTypes[0]} options={entryTypes}/>
                    </Form.Item>
                    <Form.Item name="day" label={t('timerange')}>
                        <DatePicker/>
                    </Form.Item>
                    <Form.Item name="description" label={t('description')}>
                        <Input.TextArea/>
                    </Form.Item>
                    
                </Form>
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
        </div>
    );
};

export default EmployeeCalendar;
