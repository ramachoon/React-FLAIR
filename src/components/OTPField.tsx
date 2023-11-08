import React, { FC, useEffect, useRef, useState } from "react";
import '../styles/otp.css'
interface Props {
   otp:any,
   setOtp:any,
   error:boolean
}
let currentOTPIndex:number = 0;
const OTPField: FC<Props> = ({otp
  ,setOtp, error}): JSX.Element => {
  const [activeOTPIndex, setactiveOTPIndex] = useState<number>(0)
  const handlerOnChange=({target}:React.ChangeEvent<HTMLInputElement>):void=>{
    const {value} = target;
    const newOTP:string[] = [...otp]
    newOTP[currentOTPIndex] = value.substring(value.length-1)
    if(!value){
        setactiveOTPIndex(currentOTPIndex-1)
    }else{
        setactiveOTPIndex(currentOTPIndex+1)
    };
setOtp(newOTP)
  }
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
inputRef.current?.focus()    
    
  }, [activeOTPIndex])
  
  const handlerKeyDown=({key}:React.KeyboardEvent<HTMLInputElement>,index:number)=>{
    currentOTPIndex=index
    if(key === 'Backspace'){
        setactiveOTPIndex(currentOTPIndex-1)
    }

  }
  return (
    <div className="flex justify-center items-center space-x-5">
      {otp.map((_:any, index:number) => {
        
        return (
          <React.Fragment key={index}>
            <input
            ref={index === activeOTPIndex ?inputRef:null}
              type="number"
              onKeyDown={(e)=>handlerKeyDown(e,index)}
              onChange={handlerOnChange}
              value={otp[index]}
              className={`md:w-[87px] md:h-[87px] w-[57px] h-[57px] xs:w-[87px] xs:h-[87px] sm:w-[87px] sm:h-[87px] lg:w-[87px]  lg:h-[87px] xl:w-[80px] xl:h-[80px] bg-[#F0F0F0]  text-[36px]  p-3 focus:border rounded-3xl  border-0 outline-none text-center font-[510]  spin-button-none  focus:border-[#1642C5]  focus:text-[#1B344F] text-[#1B344F] transition ${error && 'bg-[#F9E0E0] border border-[1px] border-[#E33B3B]'}`}
            />
            
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default OTPField;