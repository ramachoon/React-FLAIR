import {configureStore} from '@reduxjs/toolkit'
import  specialPersonSlice from '../reducers/specialReducers'
import  loginReducers from '../reducers/loginReducers'
import  formDataReducers from '../reducers/formDataReducers'

export const store = configureStore({
    reducer:{
        specialCheck:specialPersonSlice,
        loginReducers,
        formDataReducers
    }
})