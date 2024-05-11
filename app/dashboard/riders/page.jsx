"use client";
import React, { useState, useEffect } from "react";
import PageLoader from "@/app/ui/dashboard/page-loader/page-loader";
import { getRidersList } from "@/service/api";
import RidersTable from "../../ui/riders/riders-table/riders-table";
import { deleteRider } from "@/service/api";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { showSessionExpiredToast } from "@/service/utils/sessionExpiredToast";
import CircularProgress from '@mui/material/CircularProgress';
import { useAuth } from "@/service/utils/authContext";

function Page() {
  const [ridersList, setridersList] = useState([]);
  const [loading, setloading] = useState(false);
  const [btnLoader, setbtnLoader] = useState(false);
  const [actionIdx, setactionIdx] = useState();
  const { handleUnauthorizedAccess } = useAuth();

  useEffect(() => {
    getRidersListReq();
  }, []);

  function getRidersListReq() {
    setloading(true);
    getRidersList()
      .then((res) => {
        setridersList(res.data);
        setloading(false);
      })
      .catch((err) => {
        if(err.response.status == 401){
          showSessionExpiredToast();
          handleUnauthorizedAccess();
        }
        else {
          console.log(err)
        }
        setloading(false);
      });
  }

  function deleteRiderReq(riderId, rowIdx) {
    setactionIdx(rowIdx);
    setbtnLoader(true);

    deleteRider(riderId)
      .then((res) => {
        // console.log(res);
        updateRideList(rowIdx);
        Swal.fire({
          icon: "success",
          title: "Ride deleted successfully",
          position: "top-right",
          showConfirmButton: false,
          timer: 1500,
          toast: true,
        });
        setbtnLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setbtnLoader(false);
      });
    
  }

  function updateRideList(index) {
    const list = ridersList.filter((rider, idx) => idx !== index);
    setridersList(list);
  }

  const columns = [
    { Header: "ID", accessor: "id" },
    { Header: "Name", accessor: "name" },
    {
      Header: "Availability",
      accessor: "availability",
      Cell: ({ value }) => (value ? "Available" : "Not Available"),
      canSort: true,
      sortType: (rowA, rowB, columnId) => {
        const valueA = rowA.values[columnId];
        const valueB = rowB.values[columnId];
        return valueB === valueA ? 0 : valueB ? 1 : -1;
      },
    },
    { Header: "Contact Details", accessor: "contactDetails" },
    { Header: "Vehicle Plate Number", accessor: "vehiclePlateNumber" },
    // { Header: "Current Location", accessor: "currentLocation" },
    { Header: "Rating", accessor: "rating" },
    { Header: "Total Deliveries", accessor: "totalDeliveries" },
    {
      Header: "Actions",
      accessor: "actions",
      id: "actions",
      Cell: ({ row }) => (
        <button
          className="bg-red-500 px-2 py-1 flex items-center justify-center w-[50px] rounded"
          onClick={() => {
            // console.log(row);
            deleteRiderReq(row.original.id, row.index);
          }}
        >
          {(btnLoader && actionIdx == row.index) ? <CircularProgress size={15} color="inherit" /> :  "Delete" }
        </button>
      ),
    },
  ];

  return (
    <div>
      {loading ? (
        <PageLoader />
      ) : (
        <RidersTable columns={columns} data={ridersList} />
      )}
    </div>
  );
}

export default Page;
