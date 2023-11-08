import React from "react";
import PDFIMG from "../assets/img/document/pdf.png";
import { ReactComponent as FUllScreen } from "../assets/svgs/fullscreen.svg";
import { ReactComponent as Download } from "../assets/svgs/download 1.svg";
import Checkbox from "../components/Checkbox";
import InputWithLabel from "../components/InputWithLabel";
import Exit from "../assets/svgs/exit.svg";
import Button from "../components/Button";
import { ReactComponent as Backarrow } from "../assets/svgs/leftarrooooo.svg";
import Svg from "../components/Svg";


interface IPops {
  handleNext: any;
  handleBack: any;
}
const ContactReview: React.FC<IPops> = ({ handleNext, handleBack }) => {
  const [Switch, setSwitch] = React.useState({
    check: false,
    name: false,
    business: false,
    address: false,
    close: false,
    confirmation: false
  });
  const [error, setError] = React.useState(false);
  const [values, setValues] = React.useState({
    fullName: "",
    businessName: "",
    address: "",
  });
  const onChange = (e: any) => {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
  };
  const Validation = () => {
    if (values.fullName && values.fullName.length > 4 && values.address && values.address.length > 4 && values.businessName && values.businessName.length > 4 && Switch.check) {
      return true;
    } else {
      return false;
    }
  };

  const handlerSubmit = () => {
    if (Validation()) {
      setSwitch({ ...Switch, confirmation: true });
    } else {
      setError(true);
    }
  };

  const handlerSubmit1 = () => {
    if (Validation()) {
      localStorage.setItem("contactreview", JSON.stringify(Switch.check));
      handleNext();
    }
  };

  const FullScreen = () => {
    return (
      <div className=" fixed left-0 top-0 z-40 w-full h-full bg-[#00000070]">
        <div className="flex justify-center items-center h-full ">
          <div className="flex justify-center flex-col items-center">
            <div className=" flex justify-end p-2 w-[45%]">
              <span
                onClick={() => setSwitch({ ...Switch, close: false })}
                className="bg-white py-2 px-4 text-lg cursor-pointer rounded-xl"
              >
                X
              </span>
            </div>
            <img src={PDFIMG} className="border w-[45%] border-gray rounded-lg" alt="" />
          </div>
        </div>
      </div>
    );
  };
  const Confirmation = () => {
    return (
      <div className="absolute top-0 left-0 w-full flex justify-center z-40 items-center h-full bg-[rgba(26,29,37,0.3)]">
        <div className="xl:w-[25%] lg:w-[25%] md:w-[25%] w-[90%] bg-background mx-auto my-0 relative  px-8 pb-8 pt-4 rounded-2xl">
          <div className="w-full flex justify-between  ">
            <h1 className="text-center text-foreground font-[700] py-2 text-[20px]"></h1>
            <h1 className="text-center text-foreground font-[700] py-2 text-[20px]">Successfully signed</h1>
            <img src={Exit} alt="" onClick={() => setSwitch({ ...Switch, confirmation: false })} className="cursor-pointer" />
          </div>
          <p className="text-center text-gray font-[400] py-2 text-[14px]">Would you like to download the signed VENDORS AGREEMENT?</p>
          <a
            href={PDFIMG}
            onClick={handlerSubmit1}
            download
          >
            <button

              className=" w-full  font-[SF-Pro-Text-Bold] bg-btnclr tracking-tight font-[700] text-[16px]  mt-4  text-btntxtclr px-6 rounded-3xl py-3"
            >
              Download now
            </button>
          </a>

          <button
            onClick={handlerSubmit1}
            className=" w-full  border border-btnclr mt-2 font-[SF-Pro-Text-Bold] bg-btntxtclr tracking-tight font-[700] text-[16px]   text-btnclr px-6 rounded-3xl py-3"
          >
            Later
          </button>

        </div>
      </div>
    )
  }
  return (
    <div className="mb-4">
      {Switch.close && <FullScreen />}
      {Switch.confirmation && <Confirmation />}
      <div className=" max-w-[750px] mx-auto my-0">
        <div className="text-center  ">
          <h3 className="my-8 text-mainTextColor font-[SF-Pro-Display-Semibold] tracking-[-0.01em] xl:text-[32px] text-[24px] md:text-[32px] lg:text-[32px] font-[590]  ">
            Contract review and signing
          </h3>
        </div>
        <div className="flex justify-between flex-col gap-8 md:flex-row lg:flex-row xl:flex-row">
          <div className="lg:w-[49%] xl:w-[55%] w-[100%] sm:w-[100%] md:w-[49%] ">
            <div className="">
              <div className="flex flex-col justify-end relative sm:w-[60%] xl:w-full lg:w-full mx-auto my-0">
                <div className="flex gap-2  absolute z-20 top-1 right-1 p-1 justify-end ">
                  <a
                    href={PDFIMG}
                    className="bg-lightgray p-1 rounded-sm"
                    download
                  >
                    <Download />
                  </a>
                  <span
                    onClick={() => setSwitch({ ...Switch, close: true })}
                    className="cursor-pointer bg-lightgray p-1 rounded-sm"
                  >
                    <FUllScreen className="mx-auto my-0 " />
                  </span>
                </div>
                <img src={PDFIMG} className="mx-auto my-0 border border-lightgray rounded-md " alt="" />
                <span className=""></span>
              </div>
            </div>
          </div>
          <div className="mt-4 xl:mt-0 md:mt-0 lg:mt-0 lg:w-[40%] sm:w-[100%] xl:w-[46%] w-[100%] md:w-[40%]">
            <div className="flex flex-col">
              <div className="mt-2">
                <InputWithLabel
                  name="fullName"
                  error={error && (!values.fullName || values.fullName.length < 4)}
                  value={values.fullName}
                  label="Enter your full name"
                  handlerchange={onChange}
                  placeholder="Please enter your full name"
                />
              </div>
              {error && (!values.fullName || values.fullName.length < 4) && (
                <p className="text-red-400 font-[SF-Pro-Text-Regular] text-[12px] font-[400] mt-1">
                  Not less then 4 digit
                </p>
              )}
              <div className="mt-2">
                <InputWithLabel
                  name="businessName"
                  error={error && (!values.businessName || values.businessName.length < 4)}
                  value={values.businessName}
                  label="Enter your Business Name"
                  handlerchange={onChange}
                  placeholder="Please enter your Business Name"
                />
              </div>
              {error && (!values.businessName || values.businessName.length < 4) && (
                <p
                  className="text-red-400 font-[SF-Pro-Text-Regular] text-[12px] font-[400] mt-1"
                >
                  Not less then 4 digit
                </p>
              )}
              <div className="mt-2">
                <InputWithLabel
                  name="address"
                  error={error && (!values.address || values.address.length < 4)}
                  value={values.address}
                  label="Enter your Business Address"
                  handlerchange={onChange}
                  placeholder="Please enter your Business Address"
                />
              </div>
              {error && (!values.address || values.address.length < 4) && (
                <p className="text-red-400 font-[SF-Pro-Text-Regular] text-[12px] font-[400] mt-1">
                  Not less then 4 digit
                </p>
              )}
            </div>
            <div className="">
              <div className="mt-4 flex items-center">
                <Checkbox
                  checked={Switch.check}
                  onClick={() => setSwitch({ ...Switch, check: !Switch.check })}
                />
                <span className="pb-[6px] text-mainTextColor tracking-[-0.01em] font-[500] font-[SF-Pro-Text-Regular] lg:text-[14px] md:text-[14px] xl:text-[14px] text-[10px]">
                  I have read and accept the Terms and Conditions & Privacy Policy
                </span>
              </div>
              {!Switch.check && error && (
                <p className="text-red-400 font-[SF-Pro-Text-Regular] text-[12px] font-[400]" >
                  *Please read and agree to the Terms and Conditions by checking the box.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="my-10  mx-auto my-0 w-[90%]  flex md:justify-center justify-end lg:justify-center xl:justify-between relative">
        <Button onClick={handleBack}>
          <button className="flex items-center w-[120px] h-[45px] gap-2 justify-center border-[#1642C5] border-[1px] px-6 py-2 rounded-3xl">
            <Svg componentName={Backarrow} color='' width="20" height="10" />
            <span className="font-bold text-[14px] tracking-tight text-mainTextColor">
              Back
            </span>
          </button>
        </Button>
        <Button
          className='w-[50%] md:w-[330px] xl:w-[420px] lg:w-[420px] font-[SF-Pro-Text-Bold] bg-btnclr tracking-tight font-[700] text-[16px] text-btntxtclr px-6 rounded-3xl py-3' onClick={handlerSubmit}
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

export default ContactReview;
