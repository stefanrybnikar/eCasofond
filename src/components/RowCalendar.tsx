import { dA } from '@fullcalendar/core/internal-common';
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';

type Entry = {
    id: number;
    typeId: number;
    description: string;
    hourCount: number;
    created: Dayjs;
    updated: Dayjs;
};

type Props = {
    entries: Entry[];
    from: Dayjs;
    to: Dayjs;
};

const HOLIDAY_TYPE = 1;
const OFFDAY_TYPE = 2;
const HOLIDAY_COLOR = "#8BC7FF";
const OFFDAY_COLOR = "#E18C8C"; //weekend, day off etc
const WORK_COLOR = "#52C41A";

const RowCalendar: React.FC<Props> = ({entries, from, to}) => {

    const range = to.diff(from, 'day') + 1;

    const daysArr = [];

    for(let i = range; i > 0; i--)
    {
        daysArr.push({
            n: i,
            day: dayjs().add(i, 'days'),
            entry_type: dayjs().add(i, 'days').get('day') < 5 ? ((i > 2 && i < 5) || (i === 6) ? 1 : 0): 2,
        })
        console.log(dayjs().add(i, 'days').get('day'))
    }

    return <>
        {daysArr.map(e => <div style={{ flexGrow: 1, background: (e.entry_type === OFFDAY_TYPE ? OFFDAY_COLOR : (e.entry_type === HOLIDAY_TYPE ? HOLIDAY_COLOR : WORK_COLOR)), margin: 1, borderRadius: 2}}>
            .
            </div>)}
    </>;
}

export default RowCalendar;