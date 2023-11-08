import React from "react";
interface Props  {
  className?: string;
  isActive?: boolean;
  onClick?: () => void;
  week?:string[];
  data?:string;
  children:number;
  colors?:any
}
const Cell: React.FC<Props> = ({
  onClick,
  children,
  isActive = false,
  week,
  data,
  colors
}) => {
  return (
    <div className={`flex flex-col  justify-center items-center ${week?'':'pl-1'} `}>
        <div className={
        ` rounded-md  w-full  h-full  border   flex items-center  justify-center select-none transition-colors`
      } onClick={!isActive ? onClick : undefined} 
      style={{backgroundColor:`${children == 22? colors.btncolor :' '}`,borderColor:`${children == 22? colors.btncolor :'white '}`}}
      >
          <span style={{backgroundColor:`${children == 22 ?colors.btncolor:children <=21?'':children >=24?colors.btncolor:colors.cardcolor}`,color:`${children == 22 ?'white':children >=24?'white':colors.maintxtclr}`}} className={`  border-2  border-white tracking-tight   justify-center   items-center flex flex-col ${week?"":' w-[44px] h-[44px]'}  rounded-md`}>
          {children}
          {children == 22 && <div className="w-1 h-1  rounded-full tracking-tight bg-white"></div>}
          </span>
        </div>
        <span className={`mt-1 text-secondaryTxtColor  tracking-tight font-[400] font-[SF-Pro-Text-Regular]`}> {data}</span>   
      </div> 
  );
};

export default Cell;