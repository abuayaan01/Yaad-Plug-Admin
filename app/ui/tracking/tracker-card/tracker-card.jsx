import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import StatusStepper from "../status-stepper/status-stepper";
import googlemapsIcon from "../../../../public/images/google-maps.png";
import Image from "next/image";
import { MdLocationPin } from "react-icons/md";
import Collapse from "@mui/material/Collapse";

const DynamicMap = dynamic(() => import("../map/map"), {
  ssr: false,
});

function TrackerCard({ order }) {
  const [showMap, setshowMap] = useState(false);
  const [activeStep, setactiveStep] = useState(0);

  useEffect(() => {
    switch (order?.status) {
      case "Confirmed":
        setactiveStep(0);
        break;
      case "Preparing":
        setactiveStep(1);
        break;
      case "Ready for Pickup":
        setactiveStep(2);
        break;
      case "Order Picked Up":
        setactiveStep(3);
        break;
      case "Out for Delivery":
        setactiveStep(4);
        break;
      case "At Doorstep":
        setactiveStep(5);
        break;
      case "Delivered":
        setactiveStep(6);
        break;
      default:
        setactiveStep(0);
    }
  }, [order]);

  return (
    <div>
      <div className="flex justify-between p-4">
        <div className="flex flex-1 flex-col gap-3">
          <span className="!text-sm">
            ORDER - <span className="text-sky-300">{order.orderId}</span>
          </span>
          <span className="flex gap-2 items-center">
            {order.deliveryAddress}
          </span>
          <span>
            <button
              onClick={() => {
                setshowMap(!showMap);
              }}
              className="flex items-center gap-2 bg-[#ff6287]! bg-black px-2 py-2 rounded"
            >
              <Image
                src={googlemapsIcon}
                alt={"google-maps-icons"}
                width={20}
                height={20}
              />{" "}
              {!showMap ? "See On Map" : "Close Map"}
            </button>
          </span>
        </div>
        <div className="flex flex-col flex-center items-end gap-3">
          <p>Tracking - <span className="text-[#ff6287]">{order?.trackingNumber}</span></p>
          {order?.estimatedTime && (
            <p className="">
              Estimated Time -{" "}
              {order?.estimatedTime && order?.estimatedTime + "mins"}
            </p>
          )}
          {(order?.rider?.name || order?.rider?.vehiclePlateNumber) && (
            <p>
              {order?.rider?.name && order?.rider?.name}
              <span className="text-sky-300 font-semibold ml-2">
                {order?.rider?.vehiclePlateNumber &&
                  order?.rider?.vehiclePlateNumber}
              </span>
            </p>
          )}
        </div>
      </div>
      <Collapse in={showMap}>
        <DynamicMap
          order={{
            deliveryAddress: order?.deliveryAddress,
            deliveryLocation: order?.deliveryLatLong,
            riderLocation: order?.rider?.currentLocation,
          }}
        />
      </Collapse>
      <div className="bg-slate-900 pt-12 pb-4 rounded-b">
        <StatusStepper activeStep={activeStep} />
      </div>
    </div>
  );
}

export default TrackerCard;
