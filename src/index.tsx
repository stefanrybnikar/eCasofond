import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './utils/store'
import client from './utils/apiUtils'

import { fetchCompanies } from './slices/companiesSlice';
import { fetchEntries } from './slices/entriesSlice';
import { fetchProfessions } from './slices/professionsSlice';
import { fetchUsers } from './slices/usersSlice';
import { fetchEntryTypes } from './slices/entryTypesSlice';
import { fetchRoles } from './slices/rolesSlice';
import { fetchProfessionTypeEntryTypes } from './slices/professionTypeEntryTypesSlice';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const load = async () => {

  await client.token() // sets up bearer token for other api calls
  
  // store.dispatch(fetchCompanies());
  // store.dispatch(fetchEntries());
  // store.dispatch(fetchProfessions());
  // store.dispatch(fetchUsers());
  // store.dispatch(fetchEntryTypes());
  // store.dispatch(fetchRoles());
  // store.dispatch(fetchProfessionTypeEntryTypes());
}

load()

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
