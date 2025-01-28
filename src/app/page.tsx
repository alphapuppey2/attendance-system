"use client";
import Image from "next/image";
import Topbar from "./components/topbar";
import Table from "./components/Table/table";
import TableHeader from "./components/Table/tableHeader";
import TableCell from "./components/Table/tableCell";
import TableRow from "./components/Table/tableRow";
import TableBody from "./components/Table/tableBody";
import Button from "./components/Button";

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <Topbar />

      <div className="nameCotent bg-slate-500 min-h-full pt-14">
        <div className="searchID m-5 flex justify-center items-center">
          <form action="#" method="get" className="rounded flex overflow-hidden ">
          <input
            type="text"
            placeholder="Search ID"
            className="p-2"
          />
          <Button onClick={() => {}}>Search</Button>
          </form>
        </div>
        <div className="attendees">
          <div className="titleHeader">
            <span>
              Attendees
            </span>
          </div>
        <Table className="w-1/2 mx-auto bg-red-500">
          <TableHeader>
            <TableRow>
              <TableCell isHeader>name</TableCell>
              <TableCell isHeader>year level</TableCell>
              <TableCell isHeader>Course</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>John Doe</TableCell>
              <TableCell>1st year</TableCell>
              <TableCell>BSIT</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        </div>
      </div>
    </div>
  );
}
