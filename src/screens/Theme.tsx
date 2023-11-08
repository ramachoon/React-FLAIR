import React, { useState, useEffect, useMemo, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import UploadImg from "../components/UploadImg";
import { ReactComponent as EXIT } from "../assets/svgs/exit.svg";
import { ReactComponent as Calendar } from "../assets/svgs/Group 427319198 (1).svg";
// import { ReactComponent as FlairPage } from "../assets/svgs/Group 427319198.svg";
import "../styles/otp.css";
import { ReactComponent as LightTheme1 } from "../assets/img/theme/#2.svg";
import { ReactComponent as LightTheme2 } from "../assets/img/theme/#3.svg";
import { ReactComponent as LightTheme3 } from "../assets/img/theme/#4.svg";
import { ReactComponent as LightTheme4 } from "../assets/img/theme/#5.svg";
import { ReactComponent as LightTheme5 } from "../assets/img/theme/#6.svg";
import { ReactComponent as DarkTheme1 } from "../assets/img/theme/#7.svg";
import { ReactComponent as DarkTheme2 } from "../assets/img/theme/#8.svg";
import { ReactComponent as DarkTheme3 } from "../assets/img/theme/#9.svg";
import { ReactComponent as DarkTheme4 } from "../assets/img/theme/#10.svg";
import { ReactComponent as DarkTheme5 } from "../assets/img/theme/#11.svg";
import LOGONAME from "../assets/svgs/Logo.svg";
import { ReactComponent as Backarrow } from "../assets/svgs/leftarrooooo.svg";
import { useThemeContext } from "../hooks/useTheme";
import DateTimePick from "../components/DateTimePick";
import DateTimePickPos from "../components/DateTimePickPos";
import DateTimePickMobile from "../components/DateTimePickMobile";
import ImgUploadCrop from "../components/ImgUploadCrop";
import Svg from "../components/Svg";
import { SketchPicker } from "react-color";
import DropdownTick from "../components/DropdownTick";
import { MenuItem, NativeSelect, Select } from "@mui/material";
import styled from "@emotion/styled";
import { ReactComponent as ArrowDown } from "../assets/svgs/Do4wn_Arrow_3_.svg";
import LEftSide from "../assets/img/Web App 9.png";
import ColorPicker from "../components/ColorPicker";
import ThemeSwitcher from "../components/ThemeSwitcher";
import Button from "../components/Button";
import axios from "axios";

export interface IColors {
  colors: {
    contentbgclr: string;
    cardcolor: string;
    btncolor: string;
    accentclr: string;
    boundryclr: string;
    maintxtclr: string;
    btntxtclr: string;
  };
}
interface IPops {
  handleNext: any;
  handleBack: any;
}
const Theme: React.FC<IPops> = ({ handleNext, handleBack }) => {
  const lightThemes = [
    LightTheme1,
    LightTheme2,
    LightTheme3,
    LightTheme4,
    LightTheme5,
  ];
  const darkThemes = [
    DarkTheme1,
    DarkTheme2,
    DarkTheme3,
    DarkTheme4,
    DarkTheme5,
  ];
  const navigate = useNavigate();
  const [selectedTheme, setSelectedTheme] = useState(true);
  const [themeList, setThemeList] = useState([]);
  const [colors, setColors] = useState<IColors["colors"]>({
    contentbgclr: "#ffffff",
    cardcolor: "#F0F0F0",
    btncolor: "#1642C5",
    accentclr: "#E0E9F1",
    boundryclr: "#87888D",
    maintxtclr: "#1A1D25",
    btntxtclr: "",
  });
  const [selected, setSelected] = useState("Seaside");
  const [test, setTest] = useState(false);
  const [error, setError] = useState(false);
  // const coloroo = getComputedStyle(document.documentElement).getPropertyValue('--contentBackground');
  const [webChanger, setWebChanger] = useState("web");
  const [getLogo, setGetLogo] = useState(LOGONAME);

  const handlerChanger = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setColors({
        ...colors,
        [e.target.name]: e.target.value,
      });
    },
    [colors]
  );

  useEffect(() => {
    // localStorage.removeItem("accountdetails");
    // localStorage.removeItem("companyDetails");
    let token: any = localStorage.getItem("token");
    axios.get(
      process.env.REACT_APP_API_URL + "/shop/theme/list", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    })
      .then((result: any) => {
        if (result.data.data) {
          setThemeList(result.data.data);
          setSelected(result.data.data[0].name)
        }
      })
      .catch(error => {
        if (error.response.data && error.response.data.status === 401) {
          navigate('/');
        } else {
          console.log(error.response.data)
        }
      });
  }, []);

  const HandlerSubmit = () => {
    if (!test) {
      setSelected(selected);
    }

    const allValuesPresentExceptBtntxtclr = Object.entries(colors).every(([key, value]) => {
      if (key === 'btntxtclr') {
        return true; // Skip checking btntxtclr
      }
      return !!value;
    });
    if (allValuesPresentExceptBtntxtclr && getLogo) {
      let token: any = localStorage.getItem("token");
      const currentTheme: any = themeList.filter((t:any, i: number) => t.name === selected)[0];
      axios.post(
        process.env.REACT_APP_API_URL + "/shop/branding", 
        {
          shop_theme_id : currentTheme.id,
          content_background : colors.contentbgclr,
          cards_color : colors.cardcolor,
          button_color : colors.btncolor,
          accent_color : colors.accentclr,
          main_text_color : colors.maintxtclr,
          secondary_text_color : colors.boundryclr,
        },
        {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
      })
        .then((result: any) => {
          handleNext();
          localStorage.setItem("themeclr", JSON.stringify(colors));
          localStorage.setItem("logo", JSON.stringify(getLogo));
        })
        .catch(error => {
          if (error.response.data && error.response.data.status === 401) {
            navigate('/');
          } else {
            console.log(error.response.data)
            setError(true);
          }
        });

    } else {
      setError(true);
    }

  };
  const applytheme = () => {
    setTest(true);
  };
  const handlerApply = () => {
    if (themeList.length) {
      setSelectedTheme(false);
      localStorage.setItem("initialtheme", JSON.stringify(selected));
      const initialTheme:any = themeList.filter((t:any, i: number) => t.name === selected)[0];
      setColors({
        contentbgclr: initialTheme.color.content_background,
        cardcolor: initialTheme.color.cards_color,
        btncolor: initialTheme.color.button_color,
        accentclr: initialTheme.color.accent_color,
        boundryclr: initialTheme.color.secondary_text_color,
        maintxtclr: initialTheme.color.main_text_color,
        btntxtclr: "",
      });      
    }
  };
  const { setTheme } = useThemeContext();
  const CustomTheme = () => {
    // dark-theme1 light-theme1
    return (
      <div className="z-30  fixed w-[100%] h-[100%] left-0  top-[0%] ">
        <div className=" h-full w-full  bg-[#87888d87] flex justify-center items-center sm:flex sm:justify-center sm:items-center md:flex md:justify-center md:items-centerlg:flex lg:justify-center lg:items-center ">
          <div className=" bg-contentBackground  rounded-3xl   pb-4 px-6 mt-2 max-w-[1050px] mx-auto my-0 w-full">
            <div className="text-center relative">
              <div
                className="flex justify-end pt-4 absolute right-1 -top-2 w-full cursor-pointer"
                onClick={() => (setSelectedTheme(false), setTheme("Seaside"))}
              >
                <Svg
                  componentName={EXIT}
                  color={selected.match("dark-theme") ? "white" : ""}
                  width="14"
                  height="14"
                />
              </div>
              <div className="flex justify-center mt-4">

                <h3 className=" tracking-[-0.012em]  text-darkblue  xl:text-[32px]  text-[28px] md:text-[32px] font-[SF-Pro-Display-Semibold] lg:text-[32px]   font-[700]  flex justify-between">
                  Choose a starting theme
                </h3>
              </div>
              <p className="text-secondaryTxtColor font-[SF-Pro-Text-Regular] tracking-[-0.01em] mb-3 xl:text-[14px] mt-2 sm:text-xs text-xs md:text-sm lg:text-sm">
                Choose a starting theme for initial inspiration. You will be
                able to specify your exact brand and appearance next!
              </p>
            </div>

            <div className=" py-2">
              <h1 className="tracking-tight mb-2 font-[700] font-[SF-Pro-Text-Medium] text-[20px] text-mainTextColor">
                Light themes:
              </h1>
            </div>

            <div className="">
              <ThemeSwitcher
                selected={selected}
                imgs={themeList.filter((t:any) => t.type === 'light').map((theme: any, i: number) => {
                  return { img: lightThemes[i], title: theme.name, id:theme.id };
                })}
                setSelected={setSelected}
              />
            </div>

            <div className=" py-2">
              <h1 className="mb-2 font-[700] tracking-tight text-[20px] font-[SF-Pro-Text-Medium] text-mainTextColor ">
                Dark themes:
              </h1>
            </div>
            <div className="">
              <ThemeSwitcher
                selected={selected}
                imgs={themeList.filter((t:any) => t.type === 'dark').map((theme: any, i: number) => {
                    return { img: darkThemes[i], title: theme.name, id:theme.id };
                })}
                setSelected={setSelected}
              />
            </div>
            <div className="flex justify-center">
              <Button
                className="font-[SF-Pro-Text-Bold] bg-btnclr  text-btntxtclr w-[486px]  py-3 mt-8 rounded-3xl"
                onClick={handlerApply}
              >
                Apply
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const handlerClick = () => {
    switch (webChanger) {
      case "manager":
        return;
      case "mobile":
        return <DateTimePickMobile colors={colors} getLogo={getLogo} />;
      case "pos":
        return <DateTimePickPos colors={colors} getLogo={getLogo} />;
      case "web":
        return <DateTimePick colors={colors} getLogo={getLogo} />;
      default:
        break;
    }
  };
  const [select, setselected] = React.useState("Seaside");
  const CustomizedSlider = styled(Select)`
    .MuiOutlinedInput-notchedOutline {
      border: 0;
    }
    .Mui-focused {
      border: 0 !important;
      outline: 0 !important;
    }
    .MuiSelect-icon {
      margin-top: 5px;
    }
  `;
  return (
    <div className="h-full w-full bg-contentBackground">
      {selectedTheme && (
        <div className=" w-full h-full">
          <CustomTheme />
        </div>
      )}
      <div className="lg:w-[85%] md:w-[100%] mt-12 xl:w-[80%] mx-auto my-0">
        <div className="text-center">

          <h3 className="tracking-[-0.012em] text-darkblue font-[SF-Pro-Display-Semibold] xl:text-[32px] text-[28px] md:text-[32px] lg:text-[32px]  font-[590]  mt-4 ">
            Set Your brand
          </h3>


          <p className="text-darkblue opacity-[0.7] tracking-[-0.01em] mb-6 font-[SF-Pro-Text-Regular] xl:w-[50%] mt-2 w-[100%]  md:w-[40%] lg:w-[40%] mx-auto my-0 xl:text-[14px] sm:text-[14px] text-14px md:text-[14px] lg:text-[14px]">
            Set your initial company’s branding. These changes are not final,
            you customize your branding at any time in FLAIR Manager.
          </p>
        </div>
        <div className="flex flex-col xl:flex-row mt-3 lg:flex-row md:flex-row xl:gap-8 md:gap-8 lg:gap-16">
          <div className="w-[100%] md:w-[30%] lg:w-[30%] xl:w-[42%] mt-4 lg:mt-0 md:mt-0 xl:mt-0 ">
            <div className="">
              <div className="w-full flex flex-col">
                <label
                  htmlFor=""
                  className="text-darkblue tracking-[-0.01em] font-[510] mb-2 font-[SF-Pro-Text-Medium]"
                >
                  Choose system theme
                </label>
                <div className="h-full pr-4 bg-cardColor rounded-3xl">
                  <CustomizedSlider
                    onChange={(events: any) => (
                      setTheme(events.target.value),
                      setselected(events.target.value)
                    )}
                    displayEmpty
                    IconComponent={ArrowDown}
                    inputProps={{ "aria-label": "Without label" }}
                    // .Mui-focused
                    value={select}
                    sx={{ borderRadius: "4rem" }}
                    className=" outline-none rounded-3xl h-[48px] tracking-tight w-full  text-mainTextColor  px-2 bg-cardColor"
                  >
                    <MenuItem value={"Seaside"} className=" tracking-[-0.01em] text-[14px] font-[400]  font-[SF-Pro-Text-Regular]">
                      Theme 1
                    </MenuItem>
                    <MenuItem value={"Granite"} className=" tracking-[-0.01em] text-[14px] font-[400]  font-[SF-Pro-Text-Regular]">
                      Theme 2
                    </MenuItem>
                  </CustomizedSlider>
                </div>
              </div>
              <div className="mt-4">
                <label
                  htmlFor=""
                  className="text-darkblue tracking-[-0.01em] text-[14px] font-[510] mb-2 font-[SF-Pro-Text-Medium]"
                >
                  Add your logo
                </label>
              </div>
              <div className="">
                <ImgUploadCrop setGetLogo={setGetLogo} getImg={LOGONAME} />
              </div>
              <div className="flex mt-4 gap-4 flex-wrap">
                <div className="flex flex-col w-[100%] sm:w-[45%] md:w-[100%] lg:w-[45%] xl:w-[47%]">
                  <label
                    htmlFor=""
                    className="mb-2 text-[14px] text-darkblue tracking-[-0.01em] font-[SF-Pro-Text-Medium] "

                  >
                    Content background
                  </label>
                  <div className={`${error && colors.contentbgclr === '' ? "border-red-600 placeholder:text-red-600 !bg-[#F9E0E0]" : ""} border-[1px] bg-background   pl-2 rounded-2xl gap-2 items-center border-[#E6E6E6] flex`}>
                    <ColorPicker
                      handlerChanger={(value: any) =>
                        setColors({ ...colors, contentbgclr: `#${value}` })
                      }
                      r={250}
                      g={250}
                      b={250}
                      a={1}
                    />
                    <span className="text-darkblue">
                      {colors.contentbgclr}
                    </span>
                  </div>
                  {error && colors.contentbgclr === '' && (
                    <p className="text-red-600 font-bold mt-2 font-[SF-Pro-Text-Regular]">
                       This field is required
                    </p>
                  )}
                </div>
                <div className="flex  flex-col w-[100%] sm:w-[45%] md:w-[100%] lg:w-[45%] xl:w-[47%]">
                  <label
                    htmlFor=""
                    className="mb-2 text-[14px] tracking-[-0.01em] text-darkblue  font-[SF-Pro-Text-Medium]"
                  >
                    Cards color
                  </label>
                  <div className={`${error && colors.cardcolor === '' ? "border-red-600 placeholder:text-red-600 !bg-[#F9E0E0]" : ""} border-[1px] bg-background  pl-2 rounded-2xl gap-2 items-center border-[#E6E6E6] flex`}>
                    <ColorPicker
                      handlerChanger={(value: any) =>
                        setColors({ ...colors, cardcolor: `#${value}` })
                      }
                      r={240}
                      g={240}
                      b={240}
                      a={1}
                    />
                    <span className="text-darkblue">
                      {colors.cardcolor}
                    </span>
                  </div>
                  {error && colors.cardcolor === '' && (
                    <p className="text-red-600 font-bold mt-2 font-[SF-Pro-Text-Regular]">
                       This field is required
                    </p>
                  )}
                </div>
              </div>
              <div className="flex mt-4 gap-4 flex-wrap">
                <div className="flex flex-col w-[100%] sm:w-[45%] md:w-[100%] lg:w-[45%] xl:w-[47%]">
                  <label
                    htmlFor=""
                    className="mb-2 text-[14px] tracking-tight text-darkblue font-[SF-Pro-Text-Medium]"
                  >
                    Button color
                  </label>
                  <div className={`${error && colors.btncolor === '' ? "border-red-600 placeholder:text-red-600 !bg-[#F9E0E0]" : ""}  border-[1px] bg-background pl-2 rounded-2xl gap-2 items-center border-[#E6E6E6] flex`}>
                    <ColorPicker
                      handlerChanger={(value: any) =>
                        setColors({ ...colors, btncolor: `#${value}` })
                      }
                      r={22}
                      g={66}
                      b={197}
                      a={1}
                    />
                    <span className="text-darkblue">
                      {colors.btncolor}
                    </span>
                  </div>
                  {error && colors.btncolor === '' && (
                    <p className="text-red-600 font-bold mt-2 font-[SF-Pro-Text-Regular]">
                       This field is required
                    </p>
                  )}
                </div>
                <div className="flex flex-col w-[100%] sm:w-[45%] md:w-[100%] lg:w-[45%] xl:w-[47%]">
                  <label
                    htmlFor=""
                    className="mb-2 text-[14px] tracking-tight text-darkblue font-[SF-Pro-Text-Medium]"
                  >
                    Accent color
                  </label>
                  <div className={`${error && colors.accentclr === '' ? "border-red-600 placeholder:text-red-600 !bg-[#F9E0E0]" : ""} border-[1px] bg-background pl-2 rounded-2xl gap-2 items-center border-[#E6E6E6] flex`}>
                    <ColorPicker
                      handlerChanger={(value: any) =>
                        setColors({ ...colors, accentclr: `#${value}` })
                      }
                      r={224}
                      g={233}
                      b={241}
                      a={1}
                    />
                    <span className="text-darkblue tracking-tight">
                      {colors.accentclr}
                    </span>
                  </div>
                </div>
                {error && colors.accentclr === '' && (
                    <p className="text-red-600 font-bold mt-2 font-[SF-Pro-Text-Regular]">
                       This field is required
                    </p>
                  )}
              </div>
              <div className="flex mt-4 gap-4 flex-wrap">
                <div className="flex flex-col w-[100%] sm:w-[45%] md:w-[100%] lg:w-[45%] xl:w-[47%]">
                  <label
                    htmlFor=""
                    className="mb-2 text-[14px] tracking-tight text-darkblue font-[SF-Pro-Text-Medium]"
                  >
                    Main text color
                  </label>
                  <div className={`${error && colors.maintxtclr === '' ? "border-red-600 placeholder:text-red-600 !bg-[#F9E0E0]" : ""} border-[1px] bg-background pl-2 rounded-2xl gap-2 items-center border-[#E6E6E6] flex`}>
                    <ColorPicker
                      handlerChanger={(value: any) =>
                        setColors({ ...colors, maintxtclr: `#${value}` })
                      }
                      r={0}
                      g={0}
                      b={0}
                      a={1}
                    />
                    <span className="text-darkblue">
                      {colors.maintxtclr}
                    </span>
                  </div>
                  {error && colors.maintxtclr === '' && (
                    <p className="text-red-600 font-bold mt-2 font-[SF-Pro-Text-Regular]">
                       This field is required
                    </p>
                  )}
                </div>
                <div className="flex flex-col w-[100%] sm:w-[45%] md:w-[100%] lg:w-[45%] xl:w-[47%]">
                  <label
                    htmlFor=""
                    className="tracking-tight mb-2 text-darkblue text-[14px] font-[SF-Pro-Text-Medium]"
                  >
                    Secondary text color
                  </label>
                  <div className={`${error && colors.boundryclr === '' ? "border-red-600 placeholder:text-red-600 !bg-[#F9E0E0]" : ""} border-[1px] bg-background pl-2 rounded-2xl gap-2 items-center border-[#E6E6E6] flex`}>
                    <ColorPicker
                      handlerChanger={(value: any) =>
                        setColors({ ...colors, boundryclr: `#${value}` })
                      }
                      r={135}
                      g={136}
                      b={141}
                      a={1}
                    />
                    <span className="text-darkblue tracking-tight">
                      {colors.boundryclr}
                    </span>
                  </div>
                  {error && colors.boundryclr === '' && (
                    <p className="text-red-600 font-bold mt-2 font-[SF-Pro-Text-Regular]">
                       This field is required
                    </p>
                  )}
                </div>
                <div className="w-full mt-8">
                  <button
                    onClick={applytheme}
                    className="text-[16px] border-[1px] tracking-wider font-bold  border-btnclr text-btnclr py-3 w-full rounded-3xl bg-contentBackground"
                  >
                    Apply theme to all applications
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="xl:w-[80%] md:w-[70%] lg:w-[70%] w-[100%] mt-4 xl:mt-0 lg:mt-0 md:mt-0">
            <div className="px-4">
              <h1 className="text-darkblue tracking-tight mb-2">
                Preview
              </h1>
              <div className=" flex sm:flex-wrap flex-wrap md:flex-nowrap lg:flex-nowrap w-[70%] xl:flex-nowrap gap-1  bg-cardColor rounded-3xl mb-4">
                <div className="m-1 text-center xl:w-[100%] lg:w-[100%] w-[46%] sm:w-[48%]">
                  <span
                    onClick={() => setWebChanger("web")}
                    className={`${webChanger == "web"
                        ? "bg-background text-darkblue"
                        : "text-gray"
                      } block cursor-pointer tracking-tight py-3 h-full  font-[510] text-[14px] rounded-3xl font-[SF-Pro-Text-Medium] text-darkblue`}
                  >
                    Web
                  </span>
                </div>
                <div className="m-1 text-center   xl:w-[100%] lg:w-[100%] w-[46%] sm:w-[48%]">
                  <span
                    onClick={() => setWebChanger("mobile")}
                    className={`${webChanger == "mobile"
                        ? "bg-background text-darkblue"
                        : "text-gray"
                      } block cursor-pointer tracking-tight  py-3 h-full  font-[510] text-[14px] rounded-3xl font-[SF-Pro-Text-Medium]  text-darkblue`}
                  >
                    Mobile
                  </span>
                </div>
                <div className="m-1 text-center   xl:w-[100%] lg:w-[100%] w-[46%] sm:w-[48%]">
                  <span
                    onClick={() => setWebChanger("pos")}
                    className={`${webChanger == "pos"
                        ? "bg-background text-darkblue"
                        : "text-gray"
                      } block cursor-pointer tracking-tight py-3 h-full  font-[510] text-[14px] rounded-3xl font-[SF-Pro-Text-Medium]  text-darkblue`}
                  >
                    POS
                  </span>
                </div>
              </div>
            </div>
            <div className="md:p-4 lg:p-4 xl:p-4 relative overflow-hidden h-[90%] ">
              <div className="h-full">
                {handlerClick()}
                <div className="absolute w-full h-full z-[8] bg-[#ffffff00] top-0"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="my-14  flex md:justify-center justify-end lg:justify-center xl:justify-between relative">
          <Button  >
            <button className="flex items-center w-[120px] h-[45px] gap-2 justify-center border-darkblue border-[2px] px-6 py-2 rounded-3xl">
              <Svg componentName={Backarrow} color='' width="20" height="10" />
              <span className="text-[14px] font-[400] leading-[20px] tracking-[-0.01em] text-darkblue font-[SF-Pro-Text-Regular]">
                Back
              </span>
            </button>
          </Button>
          <Button
            className='w-[50%] md:w-[330px] xl:w-[380px] lg:w-[420px] font-[SF-Pro-Text-Bold] bg-btnclr tracking-tight font-[700] text-[16px] text-btntxtclr px-6 rounded-3xl py-3' onClick={HandlerSubmit}
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
    </div>
  );
};
export default Theme;
