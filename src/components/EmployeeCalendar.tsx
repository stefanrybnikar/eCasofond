import React, {useEffect, useRef, useState} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import {EventContentArg} from '@fullcalendar/core';
import {Divider, Popconfirm, Spin} from 'antd';
import {DeleteOutlined} from '@ant-design/icons';
import {useTranslation} from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../utils/hooks';
import { deleteEntry, fetchEntries } from '../slices/entriesSlice';
import { HOLIDAY_COLOR, HOLIDAY_ID } from '../utils/constants';

interface CalendarEvent {
    start: string;
    entries: any[];
}

const EmployeeCalendar: React.FC = () => {
    const {t} = useTranslation();
    const calendarRef = useRef<FullCalendar>(null);
    const [] = useState<number | undefined>(undefined);
    const [] = useState<string>('');
    const dispatch = useAppDispatch();

    const currentUserId = 1; //TODO HARD CODED NEED TO REPLACE LATER
    
    const userEntries = useAppSelector(state => state.entries.entries.filter(entry => entry.userId === currentUserId));

    const entriesStatus = useAppSelector(state => state.entries.status);

    useEffect(() => {
        if(entriesStatus === 'idle')
            dispatch(fetchEntries());
    }, [entriesStatus, dispatch]);


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

    const handleDeleteEntry = (id: number) => {
        console.log(id);
        dispatch(deleteEntry(id));
    }

    const customEvent = (content: EventContentArg) => {
        const entries = content.event.extendedProps.entries;
        let totalHours = 0;
        let isHoliday = false;
        let holidayId = 0;
        entries.forEach((entry: any) => {
            totalHours += entry.hourCount;
            if (entry.typeId === HOLIDAY_ID){
                isHoliday = true;
                holidayId = entry.id;
            }
        });

        return (
            <>
                {
                    isHoliday
                    ?
                    <>
                     <HolidayTag/>
                        <Popconfirm title="Do you want to confirm deletion?" onConfirm={() => handleDeleteEntry(holidayId)}>
                            <DeleteOutlined key={holidayId}/>
                        </Popconfirm>
                    </>
                    :
                    <div>
                        <div style={{ padding: 10, paddingLeft: '10%', fontWeight: 'bold'}}>
                            {totalHours}h
                        </div>
                        {entries &&
                            entries.map((entry: any) => (
                                <div style={{display: 'flex'}}>
                                    <>
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
                                    </>
                                    <Popconfirm title="Do you want to confirm deletion?" onConfirm={() => handleDeleteEntry(entry.id)}>
                                        <DeleteOutlined key={entry.id}/>
                                    </Popconfirm>
                                </div>
                            ))}
                            <Divider/>
                    </div>
                }
            </>
        );
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
        </div>
    );
};

export default EmployeeCalendar;

const HolidayTag: React.FC = () => (
    <div style={{borderRadius: 5, background: HOLIDAY_COLOR, color: 'white', padding: 10, paddingInline: '10%'}}>
        Holiday
    </div>
)