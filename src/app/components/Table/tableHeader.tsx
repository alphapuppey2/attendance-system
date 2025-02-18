import React from 'react'


type TableHeaderProps = {
    className?: string,
    children?: React.ReactNode,
};
function TableHeader({className,children}: TableHeaderProps) {
  return (
    <thead className={`text-white ${className} `}>
        {children}
    </thead>
  )
}

export default TableHeader