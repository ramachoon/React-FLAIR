
import {createSlice} from '@reduxjs/toolkit'


const initialState:any ={
    logindetails:{}
}
export const loginReducers = createSlice({
    name:'loginReducers',
    initialState,
    reducers:{
        loginUser:(state,action)=>{
            state.logindetails =action.payload
        },
    }

})
export  const {loginUser} = loginReducers.actions;
export default loginReducers.reducer;