import React from 'react'

function Topbar() {
  return (
    <div className='topbar flex absolute top-0 w-full h-12 bg-gray-800 text-white items-center p-5 justify-between'>
        <div className="topbarTitle">
            <span>Attendance system</span>
        </div>
        <div className="topbarNavMenu ">
            <ul className='flex space-x-5 uppercase'>
                <li>export</li>
                <li>import</li>
            </ul>
        </div>
    </div>
  )
}

export default Topbar