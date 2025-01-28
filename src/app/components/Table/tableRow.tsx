import React from 'react'

type TableRowProps = {
    className?: string,
    children?: React.ReactNode,
};
function TableRow({className,children}: TableRowProps) {
  return (
    <tr className={`bg-gray-100 text-gray-900 ${className}`}>
        {children}
    </tr>
  )
}

export default TableRow