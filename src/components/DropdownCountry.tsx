import React,{memo,useEffect} from "react";
import { ReactComponent as ArrowDown } from "../assets/svgs/arrodown.svg";
import { ReactComponent as ArrowUp } from "../assets/svgs/arroup.svg";

interface IPops{
    name:string;
    placeholder:string;
    children:any;
    select:string;
    error?:boolean;
}

 
const DropdownCountry:React.FC<IPops> = ({placeholder,name,children,select,error}) => {
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
  if(children.length !=0){
    setSwitch(!Switch)
  }
}

  return (
    <div  className="relative">
     <div className={`${Switch&&'border border-foreground'} flex justify-end items-center pr-5   rounded-3xl bg-cardColor`} onClick={handlerInputClik}>
      <input type="text" placeholder={placeholder} value={select} name={name} disabled className="placeholder:text-secondaryTxtColor placeholder:opacity-[0.7] leading-[20px] tracking-[-0.01em] bg-cardColor font-[SF-Pro-Text-Medium] text-[14px] px-4 py-3 w-full text-mainTextColor  rounded-3xl"  />
      {Switch ? <ArrowUp /> : <ArrowDown />}
     </div>
    {Switch &&(
      <div
        id="dropdownDelay"
        className="z-10 absolute top-12 shadow-[0px_5.3333330154418945px_15.999999046325684px_0px_#928C9740]  bg-white divide-y divide-gray-100 rounded-3xl  w-full dark:bg-gray-700"
      >
          <ul
            className="py-2 text-sm text-gray-700 h-[16rem] overflow-auto scrollbar dark:text-gray-200"
            aria-labelledby="dropdownDelayButton"
          >
         {children}
        </ul>
      </div>
    )}

    </div>
  );
};

export default memo(DropdownCountry);


