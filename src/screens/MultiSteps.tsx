import * as React from "react";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { StepIconProps } from "@mui/material/StepIcon";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Country from "../Json/Country.json";
import State from "../Json/State.json";
import City from "../Json/City.json";
import AccountDeatils from "./AccountDeatils";
import CompanyDetails from "./CompanyDetails";
import ChoosePlan from "./ChoosePlan";
import Theme from "./Theme";
import "../styles/otp.css";
import FlairPay from "./FlairPay";
import ImageCrop from "./ImageCrop";
import ContactReview from "./ContactReview";
import AddPayment from "./AddPayment";
import CompletedFlair from "./CompletedFlair";
import Check from "../assets/svgs/Combined Shape.svg";
import {ReactComponent as Backarrow} from "../assets/svgs/leftarrooooo.svg";
import Svg from "../components/Svg";
import { useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom'
import Logo from '../assets/svgs/Logo.svg'

interface Isteps {
  steps?: any;
  uid?: string;
  actSteps?: number;
}

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 8px)",
    right: "calc(50% + 8px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#1642C5",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#1642C5",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderTopWidth: '2px',
    borderRadius: 1,
  },
  
}));
const StepLabelStyle = styled(StepLabel)(({ theme }) => ({
  [`& .css-1hv8oq8-MuiStepLabel-label.MuiStepLabel-alternativeLabel`]: {
    marginTop:'4px'
  },
}));

const QontoStepIconRoot = styled("div")<{ ownerState: { active?: boolean } }>(
  ({ theme, ownerState }) => ({
    color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center",
    ...(ownerState.active && {
      color: "#1642C5",
    }),
    "& .QontoStepIcon-completedIcon": {
      color: "#1642C5",
      zIndex: 1,
      fontSize: 18,
    },
    "& .QontoStepIcon-circle": {
      width: 8,
      height: 8,
      borderRadius: "50%",
      backgroundColor: "currentColor",
    },
  })
);



function QontoStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <div className="bg-[#1642C5] w-[16px]  h-[16px]  flex justify-center items-center rounded-full">
          <img src={Check} className='' alt="" />
        </div>
      ) : active ? (
        <div className="bg-[#1642C5] w-[16px] h-[16px] p-1 rounded-full">
          <div className=" w-[8px] h-[8px] rounded-full bg-contentBackground z-20" />
        </div>
      ) : (
        <div className=" p-1 rounded-full z-20 flex justify-center items-center">
          <div className=" w-[8px] h-[8px] rounded-full bg-lightgray" />
        </div>
      )}
    </QontoStepIconRoot>
  );
}

const CustomizedSteppers: React.FC<Isteps> = ({ steps, uid, actSteps }) => {
  const state = useSelector((state: any) => state.specialCheck);
  
  const [activeStep, setActiveStep] = React.useState(actSteps ? actSteps : 0);
  // const [activeStep, setActiveStep] = React.useState(7); //Remove
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const navigate = useNavigate()
  // React.useEffect(() => {
  //   let token = localStorage.getItem('token')
  //   if(!token){
  //     navigate('/')
  //   }
  // }, [])

  return (
    <div className="bg-contentBackground h-full md:px-10 sm:px-6 xs:px-5 px-5 lg:px-16 xl:px-8   ">
      <Stack sx={{ width: "100%", height: "100%" }}>
        {steps[0] === "Account Deatils" ? (
          <div className="md:mx-16 lg:mx-16 xl:mx-14  mb-4 flex">
            <div className="flex mt-5" >
               <img src={Logo} className='md:w-32 lg:w-32 w-32 xl:w-[152px]' alt="" />
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="w-full hidden lg:flex mt-4  xl:flex md:flex">
        <Stepper
          alternativeLabel
          className=" xl:w-[70%] lg:w-[70%] sm:gap-0 md:gap-0 lg:gap-0 xl:gap-0 md:w-[75%] hidden mx-auto my-0 flex-wrap xl:overflow-visible md:overflow-visible lg:overflow-visible overflow-hidden justify-center items-center"
          activeStep={activeStep}
          connector={<QontoConnector />}
        >
          {steps.map((label: any,index:number) => (
            <Step key={label} style={{padding:'0 3px'}} >
              <StepLabelStyle
              
                StepIconComponent={QontoStepIcon}
              >
                <span className={`${activeStep >=index? 'text-foreground ':'text-secondaryTxtColor '} tracking-[-0.01em] leading-[17px] hidden sm:hidden  md:block lg:block xl:block  text-xs sm:text-xs md:text-xs  font-[SF-Pro-Text-Medium]`}>
                  {label}
                </span>
              </StepLabelStyle>
            </Step>
          ))}
        </Stepper>
        </div>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            
          }}
          className="bg-contentBackground w-full h-full"
        >
          {activeStep === steps.length ? (
            <React.Fragment>
              <CompletedFlair handleBack={handleBack}/>
            </React.Fragment>
          ) : (
              <div className="h-full w-full bg-contentBackground flex flex-col justify-between">
              {steps[0] === "Account Deatils" ? (
                activeStep == 0 ? (
                  <AccountDeatils handleNext={handleNext} handleBack={handleBack}/>
                ) : activeStep == 1 ? (
                  <CompanyDetails handleNext={handleNext} handleBack={handleBack}/>
                ) : activeStep == 2 ? (
                  <ChoosePlan handleNext={handleNext} />
                ) : activeStep == 3 ? (
                  <Theme handleNext={handleNext} handleBack={handleBack}/>
                ) : activeStep == 4 ? (
                  <ImageCrop handleNext={handleNext} handleBack={handleBack}/>
                ) : activeStep == 5 ? (
                  <FlairPay handleNext={handleNext} handleBack={handleBack}/>
                ) : activeStep == 6 ? (
                  <ContactReview handleNext={handleNext} handleBack={handleBack}/>
                ) : activeStep == 7 ? (
                  <AddPayment handleNext={handleNext} handleBack={handleBack}/>
                ) : (
                  ""
                )
              ) : (
                // uid === "theme" && <DateTimePick />
                ''
              )}
{/*                 
              {steps[0] === "Account Deatils" ? (
                <div className="md:px-8 lg:px-16 xl:px-16 px-0 bg-contentBackground  flex  pb-4  w-full justify-between ">
                  <span className="text-gray text-[12px] font-[400] sm:text-sm">
                    @2022 flair.io
                  </span>
                  <div className=" flex md:gap-4 lg:gap-4 xl:gap-4 gap-2 sm:gap-3">
                    <a href="https://www.google.com/">
                    <span className="text-[11px] font-[400] text-foreground">
                      Terms & Conditions
                    </span>
                    </a>
                    <a href="https://www.google.com/">
                    <span className="text-[11px] font-[400] text-foreground">
                      Privacy Policy
                    </span>
                    </a>
                  </div>
                </div>
              ) : (
                ""
              )} */}
              </div>
          )}
        </Box>
      </Stack>
    </div>
  );
};
export default React.memo(CustomizedSteppers);
