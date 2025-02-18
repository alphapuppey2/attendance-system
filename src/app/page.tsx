"use client";
import Table from "./components/Table/table";
import TableHeader from "./components/Table/tableHeader";
import TableCell from "./components/Table/tableCell";
import TableRow from "./components/Table/tableRow";
import TableBody from "./components/Table/tableBody";
import Button from "./components/Button";
// import { useState } from "react";
import ExportModal from "./components/ModalComponents/exportModal";

interface Attendee {
  IDnumber: string;
  name: string;
  course: string;
  yearLevel: string;
  timeIn: string;
  timeOut: string;
}

export default function Home() {

  // const [loading , isLoading] = useState(false);

  const attendees: Attendee[] = []; 
 
  const sampleData:Attendee = {
    IDnumber: "123456",
    name: "John Doe",
    course: "BSIT",
    yearLevel: "4",
    timeIn: "2025-02-13T08:00:00Z",
    timeOut: "2025-02-13T10:30:00Z"
  }

  const addNewStudent = async() =>{
    // isLoading(true);

    try{
      const respo = await fetch("/api/addData",{
        method:"POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify(sampleData)
      })
      const dataRes = await respo.json();

      if(dataRes){
        alert("your Data is being save to the database");
      }
      else{
        alert("user Error");
      }

    }catch(err){
      console.error("Request failed:", err);
      alert("Something went wrong!");
    }
    // finally {
    // isLoading(false);
    // }


  }
  return (
    <div className="h-screen">
      <ExportModal />
      <div className="nameCotent h-full pt-12">
        <div className="searchID flex justify-center h-15 p-2">
          <form
            action="#"
            method="get"
            className="rounded flex overflow-hidden"
          >
          
            <input type="text" placeholder="Search ID" className="p-2" />
            <Button onClick={addNewStudent}>Search</Button>
          </form>
        </div>
        <div className="attendees relative h-[calc(100vh-105px)] flex flex-col p-2">
          <div className="titleHeader p-2">
            <span className="text-xl font-semibold tracking-wide">
              Attendees
            </span>
          </div>
          <div className="tableContainer overflow-y-auto h-full rounded">
            <Table className="w-full p-2">
              <TableHeader>
                <TableRow className="text-left sticky top-0 bg-slate-300 text-slate-950">
                  <TableCell isHeader className="p-5">id number</TableCell>
                  <TableCell isHeader>name</TableCell>
                  <TableCell isHeader>year level</TableCell>
                  <TableCell isHeader>Course</TableCell>
                  <TableCell isHeader>Time in</TableCell>
                  <TableCell isHeader>time out</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody className="overflow-y-auto">
                {
                  attendees.length > 0 ? attendees.map((attendee) => {
                    return (
                      <TableRow key={attendee.IDnumber}>
                        <TableCell className="pl-5">{attendee.IDnumber}</TableCell>
                        <TableCell>{attendee.name}</TableCell>
                        <TableCell>{attendee.yearLevel}</TableCell>
                        <TableCell>{attendee.course}</TableCell>
                        <TableCell>{attendee.timeIn}</TableCell>
                        <TableCell>{attendee.timeOut}</TableCell>
                      </TableRow>
                    );
                  }) : 
                  <TableRow>
                     <TableCell colSpan={6} className="text-center text-gray-500 bg-slate-100" >No attendees found</TableCell>
                  </TableRow>
                   
                }
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
