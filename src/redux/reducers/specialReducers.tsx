import {createSlice} from '@reduxjs/toolkit'
import TwoPerson from "../../assets/svgs/twoPersonsolid.svg";
import Cut from "../../assets/svgs/cut.svg";
import Calendar from "../../assets/svgs/calendar.svg";

const initialState:any = {
    check:false,
    data:{},
    personAdd:{},
    icon:[TwoPerson,Calendar,Cut],
    switch:false,
    select:'',
    setDate:{date:'',time:''},
    services:{},
    cartData:[]
}
export const specialPersonSlice = createSlice({
    name:'specialPersonReducer',
    initialState,
    reducers:{
        CheckingCard:(state,action)=>{
            state.check =action.payload;
        },
        detailPerson:(state,action)=>{
            state.data =action.payload
        },
        PersonAdd:(state,action)=>{
            state.personAdd =action.payload
        },
        SetIcon:(state,action)=>{
            state.icon =action.payload
        },
        Switch:(state,action)=>{
            state.switch =action.payload
        },
        Selects:(state,action)=>{
            state.select =action.payload
        },
        DateAndTime:(state,action)=>{
            state.setDate = action.payload
        },
        ServicesData:(state,action)=>{
            state.services = action.payload
        },
        cartData:(state,action)=>{
            state.cartData =action.payload
        },
        
        
    }
})

export  const {DateAndTime,CheckingCard,cartData,ServicesData,detailPerson,PersonAdd,Switch,Selects} = specialPersonSlice.actions;
export default specialPersonSlice.reducer;