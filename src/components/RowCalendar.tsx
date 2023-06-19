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

    const range = to.diff(from, 'day') + 1;

    const daysArr = [];

    for(let i = range; i > 0; i--)
    {
        daysArr.push({
            n: i,
            day: dayjs().add(i, 'days'),
            entry_type: dayjs().add(i, 'days').get('day') < 5 ? ((i > 2 && i < 5) || (i === 6) ? HOLIDAY_ID : WORK_ID): 0,
        })
    }

    return <>
        {daysArr.map(e => <div key={e.n} style={{ flexGrow: 1, background: (e.entry_type === WEEKEND_TYPE ? WEEKEND_COLOR : (e.entry_type === HOLIDAY_ID ? HOLIDAY_COLOR : WORK_COLOR)), margin: 1, borderRadius: 2}}>
            .
            </div>)}
    </>;
}

export default RowCalendar;