import { DatePicker, Table } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { RangeValue } from 'rc-picker/lib/interface';
import React, { useEffect, useState } from 'react';
import RowCalendar from '../components/RowCalendar';
import { useAppDispatch, useAppSelector } from '../utils/hooks';
import { fetchEntries } from '../slices/entriesSlice';
import { fetchUsers } from '../slices/usersSlice';

const AuditPage: React.FC = () => {

    const dispatch = useAppDispatch();


    const users = useAppSelector(state => state.users.users);
    const usersStatus = useAppSelector(state => state.users.status);

    useEffect(() => {
        if(usersStatus === 'idle')
            dispatch(fetchUsers());
    }, [usersStatus, dispatch]);


    const entries = useAppSelector(state => state.entries.entries);
    const entriesStatus = useAppSelector(state => state.entries.status);

    useEffect(() => {
        if(entriesStatus === 'idle')
            dispatch(fetchEntries());
    }, [entriesStatus, dispatch]);

    
    const dataSource = users.map(user => {
        return {
            name: user.username,
            profession: user.professionTypeId,
            entries: entries.filter(entry => entry.userId === user.id)
        }
    })
    // const dataSource = [
    //     {
    //         name: "Josh Andrew",
    //         profession: "Developer",
    //         entries: [
    //             {
    //               "id": 1,
    //               "typeId": 1,
    //               "description": "Cleaning rooms",
    //               "hourCount": 1,
    //               "created": dayjs(),
    //               "updated": dayjs(),
    //             },
    //             {
    //               "id": 2,
    //               "typeId": 1,
    //               "description": "Cleaning rooms",
    //               "hourCount": 1,
    //               "created": dayjs(),
    //               "updated": dayjs(),
    //             }
    //           ]
    //     }
    //]

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