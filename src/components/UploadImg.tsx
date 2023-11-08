import React, { useEffect, useState } from "react";
import Cloud from '../assets/svgs/cloud.svg'
interface IMG {
  heightimg?: any;
  widthimg?: any;
  defaultImg?:any;
  setGetImg?:any;
  getImg?:any
}
const UploadImg:React.FC<IMG> = ({heightimg,widthimg,defaultImg,setGetImg,getImg}) => {
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
    // FOR BUG IN CHROME
    event.target.value = "";
  };
useEffect(()=>{
  setSelectedImages([defaultImg])
},[])
useEffect(()=>{
  if(getImg == undefined){
    
  }else{
    setGetImg(selectedImages)
  }
},[selectedImages])
  return (
    <section className=" relative">

      <label className={` flex flex-col justify-center items-center rounded-md cursor-pointer text-lg   border-[1px] border-lightgray  overflow-hidden font-[SF-Pro-Text-Medium]`}>
        <input
          type="file"
          name="images"
          className="imgupload"
          onChange={onSelectFile}
          multiple
          accept="image/png , image/jpeg, image/webp"
        />
        <div className="h-full w-full flex justify-center">
        {selectedImages == "" ? (
          <div className="bg-gray rounded-full flex justify-center items-center p-2 w-12 h-12">
            <img src={Cloud} alt="" />
          </div>
        ) : (
          selectedImages[0] && (
            <div className="w-[120px] min-h-[120px]  max-h-[auto] p-2 image h-full flex justify-center">
              <img src={selectedImages[0]} style={{maxWidth:'100%',height:'auto'}}  alt="upload" />
              <div className="w-full h-full   absolute left-[0%] flex justify-center items-center top-0  ">
             <div className="bg-gray rounded-full  p-2 w-12 h-12 flex justify-center items-center">
             <img src={Cloud} alt="" />
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

export default UploadImg;
