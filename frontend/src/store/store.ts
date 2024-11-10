import { configureStore } from "@reduxjs/toolkit";
import serviceReducer from './features/services.slice';
import businessReducer from './features/business.slice'
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
    reducer:{
      service: serviceReducer,
      business: businessReducer,
    },
})

export const useAppDispatch: ()=> typeof store.dispatch= useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;