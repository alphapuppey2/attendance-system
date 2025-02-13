import React from 'react'

type TableProps = {
    className?: string,
    children?: React.ReactNode,
};

function Table({className , children}: TableProps) {
  return (
    <table className={`table-auto ${className} `}>
        {children}
    </table>
  )
}

export default Table