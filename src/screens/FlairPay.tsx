import React from "react";
import OverALlImg from "../assets/img/Group 427319217.png";
import Button from "../components/Button";
import Svg from "../components/Svg";
import {ReactComponent as Backarrow} from "../assets/svgs/leftarrooooo.svg";

interface IPops {
  handleNext: any;
  handleBack: any;
}
const FlairPay: React.FC<IPops> = ({ handleNext ,handleBack}) => {
  const handlerSubmit = () => {
    handleNext();
  };

  return (
    <div className="">
      <div className="max-w-[700px] mx-auto my-0">
      <div className="text-center  ">
        <h3 className="tracking-[-0.01em] text-darkblue  text-[32px] font-[590] my-4 mt-8  font-[SF-Pro-Display-Semibold] ">
          FLAIR Pay
        </h3>
        <p className="text-darkblue opacity-[0.7] mb-6 xl:text-[14px] font-[SF-Pro-Text-Regular] tracking-[-0.01em] leading-5 font-[400] sm:text-xs text-xs md:text-sm lg:text-sm">
          Please note, we work with Stripe to handle all transactions. All of
          our clients integrate with FLAIR Pay to ensure full integration and to
          fully maximize their operations. This screen  {" "} should have an image of
          FLAIR Pay with % 's that are removed by stripe like mangomint pay does
          and a button to read more about how to get started. This screen is for
          information only.{" "}
        </p>
      </div>
      <div className="text-mainTextColor font-bold text-center mt-4">
        <p>
          {" "}
          &#62; <a href="" className="text-[14px] text-foreground font-[510] font-[SF-Pro-Text-Medium] cursor-pointer tracking-[-0.01em]">Details about Flair Pay and Stripe </a><br />
          &#62; <a href="" className="text-[14px] text-foreground font-[510] font-[SF-Pro-Text-Medium] cursor-pointer tracking-[-0.01em]">Link to documentation about how to connect</a>
        </p>
      </div>
    <div className="md:w-full lg:w-full xl:w-full w-[90%]">  
    <img src={OverALlImg} className='' alt="" />
    </div>
    </div>
    <div className="  mx-auto mb-6 mt-4 w-[90%]  flex md:justify-center justify-end lg:justify-center xl:justify-between relative">
    <Button  >
                    <button className="flex items-center w-[120px] h-[45px] gap-2 justify-center border-darkblue border-[2px] px-6 py-2 rounded-3xl">
                <Svg componentName={Backarrow} color='' width="20" height="10"/>
                      <span className="text-[14px] font-[400] leading-[20px] tracking-[-0.01em] text-mainTextColor font-[SF-Pro-Text-Regular]">
                        Back
                      </span>
                    </button>
                  </Button>
        <Button
           className='w-[50%] md:w-[330px] xl:w-[380px] lg:w-[420px] font-[SF-Pro-Text-Bold] bg-btnclr tracking-tight font-[700] text-[16px] text-btntxtclr px-6 rounded-3xl py-3' onClick={handlerSubmit}
        >Continue</Button>
                  <Button  className='opacity-0'>
                    <button className=" flex items-center w-[120px] h-[45px] gap-2 justify-center border-[#1642C5] border-[1px] px-6 py-2 rounded-3xl">
                      <span className="font-bold text-[14px] tracking-tight text-mainTextColor">
                        Back
                      </span>
                    </button>
                  </Button>
       </div>
    </div>
  );
};

export default FlairPay;
