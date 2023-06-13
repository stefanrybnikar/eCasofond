import React, { useEffect } from 'react';
import EmployeesTable from '../components/EmployeesTable';
import { useAppDispatch, useAppSelector } from '../utils/hooks';
import { addNewUser, deleteUser, fetchUsers, updateUser } from '../slices/usersSlice';

const EmployeesPage: React.FC = () => {

    const dispatch = useAppDispatch(); //vytahnes si funkci dispatch ktera se pak pouziva na volani redux funkci

    const users = useAppSelector(state => state.users.users); //useAppSelector se pouziva pro tahani dat ze store - state je celej store => store.users je to co chces aby se ti vratilo

    const usersStatus = useAppSelector(state => state.users.status)// u kazdeho dilu je pormenna state - urcije zda li jsou data uz nactena 'completed' // nejsou nactena 'idle' // nacitaji se 'loading' // nepovedla se nacist 'failed'
    const error = useAppSelector(state => state.users.error) // vraci error pokud se data nenacetla

    useEffect(() => {
        if (usersStatus === 'idle') {
            dispatch(fetchUsers()); //pokud data nejosu jeste nactena zavola funkci fetchUsers
        }

        //vzpisu pro priklad ukazky
        console.log(users);
      }, [usersStatus, dispatch])

    return <>
        <button onClick={() => {dispatch(updateUser({
  "id": 210,
  "displayName": "sssstring",
  "email": "string",
  "username": "string",
  "oldPassword": "string",
  "password": "string"
}))}}>a</button>
        <button onClick={async() => {
            console.log(await fetch("http://localhost:8080/user/delete/16",
                {
                    method: 'DELETE',
                    mode: 'cors',
                }))
        }}>a</button>

        <EmployeesTable/>
    </>
};

export default EmployeesPage;