"use client";
import React, { useEffect } from 'react'
import Table from '../components/Table/table'
import TableHeader from '../components/Table/tableHeader'
import TableBody from '../components/Table/tableBody'
import TableCell from '../components/Table/tableCell'
import TableRow from '../components/Table/tableRow'
import ImportModal from '../components/ModalComponents/importModal'

interface Attendee {
  IDnumber: string;
  name: string;
  course: string;
  yearLevel: string;
}

function studentDatas() {
  const [showModal, setShowModal] = React.useState(false);
  const [dataset, setDataset] = React.useState<Attendee[]>([]);
  const [loading, setLoading] = React.useState(false);

  const toggleImportModal = () => { 
    setShowModal(!showModal);
  };

  const fetchData = async () =>{
    setLoading(true);

    try{
      const res = await fetch("api/registerAttendee");
      const data = await res.json();

      if(res.status === 200){
        setDataset(data.attendee);

      }
    }catch(err){
      console.log("Failed to fetch Data", err);
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    fetchData();
  },[]);  

  return (
    <div className='h-full w-full pt-2 px-3 flex flex-col'>
      {showModal && <ImportModal onClose={toggleImportModal} />}
      <div className="btn-grp flex justify-end gap-2">
      <button className='bg-blue-500 text-white rounded p-2 text-sm' onClick={toggleImportModal}>
        Import Dataset
      </button>
      </div>
      <div className="title flex flex-col p-2">
        <span className='text-xl font-semibold tracking-wide'>
          <h1>Student Dataset</h1>
        </span>
      </div>
      <div className="tableContainer bg-white overflow-y-auto h-full w-full rounded">
      <Table className='w-full p-2'>
        <TableHeader>
        <TableRow className="text-left sticky top-0 bg-slate-300 text-slate-950">
            <TableCell isHeader>id number</TableCell>
            <TableCell isHeader>name</TableCell>
            <TableCell isHeader>year level</TableCell>
            <TableCell isHeader>Course</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataset && dataset.length > 0 ? (
            dataset.map((attendee) => {
              return (
                <TableRow key={attendee.IDnumber}>
                  <TableCell>{attendee.IDnumber}</TableCell>
                  <TableCell>{attendee.name}</TableCell>
                  <TableCell>{attendee.yearLevel}</TableCell>
                  <TableCell>{attendee.course}</TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center text-gray-500 bg-slate-100"
              >
                No Attendees registered
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      </div>
    </div>
  )
}

export default studentDatas