import React,{memo,useEffect, useLayoutEffect} from "react";
import PhoneInput, { getCountries, getCountryCallingCode,  isValidPhoneNumber } from 'react-phone-number-input/input'
import en from 'react-phone-number-input/locale/en.json'
import {Service} from '../components/AddForm'
import Tick from "../assets/svgs/bluetick.svg";
import { ReactComponent as ArrowDown } from "../assets/svgs/arrodown.svg";
import { ReactComponent as ArrowUp } from "../assets/svgs/arroup.svg";


const Number = ({serviceList,index,setServiceList,getNumber, error}:any) => {
  const [Switch, setSwitch] = React.useState(false);
  const [select, setselected] = React.useState({code:'1', number:'', realNum:'', image:''});
  const [defaultCountry, setDefaultCountry] = React.useState("US");
  const [NumberCode, setNumberCode] = React.useState<any>([]);
  useEffect(()=>{
    const handler = ()=>setSwitch(false)
    window.addEventListener('click',handler)
    return ()=>{
      window.removeEventListener('click',handler)
    }
  })
const handlerInputClik = (e:any)=>{
  e.stopPropagation()
  setSwitch(!Switch)
}

const onItemCilck = (option:any)=>{
  setDefaultCountry(option.country);
  setselected({...select,code:option.code, image:option.image});
}

React.useEffect(() => {
    if(getNumber){
        getNumber&&getNumber(`${select.number}`)
    }
    if(serviceList){
        const list: Service["service"] | any = [...serviceList];
        list[index]['phone'] = `${select.number}`
        setServiceList(list);
    }
}, [select.code,select.number])

useLayoutEffect(()=>{
  let newData = getCountries().map((country)=>{return {image:require(`../assets/flags/${country}.svg`),code:getCountryCallingCode(country),name:en[country], country}})
  let num = newData.sort((a, b) => a.name.localeCompare(b.name));
  let US = newData.filter(item =>item.name === "United States")[0];
  setselected({...select,image: US.image})
  setNumberCode(num)
},[])
  return (
    <div  className="relative">
     <div className="w-full  pr-2" >
      <div className={`w-full bg-cardColor pl-4 flex rounded-3xl ${Switch&& 'border border-btnclr'} ${error && '!bg-[#F9E0E0] !border-[#E33B3B] border-[1px]'}`}>
            <span onClick={handlerInputClik} className="mr-[4px] flex items-center py-3 cursor-pointer tracking-tight text-secondaryTxtColor">
              <img src={select.image} className='rounded-[4px] w-[24px] h-[16px] mr-[8px]' alt="" />
              {Switch ?<ArrowUp /> : <ArrowDown />}
              <span className="nowrap ml-[5px]">+ {select.code}</span>
            </span>
            <PhoneInput
              country={defaultCountry as any}
              className={`text-[14px] py-3 rounded-r-3xl text-mainTextColor placeholder:text-secondaryTxtColor bg-cardColor tracking-tight ${error && '!bg-[#F9E0E0]'}`}
              value={select.number}
              onChange={(e:any) => setselected({...select, number:e})}
              placeholder={`(000) 000-0000`}
              />
            </div>
     </div>
    {Switch &&(
      <div
        id="dropdownDelay"
        className="z-10 absolute top-15 shadow-[0px_5.3333330154418945px_15.999999046325684px_0px_rgba(146,140,151,0.25)]  bg-white divide-y divide-gray-100 rounded-3xl  w-full dark:bg-gray-700"
      >
          <ul
            className="py-3 text-sm text-gray-700 dark:text-gray-200 h-44 overflow-auto scrollbar rounded-3xl" 
            aria-labelledby="dropdownDelayButton"
          >
            {NumberCode.map((country:any, index:number) => {
      return <li onClick={()=>onItemCilck(country)} className="px-5  py-1 cursor-pointer flex justify-between gap-2" key={index} value={country.code}>
            <div className="flex gap-2">
            <img src={country.image} className='w-6 h-6' alt="" />
        <span className="w-10 text-[14px] font-[SF-Pro-Text-Regular] text-secondaryTxtColor font-[400]">+{country.code}</span>
         <span className="text-secondaryTxtColor opacity-[0.7] text-[14px] tracking-[-0.01em] font-[SF-Pro-Text-Regular] font-[400]">{country.name}</span> 
            </div>
         {defaultCountry==country.country&&<img src={Tick} className="w-4 h-4" alt="" />}
      </li>
})}
        </ul>
      </div>
    )}

    </div>
  );
};

export default memo(Number)


