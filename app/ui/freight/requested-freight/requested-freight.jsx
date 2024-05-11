"use client";
import React, { useState, useEffect } from "react";
import { getAllPackages } from "@/service/api";
import { useAuth } from "@/service/utils/authContext";
import FreightCard from "../freight-card/freight-card";

function RequestedFreight({showFreightDetails}) {
  const [freights, setFreight] = useState([]);
  const { handleUnauthorizedAccess } = useAuth();

  useEffect(() => {
    getAllPackages()
      .then((res) => {
        // console.log(res);
        setFreight(res.data);
      })
      .catch((err) => {
        // console.log(err)
        if (err.response.status == 401) {
          handleUnauthorizedAccess();
        } else {
          console.log(err);
        }
      });
  }, []);

  function handleShowFreightDetails(id) {
    showFreightDetails(id);
  }

  return (
    <div>
      <div>
        {freights &&
          freights.map((freight) => (
            <FreightCard key={freight.invoiceNumber} freight={freight} handleShowFreightDetails={handleShowFreightDetails}/>
          ))}
      </div>
    </div>
  );
}

export default RequestedFreight;
