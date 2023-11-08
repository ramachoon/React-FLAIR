import React from "react";
import Svg from "./Svg";
import { ReactComponent as Wifi } from '../assets/svgs/Wifi.svg'
import { ReactComponent as Battery } from '../assets/svgs/Battery.svg'
import { ReactComponent as SettingIcon } from '../assets/svgs/settingicon.svg'
import { ReactComponent as PosLogo } from '../assets/svgs/PosLogo.svg'
import { ReactComponent as PosArrowIosDownload } from '../assets/svgs/PosArrowIosDownload.svg'
import QRCodePos from '../assets/svgs/QRCodePos.svg'
// import { ReactComponent as QRCodePos } from '../assets/svgs/QRCodePos.svg'
import { ReactComponent as AppStore } from '../assets/svgs/AppStore.svg'
import { ReactComponent as GooglePlay } from '../assets/svgs/GooglePlay.svg'


interface IProps {
  uuid?:string;
  colors?:any;
  getLogo?:any
}
const DateTimePickPos:React.FC<IProps> = ({uuid,colors,getLogo }) => {

  return (
    <div style={{backgroundColor:colors.contentbgclr}} className="rounded-3xl shadow-[0px_5.5px_16.5px_0px_#928C971A] border border-lightgray">
      <div style={{backgroundColor:colors.cardcolor}}  className="m-[20px] h-full">
        <div style={{color:colors.maintxtclr}} className="flex justify-between px-[6px]" >
          <div className="text-[9px]">19:02 Friday March 13</div>
          <div className="text-[9px] flex items-center">
            <Wifi className="mt-[2px]" /> 100% <Battery className="mt-[2px]" />
          </div>
        </div>
        <div style={{borderColor:colors.accentclr}} className={`w-[30px] h-[30px] mt-[10px] border-[1px] rounded-[5px] flex justify-center items-center ml-auto mr-[30px]`}>
          <Svg componentName={SettingIcon} color={colors.boundryclr} width="15px" height="15px" />
        </div>
        <div className="text-center mt-[60px]">
          <PosLogo className="mx-auto" />
          <h2 className="mt-[20px] font-bold text-[30px]">Welcome to the <span style={{color: colors.btncolor}}>FLAIR POS</span></h2>            
        </div>
        <div className="mt-[10px] ml-auto mr-[40px] text-[10px] w-[130px] text-center">
          <span style={{color:colors.boundryclr}} className="mb-[10px]">We have our own App</span>
          <PosArrowIosDownload className="mx-auto" />
        </div>
        <div className="mt-[30px] ml-auto mr-[40px] w-[120px] relative h-[48.54px]">
          <AppStore className="absolute top-0 left-0" />
          <GooglePlay className="absolute bottom-0 left-0"/>
          <img src={QRCodePos} className="absolute bottom-0 right-0"/>
        </div>
        <div className="h-[15px] flex justify-center items-center">
          <div className="border-[1.5px] rounded-[50px] p-0 w-[115px]"></div>
        </div>
      </div>
    </div>
  );
};

export default DateTimePickPos;
