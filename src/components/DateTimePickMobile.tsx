import React, { useMemo } from "react";
import { format } from "date-fns";
import { useState } from "react";
import Calendar from "./Calendar";
import AvatarImg from '../assets/img/othersImg/Stroke.png'
import { ReactComponent as LeftArrow } from '../assets/svgs/Down_Arrow_3_.svg'
import { ReactComponent as Cellular_Connection } from '../assets/svgs/Cellular_Connection.svg'
import { ReactComponent as Wifi } from '../assets/svgs/Wifi.svg'
import { ReactComponent as Battery } from '../assets/svgs/Battery.svg'
import { ReactComponent as MobileAvatar1 } from '../assets/svgs/MobileAvatar1.svg'
import AvatarSvg from '../assets/svgs/AvatarSvg.svg'
import AvatarSvg2 from '../assets/svgs/AvatarSvg2.svg'
import AvatarSvg3 from '../assets/svgs/AvatarSvg3.svg'
import { ReactComponent as MobileLogo } from '../assets/svgs/MobileLogo.svg'
import { ReactComponent as Notification } from '../assets/svgs/Notification.svg'
import { ReactComponent as MobileLoyalty } from '../assets/svgs/MobileLoyalty.svg'
import { ReactComponent as MobileHome } from "../assets/svgs/MobileHome.svg";
import { ReactComponent as MobileAddCircle } from "../assets/svgs/MobileAddCircle.svg";
import { ReactComponent as MobileGift } from "../assets/svgs/MobileGift.svg";
import { ReactComponent as MobileProfileCircle } from "../assets/svgs/MobileProfileCircle.svg";
import { ReactComponent as MobileClose } from "../assets/svgs/MobileClose.svg";
import { ReactComponent as MobileDownArrow } from "../assets/svgs/MobileDownArrow.svg";
import { ReactComponent as MobileTimer } from "../assets/svgs/MobileTimer.svg";
import Svg from "./Svg";

