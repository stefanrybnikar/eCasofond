import { dA } from '@fullcalendar/core/internal-common';
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';
import { HOLIDAY_COLOR, HOLIDAY_ID, WORK_ID } from '../utils/constants';

type Entry = {
    id: number;
    typeId: number;
    description: string;
    hourCount: number;
    created: Dayjs;
    updated: Dayjs;
    day: Dayjs;
};

type Props = {
    entries: Entry[];
    from: Dayjs;
    to: Dayjs;
};

const WEEKEND_TYPE = 0;
const WEEKEND_COLOR = "#E18C8C"; //weekend, day off etc
const WORK_COLOR = "#52C41A";

const RowCalendar: React.FC<Props> = ({entries, from, to}) => {

    const groupedEntriesByDays = entries.reduce((groups: { [key: string]: any[] }, obj) => {
        const day = obj.day.toString();
      
        if (!groups[day]) {
          groups[day] = [];
        }
      
        groups[day].push(obj);
      
        return groups;
      }, {});

    const range = to.diff(from, 'day') + 1;

    const daysArr = [];
    
    console.log(groupedEntriesByDays)

    for(let i = range; i > 0; i--)
    {
        const day = dayjs(from).add(i-1, 'days');
        const dayString = day.format("YYYY-MM-DD").toString();

        console.log(dayString, groupedEntriesByDays[dayString], "aaaaaaaaaaa")
        console.log(groupedEntriesByDays[dayString] && Boolean(groupedEntriesByDays[dayString].find(entry => entry.typeId === HOLIDAY_ID)) ? HOLIDAY_ID : undefined)

        const entry_type = day.get('day') !== 6 && day.get('day') !== 0 ? (groupedEntriesByDays[dayString] && Boolean(groupedEntriesByDays[dayString].find(entry => entry.typeId === HOLIDAY_ID)) ? HOLIDAY_ID : undefined) : 0

        daysArr.push({
            n: i,
            day,
            entry_type,
            entries: groupedEntriesByDays[dayString],
        })
    }

    return <>
        {daysArr.map(e => <div key={e.n} style={{
            flexGrow: 1,
            background: (
                e.entry_type === WEEKEND_TYPE ? WEEKEND_COLOR
                :
                e.entries === undefined ? "#fff"
                :
                (e.entry_type === HOLIDAY_ID ? HOLIDAY_COLOR
                    :
                    WORK_COLOR)
                ),
            margin: 1,
            borderRadius: 2,
            border: 1,
            boxShadow: "1px 1px 5px lightgray"
            }}>
            ‎ 
            </div>)}
    </>;
}

export default RowCalendar;