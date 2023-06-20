import React, {useRef, useState} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import {EventContentArg} from '@fullcalendar/core';
import {TimePicker} from 'antd';
import {Button, Dropdown, Menu, Modal, Input, Form, DatePicker} from 'antd';
import {useTranslation} from 'react-i18next';

const EmployeeCalendar: React.FC = () => {
    const {t} = useTranslation(); // Hook to access translation functions
    const {RangePicker} = DatePicker;
    const App: React.FC = () => <TimePicker.RangePicker/>;
    const calendarRef = useRef<FullCalendar>(null);
    const [addEntryType, setAddEntryType] = useState<string | null>(null);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [entryTime, setEntryTime] = useState<number | undefined>(undefined);
    const [entryDescription, setEntryDescription] = useState<string>('');

    const events = [
        {
            start: '2023-05-31',
            entries: [
                {
                    type: 'Washing laptops',
                    time: 4,
                },
                {
                    type: 'Fixing cables',
                    time: 3,
                },
            ],
        },
        {
            start: '2023-06-06',
            entries: [
                {
                    type: 'Washing laptops',
                    time: 4,
                },
                {
                    type: 'Fixing cables',
                    time: 3,
                },
            ],
        },
    ];

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
                                {entry.time}h - {entry.type}
                            </div>
                        </div>
                    ))}
            </>
        );
    };

    const handleAddEvent = () => {
        // Event addition logic
        const newEvent = {
            start: '2023-06-10',
            entries: [
                {
                    type: addEntryType || 'New Event',
                    time: entryTime || 0,
                    description: entryDescription,
                },
            ],
        };

        if (calendarRef.current) {
            calendarRef.current.getApi().addEvent(newEvent);
        }

        // Reset values
        setAddEntryType(null);
        setEntryTime(undefined);
        setEntryDescription('');
        setModalVisible(false);
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
    };

    const handleJobModalCancel = () => {
        setModalVisible(false);
    };

    const handleHolidayModalOk = () => {
        const form = document.querySelector('#holidayForm') as HTMLFormElement;
        form.dispatchEvent(new Event('submit'));
    };

    const handleHolidayModalCancel = () => {
        setModalVisible(false);
    };

    const handleJobFormFinish = (values: any) => {
        console.log('Job Form values:', values);
        setModalVisible(false);
    };

    const handleHolidayFormFinish = (values: any) => {
        console.log('Holiday Form values:', values);
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
                    <Form.Item name="timeSpent" label={t('timespent')}>
                        <DatePicker/>
                    </Form.Item>
                    <Form.Item name="timeRange" label={t('timerange')}>
                        <TimePicker.RangePicker/>
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
