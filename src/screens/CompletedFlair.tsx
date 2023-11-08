import React from 'react'
import Complete from '../assets/svgs/complete.svg'
import { useNavigate } from "react-router-dom";
import {useSelector} from  'react-redux'
import axios from 'axios'
import Button from '../components/Button';
import {ReactComponent as Backarrow} from "../assets/svgs/leftarrooooo.svg";
import Svg from "../components/Svg";

const CompletedFlair = ({handleBack}:any) => {
  const navigate = useNavigate();
  const state = useSelector((state:any)=>state.formDataReducers)
  const state1 = useSelector((state:any)=>state.loginReducers)

  
  const handlerCLick =async () => {
    try {
    
    
    let plan:any = localStorage.getItem('plan')
    let title = JSON.parse(plan)
    let colors:any = localStorage.getItem('themeclr')
    let themecolors = JSON.parse(colors)
    let logo:any = localStorage.getItem('logo')
    let logoget = JSON.parse(logo)
    let businesslogo:any = localStorage.getItem('businesslogo')
    let businesslogo1 = JSON.parse(businesslogo)
    let contactreview:any = localStorage.getItem('contactreview')
    let contactreview1 = JSON.parse(contactreview)
    let initialtheme:any = localStorage.getItem('initialtheme')
    let initialtheme1 = JSON.parse(initialtheme)
    let subData = {
      mobile:state.formData.mobile,
      otp: state1.logindetails.resetPasswordToken,
      firstName: state.formData.firstname,
      lastName: state.formData.lastname,
      email: state.formData.email,
      businessLogo: state.formData.businessLogo[0],
      businessName: state.formData.businessname,
      businessCountry: state.formData.country,
      businessState: state.formData.state,
      businessCity: state.formData.city,
      businessAddress: state.formData.location,
      businessStaffSize: state.formData.staffsize,
      businessWebsite: state.formData.website,
      businessGoogleReviews: state.formData.googlereviews,
      businessFacebookPage: state.formData.facebookpage,
      businessInstagramPage: state.formData.instgrampg,
      businessPricingPlan: title,
      businessContacts:state.formData.businessContact,
      businessAppLogo: businesslogo1,
      businessContractAccepted: contactreview1,
      businessStartingTheme: initialtheme1,
      businessSelectedTheme:{
          theme:{
         logo: logoget,
         contentBacground: themecolors.accentclr,
         cardColor: themecolors.cardcolor,
         buttonColor: themecolors.btncolor,
         AccentColor: themecolors.accentclr,
         primaryTextColor: themecolors.maintxtclr,
         SecondaryTextColor: themecolors.boundryclr
          }
      }
  }
  let token:any = localStorage.getItem('token')
  var myHeaders = new Headers();
myHeaders.append("Authorization", `bearer ${JSON.parse(token)}`);
myHeaders.append("Content-Type", "application/json");

var requestOptions:any = {
  method: 'POST',
  headers: myHeaders,
  body: JSON.stringify(subData),
  redirect: 'follow'
};

fetch("http://localhost:5000/shopuser/updatebusinessdetail", requestOptions)
  .then(response => response.json())
  .then((result) =>{
    if(result.success == false){
      // alert(result.message)
    }
    if(result.success == true){
      // alert(result.message)
    }
  } )
  .catch(error => console.log('error', error));
} catch (error) {
      
}
}
  
  return (
    <div>
        <div className=" max-w-[700px] py-16  mx-auto my-0">
            <div className="flex justify-center  my-8">
                <img src={Complete} alt="" />
            </div>
            <div className="">
            <div className="text-center max-w-[700px] mx-auto my-0 mt-4">
            <h3 className=' font-[SF-Pro-Display-Semibold] text-[32px] tracking-[-0.012em] font-[590] text-darkblue '>Welcome to FLAIR™</h3>
            <p className='mt-4  mb-6  xl:text-sm sm:text-xs text-[14px] font-[SF-Pro-Text-Regular] md:text-sm lg:text-sm tracking-[-0.01em] text-secondaryTxtColor'>Welcome to FLAIR, we will be getting all of your services setup and will reach out to you with <br /> your login credentials within the next 24 hours.</p>
        </div>
            </div>
        </div>
            <div className="mb-10 mt-20  mx-auto my-0 w-[90%]  flex md:justify-center justify-end lg:justify-center xl:justify-between relative">
            <Button  >
                    <button className="flex items-center w-[120px] h-[45px] gap-2 justify-center border-darkblue border-[2px] px-6 py-2 rounded-3xl">
                <Svg componentName={Backarrow} color='' width="20" height="10"/>
                      <span className="text-[14px] font-[400] leading-[20px] tracking-[-0.01em] text-mainTextColor font-[SF-Pro-Text-Regular]">
                        Back
                      </span>
                    </button>
                  </Button>
        <Button
           className='w-[50%] md:w-[330px] xl:w-[380px] lg:w-[420px] font-[SF-Pro-Text-Bold] bg-btnclr tracking-tight font-[700] text-[16px] text-btntxtclr px-6 rounded-3xl py-3' 
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
  )
}

export default CompletedFlair