import React, { useState, useEffect } from 'react'
import OTPField from "./OTPField";
import { useNavigate } from 'react-router-dom'
import { formatPhoneNumberIntl } from "react-phone-number-input";
import axios from "axios";
import { useSelector } from 'react-redux'
import Button from './Button';
import VerifiedSVG from '../assets/svgs/verified.svg'
import { loginUser } from "../redux/reducers/loginReducers";
import { useDispatch } from "react-redux";

interface IProps {
  handlerCLick: any
}
const Otp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [error, setError] = useState(false);
  const [verified, setVerified] = useState(false);
  const state = useSelector((state: any) => state.loginReducers)
  const [otp, setOtp] = useState<string[]>(new Array(4).fill(""));

  const [number, setNumber] = useState<string>('+62 08 127 182 771 827');
  const handlerCLick = async () => {
    if (verified) {
      navigate('/form');
    } else {
      axios.post(
        // process.env.REACT_APP_API_URL + "/shop/phone/verify-otp?phone=" + encodeURIComponent(number) + "&otp=" + otp.join(""))
        process.env.REACT_APP_API_URL + "/shop/phone/verify-otp",{
          phone:number,
          otp: otp.join("")
        })

        .then((result: any) => {
          console.log(result.data.data.token)
          localStorage.setItem('token', JSON.stringify(result.data.data.token));
          dispatch(loginUser({ user: result.data.data.user }));
          // navigate('/form')
          setVerified(true)
        })
        .catch(error => {
          if (localStorage.getItem('token')) localStorage.removeItem("token");
          setOtp(new Array(4).fill(""))
          setTimeout(() => {
            setError(true)
          }, 100);
        });

    }
  };
  useEffect(() => {
    try {
      let mobile: any = localStorage.getItem('mobile')
      setNumber(mobile)
    } catch (error) {
      console.log('error')
      navigate('/')
    }
  }, [])

  const [counter, setCounter] = React.useState(53);
  useEffect(() => {
    const timer: any = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);
  const handlerAgainSend = async () => {
    if (counter == 0) {
      axios.post(
        process.env.REACT_APP_API_URL + "/shop/phone/login",
        { phone: number })
        .then((result: any) => {
          setCounter(102)
        })
        .catch(error => console.log('error', error));
    }
  }
  React.useEffect(() => {
    setError(false);
  }, [otp]);
  return (
    //styleName: Body/Bold 14px;


    <div>
      <div className="">
        {
          verified ?
            (
              <>
                <div className="mt-8 flex flex-col items-center">
                  <img src={VerifiedSVG} alt='VerifiedSVG' className='w-[243px]  ' />
                  <h5 className="mt-4 mb-2 font-bold text-[#1F293C] font-[SF-Pro-Display-Semibold] tracking-tight text-[23px] md:text-[32px] xl:text-[32px] lg:text-[32px]">
                    Verified
                  </h5>
                  <p className="text-[#5EAC20] leading-[20px] opacity-[70%]  font-[400] text-[16px] tracking-[-0.01em] font-[SF-Pro-Text-Regular]">
                    Your Mobile Number has been varified
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="text-start">
                  <h5 className="mt-4 mb-2 font-bold text-darkblue font-[SF-Pro-Display-Semibold] tracking-tight text-[23px] md:text-[32px] xl:text-[32px] lg:text-[32px]">
                    Enter the 4-digit code
                  </h5>
                  <p className="text-darkblue opacity-[0.7] font-[400] leading-[20px] text-[14px] tracking-[-0.01em] font-[SF-Pro-Text-Regular]">
                    The 4-digit code has been sent to
                  </p>
                  <p className="text-darkblue opacity-[0.7] font-[700] leading-[20px] tracking-[-0.01em] pt-2 mb-6 font-[SF-Pro-Text-Bold]">
                    {formatPhoneNumberIntl(number)}
                  </p>
                </div>
                <div className="mx-auto my-0 mt-2">
                  <OTPField otp={otp} setOtp={setOtp} error={error} />
                  {error && (
                    <p className="text-red-400 text-[12px] text-center w-full font-bold mt-2 font-[SF-Pro-Text-Regular]">
                      Please enter valid code
                    </p>
                  )}
                </div>
                <div className="mt-8 flex flex-col items-center">

                  <p className="text-secondaryTxtColor leading-[20px]  font-[400] text-[14px] tracking-[-0.01em] font-[SF-Pro-Text-Regular]">
                    Haven't received the code yet?
                  </p>
                  <span className="text-[14px] mt-2 font-[700] tracking-tight font-[SF-Pro-Display-Bold] ">


                    {counter == 0 && <span onClick={handlerAgainSend} className={`${counter == 0 && 'cursor-pointer'} tracking-[-0.01em] leading-[20px] font-[SF-Pro-Text-Bold] text-[14px] font-[700] text-darkblue`}>Send again</span>}
                    <span className="text-[14px] font-[700] font-[SF-Pro-Display-Bold] text-[#1642C5]">
                      {counter == 0 ? '' : (
                        //styleName: Body/Bold 14px;
                        <span className='tracking-[-0.01em] leading-[20px] font-[SF-Pro-Text-Bold] text-[14px] font-[700]'>
                          ({counter}sec)
                        </span>
                      )}
                    </span>
                  </span>
                </div>
              </>
            )
        }

        <Button
          onClick={handlerCLick}
          //styleName: Buttons/Bold 16px;
          className="bg-btnclr tracking-[-0.01em] leading-[22px] font-[SF-Pro-Text-Bold]  font-[700] text-[16px] mt-8 w-full text-btntxtclr px-6 rounded-3xl py-3"
        >
          {verified ? "Done" : "Confirm"}
        </Button>
      </div>
    </div>
  )
}

export default Otp