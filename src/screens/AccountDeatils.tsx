import React, { useState, useEffect } from 'react'
import InputWithLabel from '../components/InputWithLabel'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import { ReactComponent as Backarrow } from "../assets/svgs/leftarrooooo.svg";
import Svg from "../components/Svg";
import axios from 'axios';

interface IPops {
  handleNext: any
  handleBack: any
}
const AccountDeatils: React.FC<IPops> = ({ handleNext, handleBack }) => {
  const navigate = useNavigate();
  const [error, setError] = useState({ firstname: false, lastname: false, email: false })
  const [token, setToken] = useState("")
  const [data, setData] = useState({
    firstname: '',
    lastname: '',
    email: ''
  })
  const handlerchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setData({
      ...data, [name]: value
    })
    setError({ ...error, [name]: false });
  }
  useEffect(() => {
    try {
      let data = localStorage.getItem('accountdetails')
      let tokenLocal = localStorage.getItem('token')
      localStorage.setItem("token", "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5nZXRmbGFpci5jYS9hcGkvc2hvcC9waG9uZS92ZXJpZnktb3RwIiwiaWF0IjoxNjk1NTU1MzA3LCJleHAiOjE2OTU2NDE3MDcsIm5iZiI6MTY5NTU1NTMwNywianRpIjoiVWcwM05wU1ROaHVSVHdnUCIsInN1YiI6IjEyIiwicHJ2IjoiYWNlY2JhMGUxYzkyNDkzNDNkMWQ2NWNjOTNkYmM5ZmY3YTBlMWQzMiJ9.-K3voIiRIS2zRM6IqrEL8WEXnUqW2Zj8gUR6CbiMQ28") //Remove
      if (!tokenLocal) {
        setToken("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5nZXRmbGFpci5jYS9hcGkvc2hvcC9waG9uZS92ZXJpZnktb3RwIiwiaWF0IjoxNjk1NTU1MzA3LCJleHAiOjE2OTU2NDE3MDcsIm5iZiI6MTY5NTU1NTMwNywianRpIjoiVWcwM05wU1ROaHVSVHdnUCIsInN1YiI6IjEyIiwicHJ2IjoiYWNlY2JhMGUxYzkyNDkzNDNkMWQ2NWNjOTNkYmM5ZmY3YTBlMWQzMiJ9.-K3voIiRIS2zRM6IqrEL8WEXnUqW2Zj8gUR6CbiMQ28") //Remove
        // navigate('/')
      } else if (data) {
        setToken(tokenLocal)
        let newData: any = JSON.parse(data)
        setData(newData)
      }
    } catch (error) {
      console.log('err')
      navigate('/')
    }
  }, [])
  const handlerSubmit = () => {
    if (data.firstname != '' && data.lastname != '' && data.email != '' && data.email.indexOf('@') > 0 && data.email.indexOf('.') > 0) {
      axios.post(
        process.env.REACT_APP_API_URL + "/shop/account", {
        first_name: data.firstname,
        last_name: data.lastname,
        email: data.email,
      },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
          },
        })
        .then((result: any) => {
          localStorage.setItem('accountdetails', JSON.stringify(data))
          handleNext()
        })
        .catch(error => {
          if (error.response.data && error.response.data.status === 401) {
            if (localStorage.getItem('accountdetails')) localStorage.removeItem("accountdetails");
            console.log(error.response.data)
            navigate('/')
          } else {
            console.log(error.response.data)
          }
        });
    } else {
      const errTemp = { firstname: false, lastname: false, email: false };
      if (data.firstname === "") errTemp.firstname = true;
      if (data.lastname === "") errTemp.lastname = true;
      if (data.email === "" || data.email.indexOf('@') === -1 || data.email.indexOf('.') === -1) errTemp.email = true;
      setError(errTemp);
    }
  }
  return (
    <div className="">
      <div className=' bg-contentBackground mt-8 mx-auto my-0 mx-w-[600px]  xl:w-[60%] lg:w-[66%] md:w-[70%] '>
        <div className="bg-contentBackground">
          <div className="text-center pb-4">
            <h3 className=' font-[SF-Pro-Display-Semibold] leading-[40px] tracking-[-0.012em] text-darkblue text-[25px] md:text-[32px] lg:text-[32px] xl:text-[32px] font-[590] '>Configure your account details</h3>
            <p className='text-secondaryTxtColor font-[400] leading-[22px] font-[SF-Pro-Text-Regular]  mt-4 mb-6 text-[16px] tracking-[-1px]'>You’re almost there! Set up your new account by completing these details.</p>
          </div>
          <form >
            <div className="flex  gap-6 flex-wrap ">
              <div className="flex flex-col mt-1 md:w-[46%] w-[100%]  lg:w-[47%] xl:w-[48%]">
                <InputWithLabel error={error.firstname} label='First name' placeholder="Enter your first name" handlerchange={handlerchange} value={data.firstname} name='firstname' />
                {error.firstname && (
                  <p className="text-[#E33B3B] text-[12px] font-bold mt-2 font-[SF-Pro-Text-Regular]">
                    This field is required
                  </p>
                )}
              </div>
              <div className="flex flex-col mt-1  md:w-[46%] w-[100%]  lg:w-[47%] xl:w-[48%]">
                <InputWithLabel error={error.lastname} label='Last name' placeholder="Enter your last name" handlerchange={handlerchange} value={data.lastname} name='lastname' />
                {error.lastname && (
                  <p className="text-[#E33B3B] text-[12px] font-bold mt-2 font-[SF-Pro-Text-Regular]">
                    This field is required
                  </p>
                )}
              </div>
              <div className="flex flex-col mt-1  md:w-[46%] w-[100%]  lg:w-[47%] xl:w-[48%]">
                <InputWithLabel error={error.email} type='email' label='Email' placeholder="Enter your email address" handlerchange={handlerchange} value={data.email} name='email' />
                {error.email && (
                  <p className="text-[#E33B3B] text-[12px] font-bold mt-2 font-[SF-Pro-Text-Regular]">
                    Please enter valid email address
                  </p>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="my-[5.8rem]  mx-auto  w-[90%]  flex md:justify-center justify-end lg:justify-center xl:justify-between relative">
        <Button  >
          <button className="flex items-center w-[120px] h-[45px] gap-2 justify-center border-darkblue border-[2px] px-6 py-2 rounded-3xl">
            <Svg componentName={Backarrow} color='' width="20" height="10" />
            <span className="text-[14px] font-[400] leading-[20px] tracking-[-0.01em] text-darkblue font-[SF-Pro-Text-Regular]">
              Back
            </span>
          </button>
        </Button>
        <Button
          className='w-[50%] md:w-[330px] xl:w-[380px] lg:w-[420px] font-[SF-Pro-Text-Bold] bg-btnclr tracking-tight font-[700] text-[16px] text-btntxtclr px-6 rounded-3xl py-3' onClick={handlerSubmit}
        >Continue</Button>
        <Button className='opacity-0'>
          <button className=" flex items-center w-[120px] h-[45px] gap-2 justify-center border-[#1642C5] border-[1px] px-6 py-2 rounded-3xl">
            <span className="font-bold text-[14px] tracking-tight text-darkblue">
              Back
            </span>
          </button>
        </Button>
      </div>
    </div>
  )
}

export default AccountDeatils