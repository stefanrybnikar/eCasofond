import React, {useRef, useState} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import {EventContentArg} from '@fullcalendar/core';
import {TimePicker} from 'antd';
import {Button, Dropdown, Menu, Modal, Input, Form, DatePicker} from 'antd';

const EmployeeCalendar: React.FC = () => {
    const {RangePicker} = DatePicker;
    const App: React.FC = () => <TimePicker.RangePicker/>;
    const calendarRef = useRef<FullCalendar>(null);
    const [addEntryType, setAddEntryType] = useState<string | null>(null); // Udržuje vybraný typ přidávané položky
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
        // Logika pro přidání události
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

        // Resetování hodnot
        setAddEntryType(null);
        setEntryTime(undefined);
        setEntryDescription('');
        setModalVisible(false);
    };

    // Obsluha výběru typu položky
    const handleMenuClick = (e: any) => {
        setAddEntryType(e.key);
        setModalVisible(true);
    };

    // Dropdown menu obsahující položky pro přidání
    const addEntryMenu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="job">Add job</Menu.Item>
            <Menu.Item key="holiday">Add holiday</Menu.Item>
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

    return (
        <div>
            <FullCalendar
                events={events}
                ref={calendarRef}
                plugins={[dayGridPlugin]}
                initialView={'dayGridWeek'}
                headerToolbar={{
                    start: 'title',
                    center: '',
                    end: 'dayGridMonth,dayGridWeek today prev,next',
                }}
                eventContent={customEvent}
                height={'75vh'}
            />

            <Dropdown overlay={addEntryMenu} trigger={['click']}>
                <Button type="primary" size="large" style={{marginTop: '10px'}}>
                    Add+
                </Button>
            </Dropdown>
            <Modal
                title="Add Job"
                visible={modalVisible && addEntryType === 'job'}
                onOk={handleJobModalOk}
                onCancel={handleJobModalCancel}
            >
                <Form id="jobForm" onFinish={handleJobFormFinish}>
                    <Form.Item name="timeSpent" label="Time Spent">
                        <DatePicker/>
                    </Form.Item>
                    <Form.Item name="timeRange" label="Time Range">
                        <TimePicker.RangePicker/>
                    </Form.Item>
                    <Form.Item name="description" label="Description">
                        <Input.TextArea/>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title="Add Holiday"
                visible={modalVisible && addEntryType === 'holiday'}
                onOk={handleHolidayModalOk}
                onCancel={handleHolidayModalCancel}
            >
                <Form id="holidayForm" onFinish={handleHolidayFormFinish}>
                    <Form.Item name="duration" label="Duration">
                        <RangePicker/>
                    </Form.Item>
                    <Form.Item name="description" label="Description">
                        <Input.TextArea/>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default EmployeeCalendar;
