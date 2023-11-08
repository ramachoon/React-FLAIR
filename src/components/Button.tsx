import React from 'react'

const Button = ({onClick,children,className}:any) => {
  return (
    <button
        onClick={onClick}
        className={className}
        >
        {children}
    </button>
  )
}

export default Button