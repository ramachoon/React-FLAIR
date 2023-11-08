import React, { useState } from "react";
import InputWithLabel from "../components/InputWithLabel";
import Button from "../components/Button";
import { ReactComponent as Backarrow } from "../assets/svgs/leftarrooooo.svg";
import Svg from "../components/Svg";

interface IPops {
  handleNext: any;
  handleBack: any;
  setSwitch: any;
}
const AddPayment: React.FC<IPops> = ({ handleNext, handleBack, setSwitch }) => {
  const [state, setState] = useState(false);
  const [data, setData] = useState({
    cardnumber: "",
    date: "",
    cvv: "",
    cardholdername: "",
    postalcode: ''
  });
  const handlerChanger = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const handlerSubmit = () => {
    if (handlerValidation()) {
      handleNext();
    } else {
      setState(true);
    }
  };
  const handlerValidation = () => {
    if (
      data.cardnumber != "" &&
      data.date != "" &&
      data.cvv != "" &&
      data.cardholdername != "" &&
      data.postalcode != ""
    ) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <div className=" py-4 h-full">
      <div className="max-w-[800px] mx-auto my-0 mt-4">
        <div className="text-center ">
          <h3 className=" tracking-[-0.01em] text-darkblue font-[SF-Pro-Text-Bold] xl:text-[32px] text-[28px] md:text-[32px] lg:text-[32px]  font-[590] ">
            Add your payment method
          </h3>
          <p className="text-darkblue opacity-[0.7] font-[SF-Pro-Text-Regular]  font-[400] mt-4  mb-6 xl:text-[14px] sm:text-xs text-xs md:text-sm lg:text-sm">
            Please enter a payment method to confirm your membership with FLAIR. This card will not be charged and is used to confirm your subscription. You will be prompted to reconfirm your payment method once your services are available.
          </p>
        </div>
        <div className="border-[1px] bg-contentBackground border-lightgray w-[100%] sm:w-[70%] md:w-[70%] lg:w-[70%] xl:w-[60%] mx-auto my-0  rounded-3xl    flex-col   flex justify-center items-center">
          <div className=" w-full h-[100%]  py-6 px-6">
            <div className="flex flex-col">
              <InputWithLabel
                error={state && data.cardnumber === ''}
                label="Billing Address"
                placeholder="Enter street address"
                handlerchange={handlerChanger}
                value={data.cardnumber}
                name="cardnumber"
              />
              {state && data.cardnumber === '' && (
                <p className="text-red-500 text-[14px] font-[400] font-[SF-Pro-Text-Regular] tracking-tight">
                  This field is required
                </p>
              )}
            </div>
            <div className="w-full flex gap-4 mt-4">
              <div className="flex flex-col w-[47%] md:w-[49%] lg:w-[48%] xl:w-[48%]">
                <InputWithLabel
                  error={state && data.date === ''}
                  label="Country"
                  placeholder="Country"
                  handlerchange={handlerChanger}
                  value={data.date}
                  name="date"
                />
                {state && data.date === '' && (
                <p className="text-red-500 text-[14px] font-[400] font-[SF-Pro-Text-Regular] tracking-tight">
                  This field is required
                </p>
              )}
              </div>
              <div className="flex flex-col w-[47%] md:w-[49%] lg:w-[48%] xl:w-[48%]">
                <InputWithLabel
                  error={state && data.cvv === ''}
                  label="Province"
                  placeholder="Province"
                  handlerchange={handlerChanger}
                  value={data.cvv}
                  name="cvv"
                />
                {state && data.cvv === '' && (
                <p className="text-red-500 text-[14px] font-[400] font-[SF-Pro-Text-Regular] tracking-tight">
                  This field is required
                </p>
              )}
              </div>
            </div>
            <div className="w-full flex gap-4 mt-4">

              <div className="flex flex-col w-[47%] md:w-[49%] lg:w-[48%] xl:w-[48%]">

                <InputWithLabel
                  label="City"
                  error={state && data.cardholdername === ''}
                  placeholder="City"
                  handlerchange={handlerChanger}
                  value={data.cardholdername}
                  name="cardholdername"
                />
                {state && data.cardholdername === '' && (
                <p className="text-red-500 text-[14px] font-[400] font-[SF-Pro-Text-Regular] tracking-tight">
                  This field is required
                </p>
              )}
              </div>
              <div className="flex flex-col w-[47%] md:w-[49%] lg:w-[48%] xl:w-[48%]">
                <InputWithLabel
                  error={state && data.postalcode === ''}
                  label="Postal Code"
                  placeholder="Postal Code"
                  handlerchange={handlerChanger}
                  value={data.postalcode}
                  name="postalcode"
                />
                {state && data.postalcode === '' && (
                <p className="text-red-500 text-[14px] font-[400] font-[SF-Pro-Text-Regular] tracking-tight">
                  This field is required
                </p>
              )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-10 mt-10 mx-auto my-0 w-[90%]  flex md:justify-center justify-end lg:justify-center xl:justify-between relative">
        <Button  >
          <button className="flex items-center w-[120px] h-[45px] gap-2 justify-center border-darkblue border-[2px] px-6 py-2 rounded-3xl">
            <Svg componentName={Backarrow} color='' width="20" height="10" />
            <span className="text-[14px] font-[400] leading-[20px] tracking-[-0.01em] text-mainTextColor font-[SF-Pro-Text-Regular]">
              Back
            </span>
          </button>
        </Button>
        <Button
          className='w-[50%] md:w-[330px] xl:w-[380px] lg:w-[420px] font-[SF-Pro-Text-Bold] bg-btnclr tracking-tight font-[700] text-[16px] text-btntxtclr px-6 rounded-3xl py-3' onClick={handlerSubmit}
        >Continue</Button>
        <Button className='opacity-0'>
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

export default AddPayment;
