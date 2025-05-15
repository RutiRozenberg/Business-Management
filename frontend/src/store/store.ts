import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import serviceReducer from './features/services.slice';
import businessReducer from './features/business.slice';
import userReducer from './features/user.slice';
import adminReducer from './features/admin.slice';
import dateReducer from './features/date.slice'
import discussionsReducer from './features/discussions.slice';

export const store = configureStore({
    reducer:{
      service: serviceReducer,
      business: businessReducer,
      user: userReducer,
      admin: adminReducer,
      date: dateReducer,
      discussions: discussionsReducer,
    },
});

export const useAppDispatch: ()=> typeof store.dispatch= useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;