"use client";
import SelectField from "@/app/ui/dashboard/input/select-field";
import TextField from "@/app/ui/dashboard/input/text-field";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { addPackage } from "@/service/api";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { CircularProgress } from "@mui/material";

function Page() {
  const router = useRouter();

  const [loading, setloading] = useState(false);
  const [firstName, setfirstName] = React.useState();
  const [lastName, setlastName] = React.useState();
  const [userEmailAddress, setuserEmailAddress] = React.useState();
  const [freightType, setfreightType] = React.useState();
  const [packageStatus, setpackageStatus] = React.useState();
  const [packageDescription, setpackageDescription] = React.useState();
  const [weightLBS, setweightLBS] = React.useState();
  const [invoiceNumber, setinvoiceNumber] = React.useState();
  const [trackingNumber, settrackingNumber] = React.useState();
  const [paymentMethod, setpaymentMethod] = React.useState();
  const [payment, setpayment] = React.useState();
  const [processingFee, setprocessingFee] = React.useState();
  const [chargesAdded, setchargesAdded] = React.useState();
  const [subTotal, setsubTotal] = React.useState();
  const [totalFare, settotalFare] = React.useState();

  function handleAddFormSubmission(e) {
    e.preventDefault();
    setloading(true);
    addPackageReq();
  }

  const addPackageReq = async () => {
    const data = {
      fullName: userEmailAddress,
      freightType,
      packageStatus,
      packageDescription,
      weightLBS,
      invoiceNumber,
      trackingNumber,
      paymentMethod,
      payment,
    };
    await addPackage(data)
      .then((res) => {
        if (res.success) {
          Swal.fire({
            icon: "success",
            title: "Package added successfully.",
            position: "top-right",
            showConfirmButton: false,
            timer: 1500,
            toast: true,
          });
          router.back();
        } else {
          Swal.fire({
            icon: "error",
            title: res.msg,
            position: "top-right",
            showConfirmButton: false,
            timer: 2500,
            toast: true,
          });
        }
        setloading(false);
      })
      .catch((e) => {
        if (e.code == 400) {
          Swal.fire({
            icon: "error",
            title: e.error,
            position: "top-right",
            showConfirmButton: false,
            timer: 2500,
            toast: true,
          });
        } else {
          console.log(e);
        }
        setloading(false);
      });
  };

  return (
    <div>
      <div className="bg-[#1B2537] text-gray-100 text-xs px-2">
        <p className="font-bold text-sm pt-6 pb-4 px-2">Create New Package</p>
        <form onSubmit={handleAddFormSubmission}>
          <div className="w-full flex flex-wrap">
            <TextField
              required
              id="fullName"
              name="fullName"
              label="Full Name"
              type="text"
              half={false}
              value={userEmailAddress}
              onChange={(e) => setuserEmailAddress(e.target.value)}
            />
            <SelectField
              label={"Freight Type"}
              value={freightType}
              onChange={(e) => setfreightType(e.target.value)}
              options={["Air", "Sea"]}
            />
            <SelectField
              label={"Package Status"}
              value={packageStatus}
              onChange={(e) => setpackageStatus(e.target.value)}
              options={[
                "FL Warehouse",
                "Delivered",
                "Ready for Pick up",
                "In Transit",
                "Customs",
                "Invoice Needed",
                "Out for delivery",
              ]}
            />
            <TextField
              required
              id="packageDescription"
              name="packageDescription"
              label="Package Description"
              type="text"
              half={false}
              value={packageDescription}
              onChange={(e) => setpackageDescription(e.target.value)}
            />
            <TextField
              required
              id="weightLBS"
              name="weightLBS"
              label="Weight (LBS)"
              type="number"
              half={false}
              value={weightLBS}
              onChange={(e) => setweightLBS(e.target.value)}
            />
            <TextField
              id="invoiceNumber"
              name="invoiceNumber"
              label="Invoice Number"
              type="text"
              half={false}
              value={invoiceNumber}
              onChange={(e) => setinvoiceNumber(e.target.value)}
            />
            <TextField
              required
              id="trackingNumber"
              name="trackingNumber"
              label="Tracking Number"
              type="text"
              half={false}
              value={trackingNumber}
              onChange={(e) => settrackingNumber(e.target.value)}
            />
            {/* <SelectField
              label={"Payment Method"}
              value={paymentMethod}
              onChange={(e) => setpaymentMethod(e.target.value)}
              options={["E-Transaction", "Pay on delivery"]}
            />
            <SelectField
              label={"Payment Status"}
              value={payment}
              onChange={(e) => setpayment(e.target.value)}
              options={["Paid", "Unpaid"]}
            /> */}
          </div>
          <div className="px-2 py-2 flex justify-end gap-4">
            <button type="button" onClick={() => {router.back()}} className="bg-red-400 h-[30px] w-[100px] rounded px-8 py-2 mb-4">
              Cancel
            </button>
            <button
              className="bg-blue-400 h-[30px] w-[100px] rounded px-8 py-2 mb-4"
              variant="outlined"
              type="submit"
            >
              {loading ? (
                <CircularProgress size={15} color="inherit" />
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Page;
