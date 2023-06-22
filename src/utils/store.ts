import {configureStore} from "@reduxjs/toolkit";
import companiesReducer from "../slices/companiesSlice";
import usersReducer from "../slices/usersSlice";
import currentUserReducer from "../slices/currentUserSlice";
import entriesReducer from "../slices/entriesSlice";
import professionsReducer from "../slices/professionsSlice";
import entryTypesReducer from "../slices/entryTypesSlice";
import rolesReducer from "../slices/rolesSlice";
import professionTypeEntryTypesReducer from "../slices/professionTypeEntryTypesSlice";

const store = configureStore({
    reducer: {
        companies: companiesReducer,
        users: usersReducer,
        entries: entriesReducer,
        professions: professionsReducer,
        entryTypes: entryTypesReducer,
        roles: rolesReducer,
        professionTypeEntryTypes: professionTypeEntryTypesReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
