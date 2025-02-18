import React from "react";
import { HiMiniXMark } from "react-icons/hi2";


function ExportModal() {
  return (
    <div className="absolute z-10 top-0 left-0 w-full h-full bg-black bg-opacity-50">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5 rounded">
        <div className="modalHeader flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Export to excel</h1>
        <button >
        <HiMiniXMark />
        </button>
        </div>
        <div className="divider">
          <hr className="bg-gray-200 my-2" />
        </div>
        <p className="text-sm text-gray-500">
          This will export the table data to excel
        </p>
        <div className="flex flex-col justify-end">
          <form action="" className="flex w-full my-5" method="post">
            <label htmlFor="fileName" className="flex justify-center flex-col">
              <span className="block text-sm text-center">File name</span>
            </label>
            <input
              type="file"
              name="fileName"
              id="fileName"
              accept=".xlsx .xls .csv"
              className="border p-2 rounded "
            />
          </form>

          <div className="button-group flex justify-end mt-2">
            <button className="bg-gray-200 p-2 rounded">Cancel</button>
            <button className="bg-blue-500 text-white p-2 rounded ml-2">
              Export
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExportModal;
