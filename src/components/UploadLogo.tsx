import React, { useEffect, useState } from "react";
import {ReactComponent as Cloud} from '../assets/svgs/cloud.svg'
import {ReactComponent as ADDPHOTO} from "../assets/svgs/addimg.svg";
import { Avatar } from "@mui/material";

interface IMG {
  heightimg?: any;
  widthimg?: any;
  defaultImg?:any;
  setGetImg?:any;
}
const UploadLogo:React.FC<IMG> = ({heightimg,widthimg,defaultImg,setGetImg}) => {
  const [selectedImages, setSelectedImages] = useState<any>(
    []
  );

  const onSelectFile = (event: any) => {
    setSelectedImages([]);
    const selectedFiles = event.target.files;
    const selectedFilesArray: any = Array.from(selectedFiles);
    const imagesArray = selectedFilesArray.map((file: any) => {
      return URL.createObjectURL(file);
    });
    setSelectedImages(imagesArray)
    event.target.value = "";
  };
useEffect(()=>{
  setSelectedImages([defaultImg])
},[])
useEffect(()=>{
  setGetImg(selectedImages)
},[selectedImages])

  return (
    <section className=" relative">

      <label className={` mx-auto my-0 flex  flex-col justify-center items-center rounded-md cursor-pointer text-lg   border-[1px] border-lightgray  overflow-hidden font-[SF-Pro-Text-Medium]`}>
        <input
          type="file"
          name="images"
          className="imgupload"
          onChange={onSelectFile}
          multiple
          accept="image/png , image/jpeg, image/webp"
        />
        <div className="h-full flex justify-center w-full">
        {selectedImages == "" ? (
           <div className={` flex px-2 gap-2 w-full  items-center border-dashed border-2 rounded-lg p-1 border-[#1B344F]`}>
           <Avatar sx={{ width: 63, height: 63 }}><ADDPHOTO className="w-[17px]" /></Avatar>
           <div className="">
             <p className="leading-[18px] text-[12px] font-[SF-Pro-Text-Regular] font-[510] text-secondaryTxtColor">
               Upload company logo in JPG or PNG. <br /> Max size of 800K
             </p>
           </div>
         </div>
        ) : (
          selectedImages[0] && (
            
            <div className="w-[120px] min-h-[120px]  max-h-[auto] p-2 image h-full flex justify-center">
              <img src={selectedImages[0]}   style={{maxWidth:'100%',height:'auto'}}  alt="upload" />
              <div className="w-full h-full   absolute left-[0%] flex justify-center items-center top-0  ">
             <div className="bg-gray rounded-full  p-2 w-12 h-12 flex justify-center items-center">
             <Cloud/>
             </div>
              </div>
            </div>
          )
        )}
        </div>
      </label>
    </section>
  );
};

export default UploadLogo;
