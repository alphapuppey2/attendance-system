import React from 'react'

type TableRowProps = {
    className?: string,
    children?: React.ReactNode,
};
function TableRow({className ,children}: TableRowProps) {
  return (
    <tr className={` ${className ? className : "" }`}>
        {children}
    </tr>
  )
}

export default TableRow