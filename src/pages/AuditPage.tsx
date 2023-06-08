import { DatePicker, Table } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { RangeValue } from 'rc-picker/lib/interface';
import React, { useState } from 'react';
import RowCalendar from '../components/RowCalendar';

const AuditPage: React.FC = () => {

    const dataSource = [
        {
            name: "Josh Andrew",
            profession: "Developer",
            entries: [
                {
                  "id": 1,
                  "typeId": 1,
                  "description": "Cleaning rooms",
                  "hourCount": 1,
                  "created": dayjs(),
                  "updated": dayjs(),
                },
                {
                  "id": 2,
                  "typeId": 1,
                  "description": "Cleaning rooms",
                  "hourCount": 1,
                  "created": dayjs(),
                  "updated": dayjs(),
                }
              ]
        }
    ]

    const [activeData, setActiveData] = useState(dataSource)
    const [from, setFrom] = useState<Dayjs|null>();
    const [to, setTo] = useState<Dayjs|null>();

    const handleRangeChange = (data: RangeValue<Dayjs>) => {
        setFrom(data?.[0]);
        setTo(data?.[1]);
    };

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Profession",
            dataIndex: "profession",
            key: "profession",
        },
        {
            title: <DatePicker.RangePicker onChange={handleRangeChange}/>,
            dataIndex: "entries",
            key: "entries",
            render: (data: any) => {
                console.log(data)
                return <div style={{ width: "100%",display: "flex", flexDirection: "row-reverse" }}>
                    {from && to && <RowCalendar entries={data} from={from} to={to}/>}
            </div>
            }
        }
    ]

    return <>
        <Table dataSource={dataSource} columns={columns} />
    </>;
};

export default AuditPage;