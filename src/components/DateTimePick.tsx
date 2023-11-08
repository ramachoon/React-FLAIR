import React, { useMemo } from "react";
import { format } from "date-fns";
import { useState } from "react";
import Calendar from "./Calendar";
import AvatarImg from '../assets/img/othersImg/Stroke.png'
import {ReactComponent as LeftArrow} from '../assets/svgs/Down_Arrow_3_.svg'
import {useDispatch,useSelector} from 'react-redux'
import {DateAndTime,Switch,Selects } from '../redux/reducers/specialReducers'
import { Step, StepIconProps, StepLabel, Stepper } from "@mui/material";
import {ReactComponent as Check} from "../assets/svgs/check.svg";
import Svg from "./Svg";
import Logo from '../assets/svgs/Logo.svg'

import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import styled from "@emotion/styled";

interface IProps {
  uuid?:string;
  colors?:any;
  getLogo?:any
}
const DateTimePick:React.FC<IProps> = ({uuid,colors,getLogo }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectDate, setSelectDate] = useState('');
const dispatch = useDispatch()
  const handleSetToday = () => setCurrentDate(new Date());
  let timeArry = [
    '2:30 PM',
    '2:45 PM',
    '2:30 PM',
    '3:15 PM',
    '3:30 PM',
    '3:45 PM',
    '4:00 PM',
    '5:15 PM',
    '5:30 PM',
    '5:45 PM',
    '6:00 PM',
    '2:30 PM',
    '2:30 PM',
    '2:30 PM',
    '2:30 PM',]
    
    const Validation = ()=>{
      if(selectDate != '' && format(currentDate, "d LLLL yyyy") !='1 January 2023'){
        return true
      }else{
        return false
      }
      
    }
  const handlerSubmit=()=>{
    if(Validation()){
      dispatch(Switch(true))
      dispatch(DateAndTime({date:currentDate ,time:selectDate}))
      dispatch(Selects(''))
    }

  }
