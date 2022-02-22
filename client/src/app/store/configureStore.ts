import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import {createStore} from 'redux'
import { basketSlice } from '../../features/basket/basketSlice';
import counterReducer from '../../features/contact/counterReducer';
import {counterSlice} from '../../features/contact/CounterSlice'
import {catalogSlice} from '../../features/catalog/catalogSlice'
// export  const  configureStore=()=> {

//     return createStore(counterReducer)
// }

export const store=configureStore({
    reducer:{
        counter:counterSlice.reducer,
        basket:basketSlice.reducer,
        catalog:catalogSlice.reducer
    }
})

export type RootState= ReturnType<typeof store.getState>;
export type AppDispatch=typeof store.dispatch

export const useAppDispatch=()=>useDispatch<AppDispatch>()
export const useAppSelector:TypedUseSelectorHook<RootState>=useSelector

