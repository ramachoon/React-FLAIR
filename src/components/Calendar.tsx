import {
    differenceInDays,
    endOfMonth,
    setDate,
    startOfMonth,
  } from "date-fns";
  import Cell from "./Cell";
  import PLUS from '../assets/svgs/plus 2.svg'
  import React,{ useLayoutEffect, useState} from 'react'
  import {IColors} from '../screens/Theme'
  type Props = {
    value?: Date;
    onChange: (date: Date) => void;
    colors:IColors['colors']
  };
  
  const Calendar: React.FC<Props> = ({ value = new Date(), onChange,colors }) => {
    const weeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const startDate = startOfMonth(value);
    const endDate = endOfMonth(value);
    const numDays = differenceInDays(endDate, startDate) + 1;
    const handleClickDate = (index: number) => {
      const date = setDate(value, index);
      onChange(date);
    };
  
    const [DateRange,setDateRange]= useState<number>(11)
    const [week,setWeek]= useState<String[]>(weeks)
    const showMoreItems=()=>{
        setDateRange((preValue)=> preValue + 7)   
    }
    useLayoutEffect(()=>{
      let range:number= parseInt((numDays/7).toFixed())
      let newarry = []
      for(let i =0;i<range;i++){
        newarry.push(...weeks)
      }
      if(numDays == 31){
        setWeek([...newarry,...weeks.slice(0,3)])
      }
      else if(numDays == 30){
        setWeek([...newarry,...weeks.slice(0,2)])
      }
      else if(numDays == 28){
        setWeek([...newarry,...weeks.slice(0,2)])
      }
    },[])
    return (
      <div className="flex flex-col justify-center ">
        <div className="flex flex-wrap  items-center  text-center">
          {week.slice(0,DateRange).map((data:any, index:number) => {
            const date = 15+index + 1;
            const isCurrentDate = date === value.getDate();
            return (
              <div className="text-mainTextColor " key={index}>
                <Cell
                key={date}
                className='text-mainTextColor'
                isActive={isCurrentDate}
                onClick={() => handleClickDate(date)}
                data={data}
                colors={colors}
              >
                {date}
              </Cell>
              </div>
            );
        })}
        {weeks.length === 31?'':(
          <div className="flex flex-col gap-[1px] ">
          <button onClick={showMoreItems} className="flex justify-center items-center w-[44px] mt-1 h-[42px] border-[1px] border-lightgray  rounded-md">
                <img src={PLUS} className='w-5' alt="" />
              </button>
                <p className="text-secondaryTxtColor mt-2 tracking-tight">More</p>
          </div>
        )}
        
        </div>
            
      </div>
    );
  };
  

  export default Calendar;