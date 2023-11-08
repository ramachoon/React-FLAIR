
import {createSlice} from '@reduxjs/toolkit'


const initialState:any ={
    formData:{}
}
export const formDataReducers = createSlice({
    name:'formDataReducers',
    initialState,
    reducers:{
        formData:(state,action)=>{
            state.formData =action.payload
        },
    }

})
export  const {formData} = formDataReducers.actions;
export default formDataReducers.reducer;