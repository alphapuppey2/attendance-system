import Link from "next/link";
import React from "react";

function Topbar() {
  return (
    <div className="topbar flex fixed z-10 top-0 w-full h-[50px] bg-gray-800 text-white items-center p-5 justify-between">
      <div className="topbarTitle">
        <span>Attendance system</span>
      </div>
      <div className="topbarNavMenu ">
        <ul className="flex space-x-3 uppercase">
          <li>
            <Link href="/" className="text-[12px] p-1 rounded-sm hover:bg-blue-500 animation ease-in duration-100">
              Home
              </Link>
          </li>
          <li>
            <Link href="/StudentList" className="text-[12px] p-1 rounded-sm hover:bg-blue-500 animation ease-in duration-100">
              Dataset
              </Link>
          </li>
          <li>
            <a href="" className="text-[12px] p-1 rounded-sm hover:bg-blue-500 animation ease-in duration-100">
              import
              </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Topbar;
