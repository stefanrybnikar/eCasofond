import React from 'react';
import EmployeesTable from '../components/EmployeesTable';
import { useAppDispatch } from '../utils/hooks';
import { fetchUsers } from '../slices/usersSlice';

const EmployeesPage: React.FC = () => {

    const dispatch = useAppDispatch();

    dispatch(fetchUsers())

    return <>
        <EmployeesTable/>
    </>
};

export default EmployeesPage;