interface IProps {
  uuid?: string;
  colors?: any;
  getLogo?: any
}
const DateTimePickMobile: React.FC<IProps> = ({ uuid, colors, getLogo }) => {

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 2xl:w-[600px] gap-x-[20px]">
      <div style={{ backgroundColor: colors.contentbgclr }} className="md:px-[8px] lg:px-[8px] xl:px-[8px] px-[8px] py-[18px] rounded-[16px] shadow-[0px_5.5px_16.5px_0px_#928C971A] border-[1.8px] border-lightgray">
        <div className=''>
          <div className="shadow-[0px_20px_10px_-5px_#928C971A] z-10">
            <div className="flex justify-between ml-[12px] mr-[8px] py-[6px]">
              <div className="text-[12px]" style={{ color: colors.maintxtclr }} >9:41</div>
              <div className="flex gap-x-[2px]">
                <Cellular_Connection />
                <Wifi />
                <Battery />
              </div>
            </div>
            <div className="flex p-[10px] justify-between items-center">
              <MobileAvatar1 />
              <MobileLogo />
              <span style={{ backgroundColor: colors.accentclr }} className="p-[6px] rounded-md"><Notification /></span>
              
            </div>
            <hr className="text-lightgray" />
          </div>
          <div style={{ backgroundColor: `rgba(${parseInt(colors.cardcolor.slice(1, 3), 16)}, ${parseInt(colors.cardcolor.slice(3, 5), 16)}, ${parseInt(colors.cardcolor.slice(5, 7), 16)}, 0.25)` }}>
            <div className="w-full overflow-x-hidden pb-[20px]">
              <div className="w-[175%] flex">
                <div style={{ backgroundColor: colors.contentbgclr }} className="shadow-[0px_5.5px_16.5px_0px_#928C971A] rounded-lg w-[80%] ml-[14px]">
                  <div className="px-[8px] font-[SF-Pro-Text-Medium] pb-[6px] border-b-[1px] border-[#E3E7EF] flex justify-between">
                    <span className="text-[8px] text-[#8C9CBB]">10 Jan 2022</span>
                    <span className="text-[8px] text-[#8C9CBB]">10:30-11:30 AM</span>
                  </div>
                  <div className="border-b-[1px] flex justify-between px-[10xp] py-[5px] border-[#E3E7EF]">
                    <div className="flex px-[10px] items-center">
                      <img src={AvatarImg} className='w-[30px] h-[30px] rounded-full' alt="" />
                      <div className="py-[3px] ml-[10px]">
                        <p style={{ color: colors.maintxtclr }} className="nowrap font-bold text-[10px] pb-[2px] font-[SF-Pro-Text-Medium]">Nick Benitez</p>
                        <p style={{ color: colors.maintxtclr }} className="text-[8px] pt-[2px] font-[SF-Pro-Text-Medium]">Hair Trimming +1</p>
                      </div>
                    </div>
                    <div className="text-[12px] font-[SF-Pro-Text-Medium] items-center flex font-bold mr-[10px]">$56</div>
                  </div>
                  <div className="flex justify-between px-[30%] py-[2px]">
                    <div style={{ color: colors.btncolor }} className="text-[9px] !text-[#1642C5]">Modify</div>
                    <div style={{ color: colors.btncolor }} className="text-[9px] !text-[#1642C5]">Cancel</div>
                  </div>
                </div>
                <div style={{ backgroundColor: colors.contentbgclr }} className="shadow-[0px_5.5px_16.5px_0px_#928C971A] rounded-lg w-[80%] ml-[14px]">
                  <div className="px-[8px] font-[SF-Pro-Text-Medium] pb-[6px] border-b-[1px] border-[#E3E7EF] flex justify-between">
                    <span className="text-[8px] text-[#8C9CBB]">10 Jan 2022</span>
                    <span className="text-[8px] text-[#8C9CBB]">10:30-11:30 AM</span>
                  </div>
                  <div className="border-b-[1px] flex justify-between px-[10xp] py-[5px] border-[#E3E7EF]">
                    <div className="flex px-[10px] items-center">
                      <img src={AvatarImg} className='w-[30px] h-[30px] rounded-full' alt="" />
                      <div className="py-[3px] ml-[10px]">
                        <p style={{ color: colors.maintxtclr }} className="nowrap font-bold text-[10px] pb-[2px] font-[SF-Pro-Text-Medium]">Nick Benitez</p>
                        <p style={{ color: colors.maintxtclr }} className="text-[8px] pt-[2px] font-[SF-Pro-Text-Medium]">Hair Trimming +1</p>
                      </div>
                    </div>
                    <div className="text-[12px] font-[SF-Pro-Text-Medium] items-center flex font-bold mr-[10px]">$56</div>
                  </div>
                  <div className="flex justify-between px-[30%] py-[2px]">
                    <div style={{ color: colors.btncolor }} className="text-[9px] !text-[#1642C5]">Modify</div>
                    <div style={{ color: colors.btncolor }} className="text-[9px] !text-[#1642C5]">Cancel</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="ml-[14px]">
              <div className="flex justify-between mr-[14px]">
                <div className="font-bold text-[11px] py-[1px]">Our Professionals</div>
                <div style={{ color: colors.maintxtclr }} className="!text-[#1642C5] text-[11px] py-[1px]">View all</div>
              </div>
              <div className="w-full overflow-x-hidden pb-[20px]">
                <div className="w-[140%] rounded-[12px] flex">
                  <div className="w-[70px] mr-[10px]" style={{ backgroundColor: colors.contentbgclr }}>
                    <img src={AvatarSvg} className='w-[70px] h-[70px]' alt="" />
                    <div className="py-[3px] pl-[10px]">
                      <p style={{ color: colors.maintxtclr }} className="whitespace-nowrap font-bold text-[8px] pb-[2px] font-[SF-Pro-Text-Medium]">Nick Benitez</p>
                      <p style={{ color: colors.boundryclr }} className="text-[7px] pt-[2px] font-[SF-Pro-Text-Medium]">Hair Stylist</p>
                    </div>
                  </div>
                  <div className="w-[70px] mr-[10px]" style={{ backgroundColor: colors.contentbgclr }}>
                    <img src={AvatarSvg2} className='w-[70px] h-[70px]' alt="" />
                    <div className="py-[3px] pl-[10px]">
                      <p style={{ color: colors.maintxtclr }} className="whitespace-nowrap font-bold text-[8px] pb-[2px] font-[SF-Pro-Text-Medium]">Jay Alfonso</p>
                      <p style={{ color: colors.boundryclr }} className="text-[7px] pt-[2px] font-[SF-Pro-Text-Medium]">Barber</p>
                    </div>
                  </div>
                  <div className="w-[70px]" style={{ backgroundColor: colors.contentbgclr }}>
                    <img src={AvatarSvg3} className='w-[70px] h-[70px]' alt="" />
                    <div className="py-[3px] pl-[10px]">
                      <p style={{ color: colors.maintxtclr }} className="whitespace-nowrap font-bold text-[8px] pb-[2px] font-[SF-Pro-Text-Medium]">Livia Calzoni</p>
                      <p style={{ color: colors.boundryclr }} className="text-[7px] pt-[2px] font-[SF-Pro-Text-Medium]">Makeup Artist</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="ml-[13px]">
              <div className="font-bold text-[13px] py-[10px]" style={{color: colors.maintxtclr}}>My Loyalty</div>
              <div className="shadow-[0px_5.5px_16.5px_0px_#928C971A] mr-[13px] rounded-[11px] py-[11px] px-[12px] flex mb-[10px]" style={{ backgroundColor: colors.contentbgclr }}>
                <div className="rounded-[5px] h-[26px] w-[26px] flex justify-center items-center" >
                  <Svg componentName={MobileLoyalty} color={colors.btncolor} width="22px" height="22px" />
                </div>
                <div className="ml-[10px] block">
                  <p style={{ color: colors.boundryclr }} className="text-[10px] pt-[2px] font-[SF-Pro-Text-Medium]">Available points</p>
                  <p style={{ color: colors.maintxtclr }} className="whitespace-nowrap font-bold text-[9px] pb-[2px] font-[SF-Pro-Text-Medium]"><b className="text-[11px]">800</b> points</p>
                </div>
              </div>
              <div className="flex justify-between mr-[13px] mb-[5px]">
                <div className="text-[10px] py-[1px]">Refer a friend</div>
                <div style={{ color: colors.maintxtclr }} className="!text-[#1642C5] text-[11px] py-[1px]">Share</div>
              </div>
              <div className="border-dashed rounded-[11px] py-[9px] text-[10px] text-center border-[#98A7C3] border-[0.56px]" style={{backgroundColor: colors.accentclr}}>
                R4H9JGH9JQ
              </div>
            </div>
            <div className="rounded-t-[13px]"  style={{ backgroundColor: colors.contentbgclr }}>
              <div className="grid grid-cols-4 gap-x-0 h-[22.4px] mt-[5px]">
                <div className="h-full flex justify-center items-center">
                  <Svg componentName={MobileHome} color={colors.btncolor} width="18px" height="18px" />
                </div>
                <div className="h-full flex justify-center items-center">
                  <Svg componentName={MobileAddCircle} color={colors.boundryclr} width="18px" height="18px" />
                </div>
                <div className="h-full flex justify-center items-center">
                  <Svg componentName={MobileGift} color={colors.boundryclr} width="18px" height="18px" />
                </div>
                <div className="h-full flex justify-center items-center">
                  <Svg componentName={MobileProfileCircle} color={colors.boundryclr} width="18px" height="18px" />
                </div>
              </div>
              <div className="h-[25px] flex justify-center items-center">
                <div className="border-[2px] rounded-[50px] p-0 w-[75px]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ backgroundColor: colors.contentbgclr }} className="md:px-[8px] lg:px-[8px] xl:px-[8px] px-[8px] py-[18px] rounded-[16px] shadow-[0px_5.5px_16.5px_0px_#928C971A] border-[1.8px] border-lightgray">
        <div className=''>
          <div className="z-10">
            <div className="flex justify-between ml-[12px] mr-[8px] py-[6px]">
              <div className="text-[12px]" style={{ color: colors.maintxtclr }} >9:41</div>
              <div className="flex gap-x-[2px]">
                <Cellular_Connection />
                <Wifi />
                <Battery />
              </div>
            </div>
          </div>
          <div style={{ color: colors.maintxtclr }} className="px-[10px] font-[SF-Pro-Text-Medium] mt-[23px] text-[18px] font-bold">
              Book your next appointment <br/>
              <span className="text-[#1642C5]">at FLAIR Studios</span>
            </div>
          <div style={{ backgroundColor: `rgba(${parseInt(colors.cardcolor.slice(1, 3), 16)}, ${parseInt(colors.cardcolor.slice(3, 5), 16)}, ${parseInt(colors.cardcolor.slice(5, 7), 16)}, 0.25)` }}>
            <div className="py-[15px] px-[10px]">
              <div style={{ backgroundColor: colors.contentbgclr}} className="items-center shadow-[0px_5.5px_16.5px_0px_#928C971A] p-[10px] rounded-[12px] mb-[7px] flex justify-between">
                <div className="flex items-center" >
                  <img src={AvatarImg} className='w-[36px] h-[36px] rounded-[7px]' alt="avatar" />
                  <div className="py-[3px] ml-[10px]">
                    <p style={{ color: colors.maintxtclr }} className="nowrap font-bold text-[10px] pb-[2px] font-[SF-Pro-Text-Medium]">Nick Benitez</p>
                    <p style={{ color: colors.boundryclr }} className="text-[8px] pt-[2px] font-[SF-Pro-Text-Medium]">Hair Stylist</p>
                  </div>                  
                </div>
                <Svg componentName={MobileClose} color={colors.boundryclr} width="15px" height="15px" />
              </div>
              <div style={{ backgroundColor: colors.contentbgclr}} className="items-center shadow-[0px_5.5px_16.5px_0px_#928C971A] p-[10px] rounded-[12px] mb-[7px] flex justify-between">
                <div className="flex items-center" >
                  <div className='border-[#E9E9E9] py-[2px] border-[0.7px] w-[36px] h-[36px] rounded-[7px] text-center'>
                    <p className="text-[7px] text-[#1642C5]">FRI</p>
                    <p className="text-[16px]" style={{color: colors.maintxtclr}}>04</p>
                  </div>
                  <div className="py-[3px] ml-[10px]">
                    <p style={{ color: colors.maintxtclr }} className="nowrap font-bold text-[10px] pb-[2px] font-[SF-Pro-Text-Medium]">2:30 PM</p>
                    <p style={{ color: colors.boundryclr }} className="text-[8px] pt-[2px] font-[SF-Pro-Text-Medium]">04 Jan 2022</p>
                  </div>                  
                </div>
                <Svg componentName={MobileClose} color={colors.boundryclr} width="15px" height="15px" />
              </div>
            </div>
            <div className="mb-[15px] mx-[10px] rounded-[11px]" style={{backgroundColor: colors.contentbgclr}}>
              <div className="border-b-[1px] flex justify-between items-center px-[10px] py-[5px]">
                <div className="py-[3px] ml-[10px]">
                  <p style={{ color: colors.boundryclr }} className="nowrap font-bold text-[10px] pb-[2px] font-[SF-Pro-Text-Medium]">Services</p>
                  <p style={{ color: colors.maintxtclr }} className="text-[8px] pt-[2px] font-[SF-Pro-Text-Medium]">1 selected</p>
                </div>
                <Svg componentName={MobileDownArrow} color={colors.boundryclr} width="15px" height="15px" />
              </div>
              <div className="px-[10px] py-[5px]">
                <div className="py-[3px] ml-[10px] flex justify-between">
                  <p style={{ color: colors.maintxtclr }} className="nowrap font-bold text-[10px] pb-[2px] font-[SF-Pro-Text-Medium]">Men's haircuts</p>
                  <Svg componentName={MobileClose} color={colors.boundryclr} width="15px" height="15px" />
                </div>
                <p style={{ color: colors.boundryclr }} className="flex items-center text-[8px] pt-[2px] font-[SF-Pro-Text-Medium]"><Svg componentName={MobileTimer} color={colors.boundryclr} width="10px" height="10px" /> 1 Hour</p>
                <div style={{color: colors.btncolor}} className="text-[19px]">$56</div>
              </div>
            </div>
            <div className="ml-[13px] mt-[55px] mb-[10px]">
              <div className="rounded-[23px] py-[9px] text-white text-[10px] text-center" style={{backgroundColor: colors.btncolor}}>
                Continue
              </div>
            </div>
            <div className="rounded-t-[13px]"  style={{ backgroundColor: colors.contentbgclr }}>
              <div className="grid grid-cols-4 gap-x-0 h-[22.4px] mt-[5px]">
                <div className="h-full flex justify-center items-center">
                  <Svg componentName={MobileHome} color={colors.boundryclr} width="18px" height="18px" />
                </div>
                <div className="h-full flex justify-center items-center">
                  <Svg componentName={MobileAddCircle} color={colors.btncolor} width="18px" height="18px" />
                </div>
                <div className="h-full flex justify-center items-center">
                  <Svg componentName={MobileGift} color={colors.boundryclr} width="18px" height="18px" />
                </div>
                <div className="h-full flex justify-center items-center">
                  <Svg componentName={MobileProfileCircle} color={colors.boundryclr} width="18px" height="18px" />
                </div>
              </div>
              <div className="h-[25px] flex justify-center items-center">
                <div className="border-[2px] rounded-[50px] p-0 w-[75px]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default DateTimePickMobile;
