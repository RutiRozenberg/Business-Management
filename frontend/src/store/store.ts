import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import serviceReducer from './features/services.slice';
import businessReducer from './features/business.slice';
import userReducer from './features/user.slice';

export const store = configureStore({
    reducer:{
      service: serviceReducer,
      business: businessReducer,
      user: userReducer,
    },
})

export const useAppDispatch: ()=> typeof store.dispatch= useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;