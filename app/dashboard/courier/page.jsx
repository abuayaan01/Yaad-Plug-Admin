"use client";
import React, { useEffect, useState } from "react";
import CourierCard from "@/app/ui/courier/courier-card/courier-card";
import { getAllCouriers } from "@/service/api";
import { useAuth } from "@/service/utils/authContext";
import NoDataFound from "@/app/ui/dashboard/no-data-found/no-data-found";

function Page() {
  const [courierList, setcourierList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { handleUnauthorizedAccess } = useAuth();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setIsLoading(true);
    getAllCouriers()
      .then((res) => {
        if (res.success) {
          setcourierList(res.data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (err.response.status == 401) {
          handleUnauthorizedAccess();
        } else {
          console.log(err);
        }
        setIsLoading(false);
      });
  };

  return (
    <div>
      <div className="courier-list flex flex-wrap gap-2">
        {courierList.length > 0 ? (
          courierList.map((courier, index) => {
            return (
              <CourierCard key={courier.id} data={courier} index={index} />
            );
          })
        ) : (
          <NoDataFound />
        )}
      </div>
    </div>
  );
}

export default Page;
