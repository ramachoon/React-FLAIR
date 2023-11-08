import React from 'react'
import { useLocation } from 'react-router-dom'

const Footer = () => {
  const location = useLocation()
  return (
    location.pathname=="/" ||location.pathname=="/otp"?null:(
    <div className="md:px-8 lg:px-16 xl:px-16 px-0 bg-contentBackground  flex  pb-4  w-[95%] mx-auto my-0 justify-between ">
                  <span className="text-gray text-[12px] font-[SF-Pro-Text-Regular] font-[400] sm:text-sm">
                    @2022 flair.io
                  </span>
                  <div className=" flex md:gap-4 lg:gap-4 xl:gap-4 gap-2 sm:gap-3">
                    <a href="https://www.google.com/">
                    <span className="text-[12px] font-[400] font-[SF-Pro-Text-Regular] tracking-tight text-foreground">
                      Terms & Conditions
                    </span>
                    </a>
                    <a href="https://www.google.com/">
                    <span className="text-[12px] font-[SF-Pro-Text-Regular] tracking-tight font-[400] text-foreground">
                      Privacy Policy
                    </span>
                    </a>
                  </div>
                </div>
                )
  )
}

export default Footer