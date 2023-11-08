import React,{memo,useEffect} from "react";
import { ReactComponent as ArrowDown } from "../assets/svgs/arrodown.svg";
import { ReactComponent as ArrowUp } from "../assets/svgs/arroup.svg";

interface IPops{
    data:any;
    name:string;
    placeholder:string;
    select:string 
    setselected:any
}

 
const DropdownTick:React.FC<IPops> = ({placeholder,name,data,select, setselected}) => {
  const [Switch, setSwitch] = React.useState(false);
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

const onItemCilck = (option:string)=>{
  setselected(option)
}

  return (
    <div  className="relative">
     <div className="flex justify-end items-center pr-2" onClick={handlerInputClik}>
      <input type="text" placeholder={placeholder} value={select} name={name} disabled className="bg-cardColor  text-[14px] px-4 py-3 w-full text-mainTextColor  tracking-tight rounded-md"  />
      {Switch ? <ArrowUp /> : <ArrowDown />}
     </div>
    {Switch &&(
      <div
        id="dropdownDelay"
        className="z-10 absolute top-10 shadow-xl  bg-white divide-y divide-gray-100 rounded-lg  w-full dark:bg-gray-700"
      >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDelayButton"
          >
            {data.map((items:any,index:number)=>(
                      <li onClick={()=>onItemCilck(items)} className='font-[SF-Pro-Text-Regular]' key={index} value={items}>{items}</li>
                  ))}
        </ul>
      </div>
    )}

    </div>
  );
};

export default memo(DropdownTick);