const memoTemeArry = useMemo(
  () => ["Choose location", "Create appointment", "your details"],
  []
);
const [activeStep, setActiveStep] = React.useState(1);
const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 8px)",
    right: "calc(50% + 8px)",
    
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#1B344F",
      borderTopWidth:'4px'
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#1B344F",
      
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderTopWidth: 4,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled("div")<{ ownerState: { active?: boolean } }>(
  ({ theme, ownerState }) => ({
    display: "flex",
    height: 22,
    alignItems: "center",
    ...(ownerState.active && {
      color: "#784af4",
    }),
    "& .QontoStepIcon-completedIcon": {
      color: "#784af4",
      zIndex: 1,
      fontSize: 18,
    },
    "& .QontoStepIcon-circle": {
      width: 8,
      height: 8,
      borderRadius: "50%",
      backgroundColor: "currentColor",
    },
  })
);
function QontoStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <div className="bg-[#1B344F] w-[16px]  h-[16px]  flex justify-center items-center rounded-full">
          <Check/>
        </div>
      ) : active ? (
        <div className="bg-[#1B344F] w-[16px] h-[16px] p-1 rounded-full">
          <div className=" w-[8px] h-[8px] rounded-full bg-contentBackground z-20" />
        </div>
      ) : (
        <div className=" p-1 rounded-full z-20 flex justify-center items-center">
          <div className=" w-[8px] h-[8px] rounded-full bg-lightgray" />
        </div>
      )}
    </QontoStepIconRoot>
  );
}


  return (
    <div style={{backgroundColor:colors.contentbgclr}}className="md:px-8 lg:px-8 xl:px-8 px-0 py-4 rounded-3xl shadow-[0px_5.5px_16.5px_0px_#928C971A] border border-lightgray">
      <div  className='md:px-4 lg:px-4 xl:px-4 px-2 py-2'>
      <div className="mb-6">
        <img src={getLogo} className='w-36 mb-4' alt="" />
        <hr className="text-lightgray " />
      </div>
      <Stepper
          alternativeLabel
          className="lg:flex  xl:flex md:flex xl:w-[75%] lg:w-[75%] gap-4 sm:gap-0 md:gap-0 lg:gap-0 xl:gap-0 md:w-[75%] hidden mx-auto my-0 flex-wrap xl:overflow-visible md:overflow-visible lg:overflow-visible overflow-hidden justify-center items-center"
          activeStep={activeStep}
          connector={<QontoConnector />}
        >
          {memoTemeArry.map((label: any) => (
            <Step key={label} >
              <StepLabel
                StepIconComponent={QontoStepIcon}
              >
                <span style={{color:colors.boundryclr}} className="hidden sm:hidden tracking-tight md:block lg:block xl:block text-xs sm:text-xs md:text-xs text-mainTextColor font-[SF-Pro-Text-Medium]">
                  {label}
                </span>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      <div  className={` mt-4 flex justify-between items-center`}>
        <div className="flex justify-center gap-2 md:gap-4 lg:gap-4 xl:gap-4 items-center">
          <span style={{borderColor:colors.maintxtclr}} className=" border-[1px] px-2 py-2 border-lightgray cursor-pointer rounded-md" onClick={()=>(dispatch(Switch(true)),dispatch(Selects('')),dispatch(DateAndTime({date:'',time:''})))}>
            <LeftArrow/>
            </span>
          <span style={{color:colors.maintxtclr}}className="font-bold text-[14px] tracking-tight md:text-[14px] text-mainTextColor lg:text-[14px] xl:text-[16px] font-[SF-Pro-Text-Medium]">Select date and time</span>
        </div>
        <div className="flex items-center justify-center gap-1 md:gap-4 lg:gap-4 xl:gap-4">
          <p style={{color:colors.maintxtclr}}  className="font-[500] text-[13px] md:text-[14px] lg:text-[14px] tracking-tight text-mainTextColor xl:text-[14px]">
            {format(currentDate, " LLLL yyyy")}
          </p>
        <button style={{borderColor:colors.maintxtclr,color:colors.maintxtclr}} onClick={handleSetToday} className='border-[1px] tracking-tight font-[SF-Pro-Text-Regular] border-btnclr px-1 md:px-3 lg:px-3 xl:px-3 py-1 text-btnclr rounded-md text-sm'>Today</button>
        </div>
      </div>
      <div className="">
        <div className="xl:mt-0 mt-0  lg:mt-16 flex  flex-col items-center gap-4">
          <div className="flex flex-col items-center gap-4">
          </div>
         <div className="overflow-auto py-42 w-full">
         <Calendar value={currentDate} onChange={setCurrentDate} colors={colors}/>
         </div>
         <div className="my-2 flex justify-start w-full">
            <div className="flex gap-2 md:gap-4 lg:gap-4 xl:gap-4 items-center">
              <div className="">
              <img src={AvatarImg} className='w-full scale-125' alt="" />
              </div>
                <div className="">
                <h2 style={{color:colors.maintxtclr}} className=" text-[12px] font-[SF-Pro-Text-Medium] md:text-[14px] lg:text-[14px] tracking-tight xl:text-[14px] font-[700] text-mainTextColor ">Available times for Nick Benitez on 22/01/2022</h2>
                <p style={{color:colors.boundryclr}} className="text-gray-400 text-[12px] md:text-[14px] font-[SF-Pro-Text-Regular] lg:text-[14px] tracking-tight xl:text-[14px] font-[700] text-secondaryTxtColor ">Hair Stylist</p>
                </div>
            </div>
         </div>
         <div className="">
          <div className="flex gap-2 md:gap-4 lg:gap-4 xl:gap-4 flex-wrap">
            {timeArry.map((items,index)=>(
            <span key={index} style={{backgroundColor:index ==0?colors.btncolor:colors.cardcolor,color:index ==0?'white':colors.maintxtclr}} onClick={()=>setSelectDate(items)} className={` cursor-pointer ${selectDate ===items?'bg-btnclr text-btntxtclr':'bg-cardColor text-mainTextColor '}   font-[510] xl:px-2 px-2 w-[30%] xs:w-[30%] sm:w-[30%] lg:w-[21%] xl:w-[17%] md:w-[30%] text-center lg:px-2 py-2 rounded-md text-[14px] md:text-[14px] lg:text-[14px] xl:text-[14px] `}>{items}</span>
            ))}
          </div>
          <div className="">
            {uuid?(
               <div className="w-full mt-4">
            <button onClick={handlerSubmit} className="rounded-md py-2 bg-foreground text-white w-full font-[SF-Pro-Text-Bold]">Continue</button>
              </div> 
            ):''}
          </div>
         </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default DateTimePick;
