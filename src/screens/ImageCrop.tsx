import React, { useState, useCallback } from "react";
import { ReactComponent as Cloud } from "../assets/svgs/cloud.svg";
import { ReactComponent as AddIMG } from "../assets/svgs/addimg.svg";
import "../styles/otp.css";
import ImgUploadCrop, {useDebounceEffect,centerAspectCrop,loadImage} from '../components/ImgUploadCrop'
import { canvasPreview } from '../components/Temp1'
import Exit from "../assets/svgs/exit.svg";
import IMage from "../assets/img/34-Add-image.png";
import { ReactComponent as Newlogo } from "../assets/svgs/newlogo.svg";
import {  Avatar, Slider} from "@mui/material";

import { ReactComponent as Backarrow } from "../assets/svgs/leftarrooooo.svg";

import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from 'react-image-crop'
import Button from "../components/Button";
import Svg from "../components/Svg";

const defaultSrc =
  "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

interface IPops {
  handleNext: any;
  handleBack: any;
}

export const ImageCrop: React.FC<IPops> = ({ handleNext,handleBack }) => {
  const [image, setImage] = useState(defaultSrc);
  const [cropData, setCropData] = useState("#");
  const [upload, setUpload] = useState(false);
  const [cropper, setCropper] = useState<any>();
  const [imgSrc, setImgSrc] = useState('')
  const [ErrorOn, setError] = useState(false)

  const [imageDimensions, setImageDimensions] = useState<any>({
    height: "",
    width: "",
  });


  const validationIMg = (img: any) => {
    if (!img.name.match(/\.(png)$/)) {
      setError(true)
      return false;
    } else {
      // if(
      //   imageDimensions?.width == 1024 && imageDimensions?.height == 1024  ){
      //     return true;;
      // }else{
      //   alert('select 1024% x 1024% resolution img')
      //   return false
      // }
      setError(false)
      return true;
    }
  };
  const [uploadProgress, setUploadProgress] = useState(0);

  const onChange = (e: any) => {
    setUpload(false)
    setUploadProgress(0);
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
  
    if (!validationIMg(files[0])) {
      setUpload(false);
      return
    }   
    const xhr = new XMLHttpRequest();
    xhr.open('POST', process.env.REACT_APP_API_URL + '/shop/app-logo', true);
    // Set the authorization header
    xhr.setRequestHeader('Authorization', 'bearer '+ localStorage.getItem("token"));
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const progressPercentage:any = Math.round((event.loaded / event.total) * 100);
        setUploadProgress(progressPercentage);
      }
    };
    xhr.onload = () => {
      // Handle response from server here
    };
    xhr.onerror = () => {
      // Handle error here
    };
     
    xhr.send(files[0]);
  
    const reader = new FileReader();
    reader.onload = () => {
      setImgSrc(reader.result as any);
    };
    reader.readAsDataURL(files[0]);
    setUpload(true)
  };
  
  const [selected, setSelected] = useState(false);
  const handlerSubmit = () => {
    if(cropData != "#"){
      localStorage.setItem("businesslogo", JSON.stringify(cropData));
      handleNext();
    }
  };
  const [crop, setCrop] = useState<any>()


  const CropImg: React.FC<any> = useCallback(
    ({ children }) => {
      return (
        <div className=" z-30 fixed w-[100%] h-[100%] left-0 pt-6 top-[0%] flex justify-center items-center bg-[#87888d8f]">
          <div className="w-full">
            <div className="">
              <div className="bg-contentBackground md:h-[33rem] xl:h-[28rem] h-[35rem] lg:h-[33rem] rounded-3xl py-8 px-8 w-[100%] xl:w-[30%] md:w-[35%] lg:w-[40%] mx-auto my-0 ">
                <div className="">
                  <div className="flex justify-between items-start">
                  <div className="flex gap-2">
                    <Newlogo/>
                    <div className="flex flex-col">
                    <h1 className="tracking-[-0.01em] font-[700]    text-[18px] text-mainTextColor">
                    Add your logo
                  </h1>
                  <p className="text-[14px] font-[510] tracking-[-0.01em] text-secondaryTxtColor">Upload a 2080 x 1024px image for best results.</p>
                    </div>
                  </div>
                  <img src={Exit} className="cursor-pointer" alt="" onClick={()=>(setUploadProgress(0),setCropData("#"),setUpload(false))} />
                  </div>
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    },
    [selected]
  );
  
  const previewCanvasRef = React.useRef<HTMLCanvasElement>(null)
  const imgRef = React.useRef<HTMLImageElement>(null)
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const [scale, setScale] = useState<any>(1)
  const blobUrlRef = React.useRef('')
  const [rotate, setRotate] = useState(0)
  const [aspect, setAspect] = useState<number | undefined>(16 / 9)
  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget
      setCrop(centerAspectCrop(width, height, aspect))
    }
  }
  function onDownloadCropClick(e:any) {
    e.preventDefault()
    if (!previewCanvasRef.current) {
      throw new Error('Crop canvas does not exist')
    }

    previewCanvasRef.current.toBlob((blob) => {
      if (!blob) {
        throw new Error('Failed to create blob')
      }
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current)
      }
      blobUrlRef.current = URL.createObjectURL(blob)
      setCropData(blobUrlRef.current)
      setUpload(false);

    })
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate,
        )
      }
    },
    100,
    [completedCrop, scale, rotate,imgSrc],
  )
  const [crops, setCrops] = useState<any>()
  return (
    <div className="py-6 bg-contentBackground">



{upload && (
        <div className="  w-[20%] mx-auto my-0">
                                  <div className={`h-[87px] drop-shadow-xl   overflow-hidden     `}>
                      {uploadProgress==0?(
                    <div className="flex rounded-3xl gap-2 border-2 px-2 py-2 border-secondaryTxtColor border-dashed  items-center">
                        <Avatar sx={{ width: 56, height: 56 ,backgroundColor:'#EFF1F5'}}>
                          <img src={IMage} className="w-5" alt="" />
                        </Avatar>
                        <h1 className="text-[12px] font-[510] tracking-[-0.01em] text-secondaryTxtColor">Upload company logo in JPG or PNG. Max size of 800K</h1>
                          </div>
                      ):(
                        <div className="flex rounded-md gap-2 border border-lightgray border-secondaryTxtColor h-full  items-center">
                    <img
                      style={{ width: "100%",height:'100%' }}
                      src={imgSrc}
                      alt="cropped"
                    />
                        <div className="  absolute top-0 left-0 w-full h-full  flex justify-center items-center ">
                      <div className="bg-secondaryTxtColor p-2 w-12 h-12 rounded-full flex justify-center items-center ">
                        <Cloud />
                      </div>
                    </div>
                  </div>
                      )}
                    <label
                  className="absolute left-0 w-full top-0 h-full z-30 cursor-pointer rounded-md px-8 py-2  overflow-hidden h-full w-full"
                >
                  <input
                    type="file"
                    className="imgupload w-full  rounded-md text-mainTextColor px-8 py-2 mt-8 bg-btnclr"
                    style={{ visibility: "hidden" }}
                    onChange={onChange}
                  />
                </label>
                  </div>
          <div className="">
            <CropImg>
              <div className="mt-4 flex bg-contentBackground justify-center items-center flex-col gap-5">
              {!!imgSrc && (
        
          <ReactCrop aspect={aspect}  onComplete={(c) => setCompletedCrop(c)} className="rounded-2xl w-full" crop={crops} keepSelection={false} onChange={c => setCrops(c)} maxWidth={150} maxHeight={150} minWidth={50} minHeight={50}>
                <img ref={imgRef}
            alt="Crop me"
            src={imgSrc}
            onLoad={onImageLoad} className={`h-44 w-full `} style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }} />
              </ReactCrop>
        
        
            )}
            <canvas
          ref={previewCanvasRef}
          style={{
            border: '1px solid black',
            objectFit: 'contain',
          }}
          className="hidden"
            />
        
            <div className="Crop-Controls w-full">
              <div className="">
                <div className="flex justify-between">
                <h1 className=" text-foreground text-[18px] font-[700] ">Zoom</h1>
                <h1 className=" text-foreground text-[18px] font-[700] ">{Math.floor(((scale - 0.1) * (100 - 1)) / (2.0 - 0.1) + 1)}%</h1>
                
                </div>
              <div className="flex justify-between items-center gap-2 mt-2s">
              {/* <img src={Sub} alt="" onClick={()=>setScale(Number(scale-0.1))} className="w-[10px] h-[2px]" /> */}
                        <Slider
                disabled={!imgSrc}
                aria-label="time-indicator"
                size="small"
                value={scale}
                min={0.1}
                step={0.1}
                max={2.0}
                onChange={(_, value) => setScale(Number(value))}
                sx={{
                  // color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
                  color:'#1642C5',
                  height: 2,
                  '& .MuiSlider-thumb': {
                    width: 19,
                    height: 18,
                    color:'white',
                    border:'6px solid #1642C5',
                    transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                    '&:before': {
                      boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
                    },
                    '&:hover, &.Mui-focusVisible': {
                      // boxShadow: `0px 0px 0px 8px ${
                      //   theme.palette.mode === 'dark'
                      //     ? 'rgb(255 255 255 / 16%)'
                      //     : 'rgb(0 0 0 / 16%)'
                      // }`,
                    },
                    '&.Mui-active': {
                      width: 20,
                      height: 20,
                    },
                  },
                  '& .MuiSlider-rail': {
                    opacity: 0.28,
                  },
                }}
              />
                {/* <img src={Plus} alt="" onClick={()=>setScale(Number(scale+0.1))} className="w-[10px] h-[10px]" /> */}

              </div>
              </div>
              {/* <div className="">
                <h1 className=" text-foreground text-[14px] font-[510]">Straighten</h1>
              <div className="flex  justify-between items-center gap-2 mt-2s">
              <img src={Sub} alt="" onClick={()=>setRotate(Math.min(180, Math.max(-180, Number(rotate-10))))} className="w-[10px] h-[2px]" />

                <Slider
                disabled={!imgSrc}
                aria-label="time-indicator"
                size="small"
                step={1}
                min={0}
                max={180}
                
                value={rotate}
                onChange={(_, value) =>  setRotate(Math.min(180, Math.max(-180, Number(value))))}
                sx={{
                  // color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
                  color:'#1B344F',
                  height: 4,
                  '& .MuiSlider-thumb': {
                    width: 8,
                    height: 8,
                    transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                    '&:before': {
                      boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
                    },
                    '&:hover, &.Mui-focusVisible': {
                      // boxShadow: `0px 0px 0px 8px ${
                      //   theme.palette.mode === 'dark'
                      //     ? 'rgb(255 255 255 / 16%)'
                      //     : 'rgb(0 0 0 / 16%)'
                      // }`,
                    },
                    '&.Mui-active': {
                      width: 20,
                      height: 20,
                    },
                  },
                  '& .MuiSlider-rail': {
                    opacity: 0.28,
                  },
                }}
              />
                <img src={Plus} alt="" onClick={()=>setRotate(Math.min(180, Math.max(-180, Number(rotate+10))))} className="w-[10px] h-[10px]" />

              </div> */}
              {/* </div> */}
            </div>
                <button
                  className="bg-btnclr px-16 py-3 font-[SF-Pro-Text-Bold] tracking-tight w-full rounded-3xl text-btntxtclr"
                  onClick={onDownloadCropClick}
                >
                  Crop and Save
                </button>
              </div>
            </CropImg>
          </div>
        </div>
      )}
      <div>
        {upload == false ? (
          <div className="w-[300px] xl:w-[400px]  rounded-xl  md:w-[400px] lg:w-[400px] mx-auto my-0">
            <div className="text-center">
              <h3 className="text-mainTextColor  tracking-[-0.01em] font-[SF-Pro-Text-Bold] text-[32px] font-[590] mt-4">
                Upload app logo
              </h3>
              <p className="mt-4 text-secondaryTxtColor mb-6 xl:text-sm sm:text-xs tracking-[-0.01em] text-xs md:text-sm lg:text-sm">
                This logo will be displayed as your app's icon in the store
              </p>
            </div>
            <div className="">
              <div
                className={`  ${cropData != "#" ? " " : " h-[160px]  "}   ${
                  !selected
                    ? "xl:w-[40%] lg:w-[45%] md:w-[45%] sm:w-[60%] w-[60%]"
                    : "w-[80%]"
                } mx-auto my-0
         rounded-[40px] flex flex-col  relative ${cropData=='#'&&'bg-lightgray'} justify-center  items-center `}
              >
                {cropData != "#" ? (
                  <div
                    className={`shadow-[0px_2px_33px_rgba(0,0,0,0.05)]  border border-lightgray overflow-hidden   rounded-2xl w-full
                     h-[170px]`}
                  >
                    <img src={cropData} className="rounded-2xl w-full h-full" alt="" />
                    <div className="  absolute top-0 left-0 w-full h-full  flex justify-center items-center ">
                      <div className="bg-blue-700 p-2 w-12 h-12 rounded-full flex justify-center items-center ">
                        <Cloud />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col justify-center items-center">
                    <AddIMG />
                    <p className="tracking-tight text-[14px] font-[700] text-foreground mt-2">
                      App logo
                    </p>
                  </div>
                )}
              
              <section className=" absolute w-full h-full">
                <label
                  className="mx-auto my-0 flex flex-col   justify-center items-center  cursor-pointer text-lg   w-full text-btntxtclr font-[SF-Pro-Text-Medium] rounded-md px-8 py-2    overflow-hidden"
                  style={{ height: "100% " }}
                >
                  <input
                    type="file"
                    name="app_logo_image_name"
                    className="imgupload w-full  rounded-md text-mainTextColor px-8 py-2 mt-8"
                    style={{ visibility: "hidden" }}
                    onChange={(e:any)=>(setImgSrc(''),onChange(e))}
                  />

                  
                </label>
              </section>
              </div>
              {/* <ImgUploadCrop setGetLogo={()=>{}}/> */}
              <div className="w-[75%] md:w-[50%] text-center xl:w-[55%] lg:w-[50%]  mx-auto my-0">


                <p className="mt-2 text-secondaryTxtColor text-[14px] font-[700] tracking-[-0.01em] font-[SF-Pro-Text-Regular]">
                  Maximun file size:{" "}
                  <span className={`${ErrorOn?'text-red-600':'text-mainTextColor'} text-[14px] font-[700]  font-[SF-Pro-Text-Medium]`}>200KB</span>
                </p>
                <p className={`mt-2 text-secondaryTxtColor text-[14px] font-[700] tracking-[-0.01em] font-[SF-Pro-Text-Regular]`}>
                  Image size:{" "}
                  <span className={`${ErrorOn?'text-red-600':'text-mainTextColor'}   text-[14px] font-[700] font-[SF-Pro-Text-Medium]`}>
                    1024x1024px
                  </span>
                </p>
                <p className="mt-2 text-secondaryTxtColor tracking-[-0.01em] font-[SF-Pro-Text-Regular] text-[14px] font-[700]">
                  Allowed file extensions:{" "}
                  <span className={`${ErrorOn?'text-red-600':'text-mainTextColor'}   font-[SF-Pro-Text-Medium] text-[14px] font-[700] tracking-[-0.01em]`}>.png</span>
                </p>
                {ErrorOn&&<p className="text-red-600 text-[14px] font-[700]  font-[SF-Pro-Text-Regular] mt-4 tracking-[-0.01em]">Upload Valid Image</p>}
                
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
        <div className="w-full  flex justify-end sm:justify-center mt-8 md:justify-center lg:justify-center xl:justify-center relative">
          <button
            onClick={handlerSubmit}
            className={`w-[50%] md:w-[330px] xl:w-[420px] lg:w-[420px] ${cropData != "#" ?'':'opacity-50'}  font-[SF-Pro-Text-Bold] bg-btnclr tracking-tight font-[700] text-[16px]   text-btntxtclr px-6 rounded-3xl py-3`}
          >
            {cropData != "#" ?'Continue':'Upload'}
          </button>
          
        </div>
        <div className="w-[90%] mx-auto my-0 mb-4">
        <Button  >
                    <button className="flex items-center w-[120px] h-[45px] gap-2 justify-center border-darkblue border-[2px] px-6 py-2 rounded-3xl">
                <Svg componentName={Backarrow} color='' width="20" height="10"/>
                      <span className="text-[14px] font-[400] leading-[20px] tracking-[-0.01em] text-darkblue font-[SF-Pro-Text-Regular]">
                        Back
                      </span>
                    </button>
                  </Button>
        </div>
    </div>
  );
};

export default ImageCrop;
