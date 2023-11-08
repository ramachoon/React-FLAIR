import React from "react";
import Otp from "../components/Otp";
import PICs from '../assets/img/othersImg/Introduction Image Column.png'
import Logo from '../assets/svgs/Logo.svg'

const Forget = () => {
  return (
    <div className="bg-cardColor  h-[100vh]">
      <div className="flex flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row  h-full w-full md:h-full sm:h-full sm:w-full md:w-full lg:h-full lg:w-full xl:h-full xl:w-full">
      <div className="sm:w-[100%] w-[100%] lg:w-[36%] xl:w-[40%] md:w-[100%]">
      <div className="sm:mx-auto md:mx-auto lg:mx-auto xl:mx-0   h-[650px] flex-col max-w-[620px] bg-contentBackground w-[100%] md:h-[650px] lg:h-[100%] xl:h-[100%] flex justify-center items-center  my-0">
        <div className=" w-full h-[100%] px-2 flex justify-center items-center">
          <div className="w-[90%]  h-[70%] md:w-[80%]  md:h-[70%] lg:w-[75%]  lg:h-[70%] xl:w-[70%]">
            <div className="mb-8">
              <div className="flex">
                    <img src={Logo} className="w-[150px]" alt="" />
            </div>
            </div>
            <Otp />
          </div>
        </div>
        
        <div className="flex md:px-8 lg:px-8 xl:px-8 px-4 py-4 w-full justify-between">
              <span className="tracking-tight text-gray  text-[12px]  font-[400] sm:text-sm font-[SF-Pro-Text-Regular]">
                @ 2022 flair.io
              </span>
              <div className=" flex gap-4 sm:gap-3">
                <span className=" tracking-tight text-[12px]  font-[400] text-foreground font-[SF-Pro-Text-Regular]">
                  Terms & Conditions
                </span>
                <span className=" text-[12px]  tracking-tight font-[400] text-foreground font-[SF-Pro-Text-Regular]">
                  Privacy Policy
                </span>
              </div>
            </div>
      </div>
      </div>
      <div className="w-[100%] sm:w-[100%] md:w-[100%] xl:w-[60%] lg:w-[56%] hidden md:flex  lg:flex xl:flex  justify-end items-end">
          <img src={PICs} alt="" className="h-[100%] w-full"/>
        </div>
      </div>
    </div>
  );
};

export default Forget;
