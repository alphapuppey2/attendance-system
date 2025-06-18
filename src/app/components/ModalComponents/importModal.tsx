import React, { useEffect } from "react";
import { HiMiniXMark } from "react-icons/hi2";
import { useState } from "react";
import * as XLSX from "xlsx";

interface ImportModalProps {
    onClose: () => void;
}

type ImportType = Record<string, any>;

function ImportModal({ onClose }: ImportModalProps) {
  const [data, setData] = useState<ImportType[]>([]);



  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataRet = event.target?.result;
        const workbook = XLSX.read(dataRet, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const result: ImportType[] = XLSX.utils.sheet_to_json(sheet);
        setData(result);
      };
      reader.readAsText(file);
    }
  }
  const saveDB = async () => {
    try{
      const response = await fetch("/api/importData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({data}),
      });
      await response.json();
      onClose();
    }catch(err){
      console.error("Request failed:", err);
      alert("Something went wrong! Please try again");
    }
  };
  return (
    <div className="absolute z-10 h-screen w-full -top-12 bg-black flex justify-center items-center bg-opacity-50">
      <div className="flex flex-col w-[25rem] justify-betweem bg-white p-5 rounded">
        <div className="modalHeader flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Export to excel</h1>
        <button onClick={onClose}>
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
          <form action="" className="flex w-full justify-evenly my-5" method="POST" onSubmit={saveDB}>
            <label htmlFor="fileName" className="flex justify-center flex-col">
              <span className="block text-sm text-center">File name</span>
            </label>
            <input
              type="file"
              name="fileName"
              id="fileName"
              accept=".xlsx, .xls, .csv"
              onChange={handleFileUpload}
              className="border p-2 rounded text-sm"
            />
          </form>

          <div className="button-group flex justify-end mt-2">
            <button className="bg-gray-200 p-2 rounded" onClick={onClose}>Cancel</button>
            <button className="bg-blue-500 text-white p-2 rounded ml-2" onClick={saveDB}>
              Import
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImportModal;
