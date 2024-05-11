"use client";
import React, { useEffect, useState } from "react";
import OrderCard from "../order-card/order-card";
import { filterOrders } from "@/service/api";
import { CircularProgress } from "@mui/material";
import { BiRefresh } from "react-icons/bi";
import PageLoader from "../../dashboard/page-loader/page-loader";
import NoDataFound from "../../dashboard/no-data-found/no-data-found";
import { showSessionExpiredToast } from "@/service/utils/sessionExpiredToast";
import { useAuth } from "@/service/utils/authContext";

function ActiveOrders({handleOrderDetails}) {
  const [orders, setorders] = useState([]);
  const [loading, setloading] = useState(false);
  const [refresh, setrefresh] = useState(false);
  const {handleUnauthorizedAccess} = useAuth()

  const handleRefresh = () => {
    setrefresh(!refresh);
  };

  useEffect(() => {
    getAllOrdersReq()
  }, [refresh]);

  const getAllOrdersReq = async () => {
    setloading(true);
    await filterOrders("Confirmed")
      .then((res) => {
        setorders(res.data);
        setloading(false);
      })
      .catch((err) => {
        if (err.response.status == 401) {
          showSessionExpiredToast();
          handleUnauthorizedAccess();
        } else {
          console.log(err);
        }
      });
  };

  return (
    <div className="relative">
      <button
        className="bg-sky-400 w-[100px] h-[35px] text-white font-bold py-2 px-4 flex justify-center items-center rounded focus:outline-none focus:shadow-outline absolute top-[-55px] right-5"
        onClick={() => setrefresh(!refresh)}
      >
        {!loading ? (
          <span className="flex justify-center items-center">
            Refresh
          </span>
        ) : (
          <CircularProgress color="inherit" size={22} />
        )}
      </button>
      <div className="flex flex-wrap justify-between">
        {loading ? (
          <PageLoader />
        ) : orders && orders.length > 0 ? (
          orders.map((order, index) => (
            <OrderCard
              key={index}
              order={order}
              handleRefresh={handleRefresh}
              handleOrderDetails={handleOrderDetails}
            />
          ))
        ) : (
          <NoDataFound />
        )}
      </div>
    </div>
  );
}

export default ActiveOrders;
