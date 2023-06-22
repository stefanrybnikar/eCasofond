import React from 'react';
import EmployeeCalendar from '../components/EmployeeCalendar';
import AddEntryButton from '../components/AddEntryButton';
import { useAppSelector } from '../utils/hooks';
import { Spin } from 'antd';

import {useAppSelector} from '../utils/hooks';
import {Spin} from 'antd';

const EmployeePage: React.FC = () => {
    const entriesStatus = useAppSelector(state => state.entries.status);

    return <>
        {
            entriesStatus === 'loading' ? 
            <Spin/>
            :
                <>
                <EmployeeCalendar/>
                <AddEntryButton/>
            </>
        }
    </>;
    }

export default EmployeePage;
