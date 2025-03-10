"use client";
import React from 'react'

type ButtonProps = {
    children: React.ReactNode,
    className?: string,
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void,
};

function Button({children,className,onClick }: ButtonProps) {
  return (
    <button className={`bg-blue-500 hover:bg-blue-700 text-xs text-white font-bold py-1 px-4 ${className}`} 
    onClick={onClick}>
        {children}
    </button>
  )
}

export default Button