import { configureStore } from '@reduxjs/toolkit'

import companiesReducer from "../slices/companiesSlice";
import usersReducer from "../slices/usersSlice";
import entriesReducer from "../slices/entriesSlice";
import professionsReducer from "../slices/professionsSlice";
import entryTypesReducer from "../slices/entryTypesSlice";
import rolesReducer from "../slices/rolesSlice";

const store = configureStore({
  reducer: {
    companies: companiesReducer,
    users: usersReducer,
    entries: entriesReducer,
    professions: professionsReducer,
    entryTypes: entryTypesReducer,
    roles: rolesReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;