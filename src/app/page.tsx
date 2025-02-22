"use client";
import Table from "./components/Table/table";
import TableHeader from "./components/Table/tableHeader";
import TableCell from "./components/Table/tableCell";
import TableRow from "./components/Table/tableRow";
import TableBody from "./components/Table/tableBody";
import Button from "./components/Button";
import React, { useState } from "react";

interface Attendee {
  IDnumber: string;
  name: string;
  course: string;
  yearLevel: string;
  timeIn: string;
  timeOut: string;
}

export default function Home() {
  const [loading, isLoading] = useState(false);
  const [notfound, setNotFound] = useState("");
  const [inputValue , setInputValue] = useState("");
  const [allAttendees, setAttendees] = useState<Attendee[]>([]);


  const addNewStudent = async (event: React.FormEvent) => {
    event?.preventDefault();
    isLoading(true);

    const regex = /^[0-9]*S/;
    try {
      // if(inputValue === "" ||  !regex.test(inputValue)){
      //   console.log("returned" ,inputValue === "");
      //   return
      // }

      // await new Promise((resolve)=>setTimeout(resolve,2000));
      const respo = await fetch("/api/addAttendees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({IDnumber : inputValue}),
      });
      const dataRes = await respo.json();

      console.log(dataRes.attendee);

      if (dataRes) {
        setAttendees((prev)=>[...prev, dataRes.attendee]);
      } else {
        setNotFound("No Attendee Found");
        setInputValue("");
      }
    } catch (err) {
      console.error("Request failed:", err);
      alert("Something went wrong!");
    } finally {
      isLoading(false);
    }
  };
  return (
    <div className="h-full w-full flex flex-col">
      <div className="nameCotent">
        <div className="searchID flex flex-col justify-center items-center h-15 p-2">
          <form
            action="#"
            method="get"
            className="rounded flex overflow-hidden"
            onSubmit={addNewStudent}
          >
            <input type="text" 
            placeholder="Search ID"
            className="p-2" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}/>

            <Button onClick={addNewStudent}>Search</Button>
          </form>
            
          {notfound && (
             <div className="message text-red-500 font-medium border p-2 mt-2 border-red-500 rounded-md bg-red-300/50">
             <p>{notfound}</p>
           </div>
          )} 
        </div>
        <div className="attendees flex flex-col p-2">
          <div className="titleHeader p-2">
            <span className="text-xl font-semibold tracking-wide">
              Attendees
            </span>
          </div>
          <div className="tableContainer bg-blue-900 flex  h-full rounded">
            {loading ? (
              <div className="flex justify-center items-center w-full h-full">
                <p className="text-2xl text-white">Loading...</p>
              </div>
            ) : (
              <Table className="w-full p-2">
                <TableHeader>
                  <TableRow className="text-left sticky top-0 bg-slate-300 text-slate-950">
                    <TableCell isHeader className="p-5">
                      id number
                    </TableCell>
                    <TableCell isHeader>name</TableCell>
                    <TableCell isHeader>year level</TableCell>
                    <TableCell isHeader>Course</TableCell>
                    <TableCell isHeader>Time in</TableCell>
                    <TableCell isHeader>time out</TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody className="overflow-y-auto">
                  {allAttendees && allAttendees.length > 0 ? (
                    allAttendees.map((attendee) => {
                      return (
                        <TableRow key={attendee.IDnumber}>
                          <TableCell className="pl-5">
                            {attendee.IDnumber}
                          </TableCell>
                          <TableCell>{attendee.name}</TableCell>
                          <TableCell>{attendee.yearLevel}</TableCell>
                          <TableCell>{attendee.course}</TableCell>
                          <TableCell>{attendee.timeIn}</TableCell>
                          <TableCell>{attendee.timeOut}</TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center text-gray-500 bg-slate-100"
                      >
                        No attendees found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
