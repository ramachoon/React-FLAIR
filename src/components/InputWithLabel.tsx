import React from 'react'
import { JsxElement } from 'typescript';
interface IPops{
    handlerchange:Function;
    value:string;
    name:string;
    placeholder:string;
    label:string;
    type?:string;
    index?:number;
    error?:boolean;
}
const InputWithLabel:React.FC<IPops> = ({error,handlerchange,value,name,placeholder,label,type,index}):JSX.Element => {
  return (
    <div className={` flex flex-col  w-full h-full rounded-3xl`}>

            <label htmlFor="" className={`${error&&'text-red-600'} leading-[20px]  text-darkblue tracking-[-0.01em] font-[510] font-[SF-Pro-Text-Medium] text-[14px] mb-2`}>
              {label}
            </label>
            <input
              className={`${error&&'border border-red-600 placeholder:text-red-600 !bg-[#F9E0E0]'} placeholder:text-secondaryTxtColor placeholder:opacity-[0.7] leading-[20px] tracking-[-0.01em] font-[400] bg-cardColor  text-[14px] px-4 py-3 text-darkblue   rounded-3xl`}
              type={type||'text'}
              name={name}
              value={value}
              onChange={(e)=>handlerchange(e, index)}
              placeholder={placeholder}
              />
          </div>
  )
}

export default InputWithLabel