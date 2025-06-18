import React from "react";
import { HiMiniXMark } from "react-icons/hi2";

type DeleteModalProps = {
    onClose: () => void;
};

export default function DeleteModal({ onClose }: DeleteModalProps) {

    const onDelete = async () => {
        try {
            const response = await fetch("/api/deleteAllAttendees", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            await response.json();
        }catch(error){
            console.log(error);
        };
        onClose();
    };
    return (
        <div className="absolute z-10 h-screen w-full -top-12 bg-black flex justify-center items-center bg-opacity-50">
            <div className="flex flex-col w-[25rem] justify-betweem bg-white p-5 rounded">
                <div className="modalHeader flex justify-between items-center">
                    <h1 className="text-2xl font-semibold">Delete Dataset</h1>
                    <button onClick={onClose}>
                        <HiMiniXMark />
                    </button>
                </div>
                <div className="divider">
                    <p>Are you sure you want to delete the list?</p>
                    <div className="btn-grp flex justify-end gap-2">
                        <button className='bg-red-500 text-white rounded p-2 text-sm' onClick={onDelete}>
                            Delete
                        </button>
                        <button className='bg-blue-500 text-white rounded p-2 text-sm' onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};