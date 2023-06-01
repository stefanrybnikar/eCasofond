import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import NoPage from './pages/NoPage';
import LoginPage from './pages/LoginPage';
import WelcomePage from './pages/WelcomePage';

function App() {
  return (
    <div className="App">
        <Navbar />
        <BrowserRouter>
          <Routes>
            <Route index element={<WelcomePage />}/>
            <Route path="login" element={<LoginPage />}/>
            <Route path="*" element={<NoPage />}/>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
