import React from "react";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { ReactComponent as Check } from "../assets/svgs/greencheck.svg";
import "../styles/otp.css";
import axios from "axios";
import Button from "./Button";

interface IProps {
  handleNext: Function;
  title: string;
  subtitle: string;
  price: string;
  features: string[];
  duration: string;
  service: string[];
  plus: string;
  plan_id: string;
}
const BasicCard: React.FC<IProps> = ({
  plus,
  handleNext,
  title,
  subtitle,
  price,
  features,
  duration,
  service,
  plan_id
}) => {


  const handlerSubmit = async () => {
      // title
      let token: any = localStorage.getItem("token");
      axios.post(
        process.env.REACT_APP_API_URL + "/shop/plan", {plan_id:plan_id},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
          },
        })
        .then((result: any) => {
          localStorage.setItem("plan", JSON.stringify(title));
          localStorage.setItem("plan_id", JSON.stringify(plan_id));
          handleNext()
        })
        .catch(error => {
          console.log(error.response.data)
        });

  };
  return (
    <div className="rounded-3xl  border-lightgray border-[1px] bg-contentBackground  min-w-[280px] h-[758px] flex justify-between flex-col">
      <CardContent className="bg-contentBackground rounded-3xl ">
        <Typography
          component="div"
          sx={{
            dispaly: "flex",
            justifyContent: "start",
            gap: "1.5rem",
            alignItems: "center",
            fontSize: "16px",
            fontWeight: "700",
            color: "black",
          }}
          color="text.secondary"
          gutterBottom
        >
        <div className="flex justify-between items-center">

        <span className=" font-[SF-Pro-Text-Bold] leading-[22px] tracking-[-0.01em] text-[16px] text-mainTextColor font-[700] SF-Pro-Text-Bold">
            {title}
          </span>


          {plus && (
            <span className="py-1 px-3 ml-4 bg-foreground text-white font-[510] tracking-[-0.01em] leading-[17px] rounded-2xl text-[12px] font-[SF-Pro-Text-Medium]">
              {plus}
            </span>
          )}
        </div>
        </Typography>
        <Typography sx={{ fontSize: "12px" }} gutterBottom>
          <span className="text-secondaryTxtColor tracking-[-0.01em] leading-[17px] rounded-2xl text-[12px] font-[SF-Pro-Text-Regular]">{subtitle}</span>
        </Typography>
        <span className="text-[40px] font-[700] tracking-[-0.012em] text-mainTextColor font-[SF-Pro-Text-Medium]">
          ${price}
        </span>


        <sub className="text-[16px] font-[510] tracking-[-0.01em] text-secondaryTxtColor font-[SF-Pro-Text-Regular]">
          /{duration}
        </sub>
        <hr className="text-lightgray" />
        <div className="mt-4">


          <span className="font-[510] tracking-[-0.01em] text-mainTextColor text-[14px]  font-[SF-Pro-Text-Regular]">
            Service:
          </span>
          <ul className="mb-4 mt-2">
            {service.map((items: string, index: number) => (
              <li
                key={index}
                className="font-[SF-Pro-Text-Regular] font-[400] text-[14px] tracking-[-0.01em] items-center  text-mainTextColor flex gap-2"
              >
                <Check />
                {items}
              </li>
            ))}
          </ul>
          <hr className="mb-2 text-lightgray" />
          <span className="tracking-[-0.01em] font-[510] text-[14px]  text-mainTextColor font-[SF-Pro-Text-Regular]">
            Features:
          </span>
          <ul className="list-disc mt-2 pl-4">
            {features.map((items: string, index: number) => (
              <li
                key={index}
                className="text-[12px] tracking-[-0.01em] font-[SF-Pro-Text-Regular]  text-mainTextColor"
              >
                {items}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      <div className="flex justify-center py-5">
        
      <Button
          onClick={handlerSubmit}
          className="w-[80%] xl:w-[90%] lg:w-[70%]  tracking-[-0.01em] text-btntxtclr font-[SF-Pro-Text-Bold] rounded-3xl  bg-btnclr  font-[700] text-[16px]    px-6  py-3"
        >
          Select Plan
        </Button>
      </div>
    </div>
  );
};
export default BasicCard;
