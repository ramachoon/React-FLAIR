import React from 'react'
import '../styles/Checkebox.css'

interface IPops {
    checked:boolean;
    onClick:React.MouseEventHandler<HTMLInputElement>
}

const Checkbox:React.FC<IPops> = ({checked,onClick}) => {
  return (
    <div className='h-[2rem] '>
    <label className="container">
    <input type="checkbox" checked={checked} onClick={onClick}/>
    <span className="checkmark"></span>
    </label>
    </div>
  )
}

export default Checkbox