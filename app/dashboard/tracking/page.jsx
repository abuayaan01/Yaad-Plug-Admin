"use client";
import React, { useEffect, useState } from "react";
import { getTrackableOrders } from "@/service/api";
import PageLoader from "@/app/ui/dashboard/page-loader/page-loader";
import NoDataFound from "@/app/ui/dashboard/no-data-found/no-data-found";
import TrackerCard from "@/app/ui/tracking/tracker-card/tracker-card";
import { showSessionExpiredToast } from "@/service/utils/sessionExpiredToast";
import { useAuth } from "@/service/utils/authContext";

function Page() {
  const [orders, setorders] = useState([]);
  const [loading, setloading] = useState(false);
  const [refresh, setrefresh] = useState(false);
  const { handleUnauthorizedAccess } = useAuth();

  const getOrders = async () => {
    setloading(true);
    await getTrackableOrders()
      .then((res) => {
        setorders(res.data);
        setloading(false);
      })
      .catch((err) => {
        if (err?.response?.status == 401) {
          showSessionExpiredToast();
          handleUnauthorizedAccess();
        } else {
          console.log(err);
        }
        setloading(false);
      });
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      refreshOrder();
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const refreshOrder = async () => {
    await getTrackableOrders()
      .then((res) => {
        setorders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getOrders();
  }, [refresh]);

  return (
    <div>
      {loading ? (
        <PageLoader />
      ) : orders && orders.length > 0 ? (
        orders.map((order, index) => (
          <div key={order.orderId} className="bg-[#1B2537] my-4 rounded">
            <TrackerCard order={order} />
          </div>
        ))
      ) : (
        <NoDataFound />
      )}
    </div>
  );
}

export default Page;
