import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import LOGONAME from "../assets/img/othersImg/Union.png";
import { ReactComponent as Cloud } from "../assets/svgs/upload 1.svg";
import { ReactComponent as Newlogo } from "../assets/svgs/newlogo.svg";

import Plus from "../assets/img/plus.png";
import Sub from "../assets/img/sub.png";
import IMage from "../assets/img/34-Add-image.png";
import "../styles/otp.css";
import { canvasPreview } from './Temp1'
import Exit from "../assets/svgs/exit.svg";
import CircularProgress from '@mui/material/CircularProgress';


import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { Avatar, Box, Slider, Typography } from "@mui/material";



interface IPops {
  setGetLogo: any;
  getImg?: any
}
export function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number,
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  )
}

export function useDebounceEffect(
  fn: () => void,
  waitTime: number,
  deps?: any,
) {
  useEffect(() => {
    const t = setTimeout(() => {
      fn.apply(undefined, deps)
    }, waitTime)

    return () => {
      clearTimeout(t)
    }
  }, deps)
}
export const loadImage = (setImageDimensions: any, imageUrl: any) => {
  const img = new Image();
  img.src = URL.createObjectURL(imageUrl);

  img.onload = () => {
    setImageDimensions({
      height: img.height,
      width: img.width,
    });
  };
  img.onerror = (err) => {
    console.error(err);
  };
};
export const CircularProgressWithLabel: React.FC<any> = (props) => {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}
export const ImgUploadCrop: React.FC<IPops> = ({ setGetLogo, getImg }) => {
  const [cropData, setCropData] = useState<any>(getImg || "");
  const [upload, setUpload] = useState(false);
  const [imageDimensions, setImageDimensions] = useState<any>({
    height: '',
    width: ''
  });


  useEffect(() => {
    setGetLogo(cropData)
  }, [cropData])
  const validationIMg = (img: any) => {
    if (
      !img.name.match(
        /\.(png|jpeg|jpg)$/i
      )
    ) {
      setError(true)
      return false;
    } else {
      setError(false)
      return true
    }

  };
  // const onChange = (e: any) => {
  //   e.preventDefault();
  //   let files;
  //   if (e.dataTransfer) {
  //     files = e.dataTransfer.files;
  //   } else if (e.target) {
  //     files = e.target.files;
  //   }

  //   loadImage(setImageDimensions, files[0]);

  //   if (!validationIMg(files[0])) {
  //     setUpload(false);
  //     // alert('valid img')
  //   } else {
  //     setUpload(true);
  //   }
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     setImgSrc(reader.result as any)
  //     // setImage(reader.result as any);
  //   };
  //   reader.readAsDataURL(files[0]);
  // };
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
    xhr.open('POST', '/upload', true);
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const progressPercentage: any = Math.round((event.loaded / event.total) * 100);
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


  const CropImg: React.FC<any> = useCallback(
    ({ children }) => {
      return (
        <div className=" z-30 fixed w-[100vw] h-[100%] left-0 pt-6 top-[0%] flex justify-center items-center bg-[#87888d8f]">
          <div className="w-full">
            <div className="">
              <div className="bg-contentBackground md:h-[33rem] xl:h-[28rem] h-[35rem] lg:h-[33rem] rounded-3xl py-8 px-8 w-[100%] xl:w-[27%] md:w-[35%] lg:w-[35%] mx-auto my-0 ">
                <div className="">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-2">
                      <Newlogo />
                      <div className="flex flex-col">
                        <h1 className="tracking-[-0.01em] font-[700]    text-[18px] text-mainTextColor">
                          Add your logo
                        </h1>
                        <p className="text-[14px] font-[510] tracking-[-0.01em] text-secondaryTxtColor">Upload a 2080 x 1024px image for best results.</p>
                      </div>
                    </div>
                    <img src={Exit} alt="" onClick={() => (setUploadProgress(0), setCropData(""), setUpload(false))} />
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

  const [imgSrc, setImgSrc] = useState('')
  const previewCanvasRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const [scale, setScale] = useState<any>(1)
  const blobUrlRef = useRef('')
  const [rotate, setRotate] = useState(0)
  const [error, setError] = useState(false)
  const [aspect, setAspect] = useState<number | undefined>(16 / 9)

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget
      setCrop(centerAspectCrop(width, height, aspect))
    }
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
    [completedCrop, scale, rotate],
  )
  function onDownloadCropClick(e: any) {
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






  return (
    <div className="bg-contentBackground w-full">

      {upload && (
        <div className="  w-[full]">
          <div className={`h-[87px]    overflow-hidden     `}>
            {uploadProgress == 0 ? (
              <div className="flex rounded-3xl gap-2 border-[1px] px-2 py-2 border-secondaryTxtColor border-dashed  items-center">
                <Avatar sx={{ width: 56, height: 56, backgroundColor: '#EFF1F5' }}>
                  <img src={IMage} className="w-5" alt="" />
                </Avatar>
                <h1 className="text-[12px] font-[510] tracking-[-0.01em] text-secondaryTxtColor">Upload company logo in JPG or PNG. Max size of 800K</h1>
              </div>
            ) : (
              <div className="flex rounded-md gap-2 border border-lightgray border-secondaryTxtColor h-full  items-center">
                <img
                  style={{ width: "100%", height: '100%' }}
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
              className="absolute left-0 w-full top-0 h-full z-20 cursor-pointer rounded-md px-8 py-2  overflow-hidden h-full w-full"
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
                  <ReactCrop aspect={aspect} onComplete={(c) => setCompletedCrop(c)} className="rounded-2xl w-full" crop={crop} keepSelection={false} onChange={c => setCrop(c)} maxWidth={150} maxHeight={150} minWidth={50} minHeight={50}>
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
                      <h1 className=" text-[#1642C5] text-[18px] font-[700] ">{Math.floor(((scale - 0.1) * (100 - 1)) / (2.0 - 0.1) + 1)}%</h1>

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
                          color: '#1642C5',
                          height: 2,
                          '& .MuiSlider-thumb': {
                            width: 19,
                            height: 18,
                            color: 'white',
                            border: '6px solid #1642C5',
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
          <div className="w-auto">
            <div className="">
              <div
              >
                {cropData == '' ? (
                  <div className={`relative h-[87px] drop-shadow-xl   overflow-hidden   rounded-md  `}>
                    <div className={`flex rounded-[3rem] gap-2 border-[1px] px-2 py-2 ${error ? 'border-red-600' : 'border-[#1642C5]'} border-dashed  items-center`}>
                      {uploadProgress == 0 ? (
                        <>
                          <Avatar sx={{ width: 56, height: 56, backgroundColor: '#EFF1F5' }}>
                            <img src={IMage} className="w-5" alt="" />

                          </Avatar>
                          <h1 className="text-[12px] leading-[17px] tracking-[-0.01em] font-[510] font-[SF-Pro-Text-Regular] text-secondaryTxtColor">Upload company logo in JPG or PNG. Max size of 800K</h1>
                        </>
                      ) : (
                        <>
                          <CircularProgressWithLabel value={uploadProgress} />
                          <h1 className="text-[12px] font-[510] font-[SF-Pro-Text-Medium] text-secondaryTxtColor">Uploading image...</h1>
                        </>
                      )}
                    </div>
                    <label
                      className="absolute left-0 w-full top-0 h-full z-20 cursor-pointer rounded-md px-8 py-2  overflow-hidden"
                    >
                      <input
                        type="file"
                        className="imgupload w-full  rounded-md text-mainTextColor px-8 py-2 mt-8 bg-btnclr"
                        style={{ visibility: "hidden" }}
                        onChange={onChange}
                      />
                    </label>
                    {error && <h1 className="text-[12px] tracking-tight font-[400] text-red-600">Failed to upload image, the format is not supported</h1>}
                  </div>
                ) : (
                  <div className={`relative  drop-shadow-xl  h-[5rem] overflow-hidden   rounded-md  `}>
                    <div className="flex rounded-[2rem] gap-2 border-2 px-2 py-2 border-lightgray h-full  items-center">
                      <img
                        style={{ width: "100%", height: '100%' }}
                        src={cropData}
                        className="rounded-[2rem]"
                        alt="cropped"
                      />
                      <div className="  absolute top-0 left-0 w-full h-full  flex justify-center items-center ">
                        <div className="bg-lightgray p-2 w-14 h-14 rounded-full flex justify-center items-center ">
                          <Cloud width={20} height={20} />
                        </div>
                      </div>
                    </div>
                    <label
                      className="absolute left-0  top-0 h-full z-20 cursor-pointer rounded-md px-8 py-2  overflow-hidden h-full w-full"
                    >
                      <input
                        type="file"
                        className="imgupload w-full  rounded-md text-mainTextColor px-8 py-2 mt-8 bg-btnclr"
                        style={{ visibility: "hidden" }}
                        onChange={onChange}
                      />
                    </label>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ImgUploadCrop;
