import React from 'react'

type TableCellProps = {
    isHeader?: boolean,
    children?: React.ReactNode,
};

function TableCell({isHeader = false, children}: TableCellProps) {
  const Tag = isHeader ? 'th' : 'td';
    return (
        <Tag className={`border px-4 py-2`}>
            {children}
        </Tag>
    )
}

export default TableCell