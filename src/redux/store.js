import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import thunk from 'redux-thunk'
import userReducer from './userSlice'


const store = configureStore({
    reducer:{
        user: userReducer,

    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({serializableCheck:false})
})

export default store;