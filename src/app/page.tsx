"use client";
import Table from "./components/Table/table";
import TableHeader from "./components/Table/tableHeader";
import TableCell from "./components/Table/tableCell";
import TableRow from "./components/Table/tableRow";
import TableBody from "./components/Table/tableBody";
import Button from "./components/Button";
import React, { useEffect, useState } from "react";

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
  const [inputValue, setInputValue] = useState("");
  const [allAttendees, setAttendees] = useState<Attendee[]>([]);

  const fetchAllAttendees = async () => {
    try {
      isLoading(true);
      const respo = await fetch("/api/getAttendees", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const dataRes = await respo.json();
      // console.log(dataRes.attendee);
      setAttendees(dataRes.attendee);
    } catch (err) {
      console.error("Request failed:", err);
      alert("Something went wrong!");
    } finally {
      isLoading(false);
    }
  };
  const addNewAttendee = async (event: React.FormEvent) => {
    event?.preventDefault();
    isLoading(true);

    try {
      const respo = await fetch("/api/addAttendees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ IDnumber: inputValue }),
      });
      const dataRes = await respo.json();
    
      if (dataRes.message ==="No Attendee Found") {
        setNotFound("Attendee not found, please check the ID number.");
        setInputValue("");
      }
      else{
        setAttendees((prev) => {
        const index = prev.findIndex(
          (attendee) => attendee.IDnumber === dataRes.findAttendee.IDnumber
        );
  
        if (index !== -1) {
          return prev.map((attendee) =>
            attendee.IDnumber === dataRes.findAttendee.IDnumber
              ? { ...attendee, timeOut: dataRes.findAttendee.timeOut }
              : attendee
          );
        }
  
        return [...prev, dataRes.findAttendee];
      });
      }
    } catch (err) {
      console.error("Request failed:", err);
      alert("Something went wrong!");
    } finally {
      isLoading(false);
    }
  };

  useEffect(() => {
    const formatted = allAttendees.map((attendee)=>({
      ...attendee,
      timeIn: attendee.timeIn ? new Date(attendee.timeIn).toLocaleTimeString("en-US", { hour12: false }) : "",
      timeOut: attendee.timeOut ? new Date(attendee.timeOut).toLocaleTimeString("en-US", { hour12: false }) : "",
    }));
    setAttendees(formatted);
    },[]);

  useEffect(() => {
    fetchAllAttendees();
  }, []);

  return (
    <div className="h-full w-full flex flex-col">
      <div className="nameCotent">
        <div className="searchID flex flex-col justify-center items-center h-15 p-2">
          <form
            action="#"
            method="get"
            className="rounded flex overflow-hidden"
            onSubmit={addNewAttendee}
          >
            <input
              type="text"
              placeholder="Search ID"
              className="p-2"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />

            <Button onClick={addNewAttendee}>Search</Button>
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
              {allAttendees.length} Attendees
            </span>
          </div>
          <div className="tableContainer bg-slate-200 flex  h-full rounded">
            {loading ? (
              <div className="flex justify-center items-center w-full h-full">
                <p className="text-2xl text-white">Loading...</p>
              </div>
            ) : (
              <Table className="w-full p-2">
                <TableHeader>
                  <TableRow className="text-left sticky top-0 bg-slate-300 text-slate-950">
                    <TableCell isHeader className="p-5">
                      id numberss123
                    </TableCell>
                    <TableCell isHeader>name</TableCell>
                    <TableCell isHeader>year level</TableCell>
                    <TableCell isHeader>Course</TableCell>
                    <TableCell isHeader>Time in</TableCell>
                    <TableCell isHeader>time out</TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody className="overflow-y-auto">
                  {allAttendees && allAttendees?.length > 0 ? (
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
