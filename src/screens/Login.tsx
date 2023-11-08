import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Input, { isValidPhoneNumber } from "react-phone-number-input";
import axios from "axios";

import PICs from "../assets/img/othersImg/Introduction Image Column.png";
import Logo from "../assets/svgs/Logo.svg";
import Number from "../components/Number";
import Button from "../components/Button";

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState("");
  const [error, setError] = useState(false);
  const [errorTxt, setErrorTxt] = useState("");
  const handlerCLick = async () => {
    let check = await handlerValidation();
    setError(!check);
    if (check) {
      axios.post(
        process.env.REACT_APP_API_URL + "/shop/phone/login", {
          phone: values
        })
        .then((result: any) => {
          localStorage.setItem("mobile", values);
          // navigate("/otp");
        })
        .catch((err) => {
          setError(true);
          if (err.response.data && err.response.data.message) setErrorTxt(err.response.data.message);
        });
    }
  };
  const handlerValidation = () => {
    if (values && isValidPhoneNumber(values)) {
      setError(false);
      return true;
    } else {
      console.log(values);
      if (values == "") {
        setErrorTxt("Phone number required");
      } else {
        setErrorTxt("Invalid phone number");
      }
      return false;
    }
  };
  useEffect(() => {
    setError(false);
  }, [values]);

  return (
    <div className="bg-cardColor  h-[100vh] ">
      <div className="flex flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row  h-full w-full md:h-full sm:h-full sm:w-full md:w-full lg:h-full lg:w-full xl:h-full xl:w-full">
        <div className="sm:w-[100%] sm:md:w-[100%] lg:w-[36%] xl:w-[40%]  md:w-[100%]">
          <div className="sm:mx-auto md:mx-auto lg:mx-auto xl:mx-0   h-[650px] flex-col  bg-contentBackground w-[100%] md:h-[650px] lg:h-[100%] xl:h-[100%] flex justify-center items-center  my-0">
            <div className=" w-[100%] h-[100%] px-4 flex justify-center items-center ">
              <div className="w-[90%]  h-[70%] md:w-[80%]  md:h-[70%] lg:w-[75%]  lg:h-[70%] xl:w-[73%]  ">
                <div className="text-start">
                  <div className="flex mt-2">
                    <img src={Logo} className="w-[150px] " alt="" />
                  </div>
                  <h5 className="mt-7 mb-3 leading-[124%] tracking-[-0.012em]  text-darkblue font-[590] font-[SF-Pro-Display-Semibold] text-[23px] md:text-[26px] xl:text-[32px] lg:text-[32px]">

                    Login in to your account
                  </h5>
                  <p className="text-darkblue opacity-[0.7]  leading-[20px] tracking-[-0.01em] text-[14px] font-[SF-Pro-Text-Regular] mb-6  ">
                    Enter credits to manage your business
                  </p>
                </div>
                <div className="flex flex-col mt-8">
                  <label
                    htmlFor=""
                    className="font-[500] text-darkblue hover:shadow-none text-[14px] font-[SF-Pro-Display-Medium] mb-2 tracking-wide"
                  >
                    Phone Number
                  </label>
                  <Number getNumber={setValues} error={error} />
                  {error && (
                    <p className="text-red-600 font-bold mt-2 font-[SF-Pro-Text-Regular]">
                      {errorTxt}
                    </p>
                  )}
                </div>
                <Button
                  //styleName: Buttons/Bold 16px;

                  className="font-[SF-Pro-Display-Bold]  leading-[22px] bg-btnclr tracking-[-0.01em] font-[700] text-[16px] mt-9 w-full text-btntxtclr px-6 rounded-3xl py-3"
                  onClick={handlerCLick}
                >
                  Continue
                </Button>
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
        <div className="w-[100%] sm:w-[100%] md:w-[100%] xl:w-[64%] hidden md:flex  lg:w-[56%] lg:flex xl:flex justify-end items-end">
          <img src={PICs} alt="" className="h-[100%] w-full" />
        </div>
      </div>
    </div>
  );
};

export default Login;
