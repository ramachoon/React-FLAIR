import React,{useState,memo} from "react";
import { useThemeContext } from "../hooks/useTheme";

const ThemeSwitcher= ({selected, setSelected,imgs }:any) => {
  const { setTheme } = useThemeContext();
  return (
    <div  >

    <div className="gap-4 flex flex-wrap h-full ">
    {imgs.map((items:any,index:number) => (
      <div className={`w-[47%] sm:w-[47%]  md:w-[31%] lg:w-[18%] xl:w-[18%] h-full border-[1px] rounded-2xl ${
        selected === items.title 
        ? " border-[#1642C5] "
        : " border-lightgray "
      }`} key={index}>
          <items.img height={'100%'} width={'100%'} onClick={() =>(setTheme(items.title), setSelected(items.title))}/>
          <h1 className="text-[14px] font-[510] w-full text-center py-2 text-mainTextColor">{items.title}</h1>
      </div>
    ))}
  </div>
    </div>
  );
};

export default memo(ThemeSwitcher);
