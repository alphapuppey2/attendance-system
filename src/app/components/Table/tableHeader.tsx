import React, { Children } from 'react'


type TableHeaderProps = {
    className?: string,
    children?: React.ReactNode,
};
function TableHeader({className,children}: TableHeaderProps) {
  return (
    <thead className={`bg-gray-800 text-white ${className} `}>
        {children}
    </thead>
  )
}

export default TableHeader