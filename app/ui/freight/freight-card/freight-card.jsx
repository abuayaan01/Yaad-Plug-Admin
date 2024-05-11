import React from "react";
import Link from "next/link";
function FreightCard({ freight, handleShowFreightDetails }) {
  return (
    <div>
      <div className="mt-4 p-4 flex flex-col rounded-lg text-xs bg-[#1B2537]">
        <div className="flex justify-between mb-2">
          <div className="flex items-center text-[15px]">
            <p className=" uppercase">
              <span className="text-[#ff6287]">Invoice Number -</span>{" "}
              {freight.invoiceNumber}
            </p>
            <button
              onClick={() => handleShowFreightDetails(freight.id)}
              className="border-gray-700 border-2 text-xs text-white ml-4 px-2 py-2 rounded"
            >
              More Details
            </button>
          </div>
          <div>
            {/* <button
              className={`px-4 py-2 rounded font-semibold cursor-default ${
                freight.payment === "Unpaid"
                  ? "bg-red-200 text-red-700"
                  : "bg-green-200 text-green-700"
              }`}
            >
              {freight.payment}
            </button> */}
            
          </div>
        </div>
        <div className="flex justify-between mb-2">
          <div className="word-wrap w-[300px]">
            <div>Tracking Number - {freight.trackingNumber}</div>
            <div>
              Package Weight -
              <span className="text-[#ffb23e] font-semibold">
                {freight?.weightLBS && " " + freight?.weightLBS + " lbs"}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            {/* <div>
              <span className="ml-2">{freight.userEmailAddress}</span>
            </div> */}
          </div>
        </div>
        <div className="flex justify-between items-center mb-2">
          <div>
            <span className="font-semibold ">Description -</span>
            <span className="text-xs ml-2">{freight.packageDescription}</span>
          </div>
          {/* <div className="flex gap-3">
            <button className="bg-[#181818] rounded-full px-4 py-2">
              {freight?.paymentMethod}
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default FreightCard;
