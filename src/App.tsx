import React, {useState} from 'react';
import './App.css';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {Divider, Input, Radio} from 'antd';
import Navbar from './components/Navbar';
import NoPage from './pages/NoPage';
import LoginPage from './pages/LoginPage';
import WelcomePage from './pages/WelcomePage';
import EmployeePage from './pages/EmployeePage';
import EmployeesPage from './pages/EmployeesPage';
import AuditPage from './pages/AuditPage';
import ActivitiesPage from './pages/ActivitiesPage';
import AuditDetailPage from './pages/AuditDetailPage';
import AuditorPage from './pages/AuditorPage';
import CompanyPage from './pages/CompanyPage';
import ProfessionsPage from './pages/ProfessionsPage';

function App() {

    const [user, setUser] = useState('');

    return (
        <div className="App">
            <BrowserRouter>

                <Navbar/>
                <Radio.Group options={[
                    {label: 'Admin', value: 'Admin'},
                    {label: 'Auditor', value: 'Auditor'},
                    {label: 'Employee', value: 'Employee'},
                ]}
                             optionType='button'
                             value={user}
                             onChange={e => setUser(e.target.value)}
                />  
                <div style={{width: 200}}>current user[id]:<Input width={100} placeholder='current user userId'/></div>
                <Divider/>

                <Routes>
                    <Route path="welcome" element={<WelcomePage/>}/>

                    {
                        user === "" && <Route path="login" element={<LoginPage/>}/>
                    }

                    {
                        user === "Admin" && <>
                            <Route path='/' element={<CompanyPage/>}>
                                <Route path="/" element={<Navigate to="employees"/>}/>

                                <Route path='employees' element={<EmployeesPage/>}/>
                                <Route path='audit' element={<AuditPage/>}/>
                                <Route path='audit/employee/:employeeId' element={<AuditDetailPage/>}/>
                                <Route path='activities' element={<ActivitiesPage/>}/>
                                <Route path='professions' element={<ProfessionsPage/>}/>
                                <Route path="*" element={<NoPage/>}/>
                            </Route>
                        </>
                    }
                    {
                        user === "Auditor" && <>
                            <Route path='/' element={<AuditorPage/>}>
                                <Route path='company/:companyId' element={<CompanyPage/>}>

                                    <Route path='employees' element={<EmployeesPage/>}/>
                                    <Route path='audit' element={<AuditPage/>}/>
                                    <Route path='audit/employee/:employeeId' element={<AuditDetailPage/>}/>
                                    <Route path='activities' element={<ActivitiesPage/>}/>
                                    <Route path='professions' element={<ProfessionsPage/>}/>
                                    <Route path="*" element={<NoPage/>}/>
                                </Route>
                            </Route>
                        </>
                    }
                    {
                        user === "Employee" && <>
                            <Route path='/' element={<EmployeePage/>}/>
                        </>
                    }

                    <Route path="*" element={<NoPage/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
