import hexRgb from 'hex-rgb';
import React,{useEffect, useState} from 'react'
import { RgbaColor, RgbaColorPicker } from "react-colorful";
import rgbHex from 'rgb-hex';
import "../styles/Color.css"


export const getHexColor = (rgba:RgbaColor)=>{
    const string = Array.from(Object.values(rgba)).join(',')
    const rgbaColor = "rgba(" + string + ")"
    return   rgbHex(rgbaColor)
}
export const getgrbaobj = (hex:string)=>{
    const {red:r,green:g,blue:b,alpha:a} = hexRgb((hex));
    return {r,g,b,a}
}

interface IPops{
    handlerChanger:Function;
    r:number;
    g:number;
    a:number;
    b:number;
}
const ColorPicker:React.FC<IPops> = ({handlerChanger,r,g,b,a}) => {
    const [selectedColor,setSelectedColor] = useState<RgbaColor>({r,g,b,a})
    const [colorInput,setColorInput] = useState<string>(getHexColor(selectedColor))
    const [opocity,setOpocty] = useState<string>('100')
    const [Switch,setSwitch] = useState<boolean>(false)
    const handlerChange = (value:RgbaColor)=>{
        let newValue = value.a.toLocaleString().slice(2)
        if(value.a ==0){
            setOpocty(newValue+0)
            }
        else if(value.a ==1){
            setOpocty(newValue+100)
            
        }else{
            setOpocty(newValue)
        }
        setColorInput(getHexColor(value))
        setSelectedColor(value)
    }
    const handleronColorINput = (e:React.ChangeEvent<HTMLInputElement>)=>{
        try {
            const {value} = e.target;
            setColorInput(value)
            const rgbaColor = getgrbaobj(value)
            setSelectedColor(rgbaColor)
        } catch (error) {
            
        }
    }
    const handleronColorINputopo = (e:React.ChangeEvent<HTMLInputElement>)=>{
        try {
            const {value} = e.target;
            setOpocty(value)
            let newValue = '0.'+value
            setColorInput(colorInput.slice(0,7)+value)
            setSelectedColor({...selectedColor,a:parseFloat(newValue)})
        } catch (error) {
            
        }
    }
    useEffect(()=>{
        handlerChanger(colorInput)
    },[colorInput])
    const useOutsideClick = (callback:Function) => {
        const ref:any = React.useRef();
        React.useEffect(() => {
            const handleClick = (event:any):void => {
                if (ref.current && !ref.current.contains(event.target)) {
                    callback();
                }
            };
            document.addEventListener('click', handleClick);
            return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [ref]);
        return ref;
    };
    const handleClickOutside = () => {
        setSwitch(false)
    };
    const ref = useOutsideClick(handleClickOutside);
    const handleClick = () => {
        setSwitch(true)
    };

    return (
        <div ref={ref} className='relative'>
        <div  onClick={handleClick} className=" w-8 border border-lightgray h-8 my-2 rounded-full" style={{backgroundColor:'#'+colorInput}}></div>
      {Switch&&<section  className="absolute left-10 top-10 z-20 bg-background px-3 py-3 shadow-[0_6px_12px_#999] rounded-md custom-layout  example">
        <RgbaColorPicker  color={selectedColor} onChange={handlerChange} />
       <div className="flex gap-1 py-1  mt-2">
       <div className="border px-2 border-lightgray py-1 rounded-md w-[70%]">
        <span className='text-secondaryTxtColor pr-1'>#</span>
       <input type="text" className=' w-[70%] ' maxLength={6}  onBlur={()=>setColorInput(getHexColor(selectedColor))}  onChange={(e)=>(handleronColorINput(e))} value={colorInput} />
       </div>
       <div className="px-2 flex items-center border border-lightgray rounded-md w-[30%]">
        <input type="text" className=' w-[60%]' onBlur={()=>setColorInput(getHexColor(selectedColor))} onChange={handleronColorINputopo} value={opocity} />
        <span className='text-secondaryTxtColor pr-1'>%</span>
       </div>
       </div>
      </section>}
    </div>
  )
}

export default ColorPicker



 
 