import React from 'react'

type TableBodyProps = {
    className?: string,
    children?: React.ReactNode,
};

function TableBody({className,children}: TableBodyProps) {
  return (
    <tbody className={` ${className} `}>
        {children}
    </tbody>
  )
}

export default TableBody