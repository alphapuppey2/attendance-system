import React from 'react'

type TableCellProps = {
    isHeader?: boolean,
    className?: string, 
    colSpan?: number,
    rowSpan?: number,
    children?: React.ReactNode,
};

function TableCell({isHeader = false, children,colSpan,className,rowSpan}: TableCellProps) {
  const Tag = isHeader ? 'th' : 'td';
  const classTag = isHeader ? `text-[12px] tracking-wide uppercase py-2 ${className}` : `text-sm ${className}`;
    return (
        <Tag className={classTag} rowSpan={rowSpan} colSpan={colSpan}>
            {children}
        </Tag>
    )
}

export default TableCell