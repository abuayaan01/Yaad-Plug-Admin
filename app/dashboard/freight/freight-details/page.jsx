"use client";
import React, { useState, useEffect } from "react";
import { BsBoxArrowInUpRight } from "react-icons/bs";
import { IoMdCheckboxOutline } from "react-icons/io";
import {
  getPackageDetailsByOrderId,
  updatePackageDetailsByOrderId,
} from "@/service/api";
import PackageStatusStepper from "@/app/ui/freight/package-status-stepper/package-status-stepper";
import { IoMdArrowBack } from "react-icons/io";
import Swal from "sweetalert2/dist/sweetalert2.js";
import SelectField from "@/app/ui/dashboard/input/select-field";

function Page({ orderId, showPackages }) {
  const [pFee, setpFee] = useState(0);
  const [cAdded, setcAdded] = useState(0);
  const [sTotal, setsTotal] = useState(0);
  const [tFare, settFare] = useState(0);
  const [paymentMethod, setpaymentMethod] = React.useState();
  const [payment, setpayment] = React.useState();

  const [packageDetails, setPackageDetails] = useState();
  useEffect(() => {
    getPackageDetailsByOrderId(orderId).then((res) => {
      setPackageDetails(res.data);
      // console.log(res.data);
    });
  }, [orderId]);

  useEffect(() => {
    setpFee(packageDetails?.package?.processingFee);
    setcAdded(packageDetails?.package?.chargesAdded);
    setsTotal(packageDetails?.package?.subTotal);
    settFare(packageDetails?.package?.totalFare);
  }, [packageDetails]);

  const updatePackageDetailsByOrderIdReq = async () => {
    const data = {
      chargesAdded: cAdded,
      subTotal: sTotal,
      processingFee: pFee,
      totalFare: tFare,
      payment,
      paymentMethod
    };
    updatePackageDetailsByOrderId(orderId, data)
      .then((res) => {
        if (res.success) {
          Swal.fire({
            icon: "success",
            title: "Package updated successfully.",
            position: "top-right",
            showConfirmButton: false,
            toast: true,
            timer: 1500,
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    // console.log(typeof cAdded);
    settFare(parseInt(pFee) + parseInt(cAdded) + parseInt(sTotal));
  }, [pFee, cAdded, sTotal]);

  return (
    // <div>Page{searchParams.id}</div>
    <div className="bg-[#1B2537] w-full p-4 rounded">
      <div className="p-2">
        {/* //head */}
        <div className="flex justify-between">
          <div>
            <span className="text-pink-600 font-bold text-sm ">
              INVOICE NUMBER -{" "}
            </span>{" "}
            {packageDetails?.package?.invoiceNumber}
          </div>
          <div className="flex gap-4 items-center">
            <div>
              <span className="text-pink-600 uppercase font-bold text-sm">
                Tracking Number -
              </span>
              <span> {packageDetails?.package?.trackingNumber}</span>
            </div>
            <div>
              <a
                href={packageDetails?.package?.invoiceImg}
                target="blank"
                className="text-sky-300 flex items-center gap-2"
              >
                Click here to view invoice{" "}
                <span>
                  <BsBoxArrowInUpRight size={22} color="" />
                </span>
              </a>
            </div>
            <div>
              <button
                onClick={() => showPackages()}
                className="bg-[#070A0F] flex items-center gap-2 px-4 py-2 rounded ml-4"
              >
                <IoMdArrowBack size={20} /> Back
              </button>
            </div>
          </div>
        </div>

        {/* packageInfo */}
        <div>
          <p className="font-bold my-5 mb-7">Package Information</p>
          <div className="flex justify-between">
            <div className="w-1/2 pr-8">
              <p className="font-bold mb-2">About</p>
              <p className="mb-2 pb-2 text-xs border-b border-gray-900">
                {packageDetails?.package?.packageDescription}
              </p>
            </div>
            <div className="w-1/2 flex gap-4 justify-between">
              <div>
                <p className="font-bold mb-2">Type</p>
                <p className="mb-2 pb-2 text-xs border-b border-gray-900">
                  {packageDetails?.package?.freightType}
                </p>
              </div>
              <div>
                <p className="font-bold mb-2">Weight (in Lbs)</p>
                <p className="mb-2 pb-2 text-xs border-b border-gray-900">
                  {packageDetails?.package?.weightLBS}
                </p>
              </div>
              {/* <div>
                <p className="font-bold mb-2">Container type</p>
                <p className="mb-2 pb-2 text-xs border-b border-gray-900">
                  Cartons
                </p>
              </div> */}
              <div>
                <p className="font-bold mb-2">Dimensions (in Cms)</p>
                <div className="flex justify-between font-light text-xs">
                  <p>
                    L:{" "}
                    <span className="pb-2 border-b border-gray-900 ">10</span>
                  </p>
                  <p>
                    W:{" "}
                    <span className="pb-2 border-b border-gray-900 ">10</span>
                  </p>
                  <p>
                    H:{" "}
                    <span className="pb-2 border-b border-gray-900 ">10</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* package status and delivery details */}
        <div className="w-full flex">
          <div className="w-1/2">
          <div className="mx-[-10px]">
              <SelectField
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
              />
            </div>
            <p className="font-bold my-5 mb-7">Package Status</p>
            <div>
              <PackageStatusStepper
                orderId={packageDetails?.package?.id}
                currentStatus={packageDetails?.package?.packageStatus}
              />
            </div>
           
          </div>
          <div className="max-w-[50%]">
            <p className="text-base font-bold my-5 mb-7">Delivery Details:</p>
            <div className="flex gap-8 flex-wrap">
              {/* <div>
                <p className="font-bold mb-2">Name</p>
                <p className="border-b border-gray-900 text-xs  pb-2">
                  {packageDetails?.user?.name}
                </p>
              </div> */}
              <div>
                <p className="font-bold mb-2">Email</p>
                <p className="border-b border-gray-900 text-xs pb-2">
                  {packageDetails?.user?.email}
                </p>
              </div>
              <div>
                <p className="font-bold mb-2">Contact</p>
                <p className="border-b border-gray-900 text-xs pb-2">
                  {packageDetails?.user?.phoneNumber}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <p className="font-bold mb-2">Address</p>
              <p className="border-b border-gray-900 text-xs pb-2">
                {packageDetails?.user?.localAddress}
              </p>
            </div>
            {/* charges */}
            <div>
              <p className="text-base font-bold my-5 mb-7">Payment:</p>
              <div className="flex flex-wrap justify-start gap-4">
                <div>
                  <p className="font-bold mb-2">Processing Fee</p>
                  <input
                    onChange={(e) => setpFee(e.target.value)}
                    value={pFee}
                    type="number"
                    className="border-b border-gray-900 bg-transparent  outline-none text-xs pb-2"
                  />
                </div>
                <div>
                  <p className="font-bold mb-2">Charges Added</p>
                  <input
                    onChange={(e) => setcAdded(e.target.value)}
                    value={cAdded}
                    type="number"
                    className="border-b border-gray-900 bg-transparent outline-none text-xs pb-2"
                  />
                </div>
                <div>
                  <p className="font-bold mb-2">Sub Total</p>
                  <input
                    onChange={(e) => setsTotal(e.target.value)}
                    value={sTotal}
                    type="number"
                    className="border-b border-gray-900 bg-transparent  outline-none text-xs pb-2"
                  />
                </div>
                <br />
                <div>
                  <p className="font-bold mb-2">Total</p>
                  <span
                    // onChange={(e) => settFare(e.target.value)}
                    className="border-b border-gray-900 bg-transparent outline-none text-xs pb-2"
                  >
                    {tFare}
                  </span>
                </div>
              </div>
            </div>
            {/* prefrences */}
            <div className="mt-6">
              <p className=" text-base font-bold">Preferences:</p>
              <div className="my-2 flex">
                <div className="flex flex-col">
                  <p className="mb-5 flex">
                    {" "}
                    <IoMdCheckboxOutline className="text-lg text-green-600 mr-2" />
                    Handle With Care
                  </p>
                  <p className="pb-5 flex">
                    {" "}
                    <IoMdCheckboxOutline className="text-lg mr-2 text-gray-600" />
                    Door-to-Door
                  </p>
                </div>
                <div className="flex flex-col mx-3">
                  <p className="mb-5 flex">
                    {" "}
                    <IoMdCheckboxOutline className="text-lg mr-2 text-gray-600" />
                    Insurance
                  </p>
                  <p className="pb-5 flex">
                    {" "}
                    <IoMdCheckboxOutline className="text-lg text-green-600 mr-2" />
                    Mover
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* save. */}
        <div className="pb-5">
          <button
            type="submit"
            className="bg-pink-700 text-white font-bold py-2 mt-4 px-4 rounded"
            onClick={updatePackageDetailsByOrderIdReq}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default Page;

// <div className="flex justify-between ">
// <p>
//   {" "}
//   <span className="text-pink-700 font-bold text-sm ">
//     INVOICE NUMBER -{" "}
//   </span>{" "}
//   {packageDetails?.package?.invoiceNumber}
// </p>
// <p>Date: 27/02/2024</p>
// </div>
// <div className="flex flex-row gap-4">
// <div className="w-1/2">
//   <div>
//     <p className="text-base font-bold my-5 mb-7">
//       {" "}
//       Package Information
//     </p>
//     <div>
//       <p className="font-bold mb-2"> About</p>
//       <p className="mb-2 pb-2 text-xs border-b border-gray-900 ">
//         {" "}
//         {packageDetails?.package?.packageDescription}
//       </p>
//       <p className="font-bold pb-2">Tracking Number</p>
//       <p className="text-xs">
//         {" "}
//         {packageDetails?.package?.trackingNumber} lbs
//       </p>
//     </div>
//   </div>

//   <div className="mt-4">
//     <p className="font-bold">Package Status</p>
//     <div className="h-[200px] w-[100%] bg-slate-800 my-4 rounded"></div>
//   </div>

//   <div className="my-2">
//     <p className=" text-base font-bold">Order Fare</p>
//     <div className="my-2">
//       <p className="mb-5">
//         Order Fare By User:{" "}
//         <span className="text-yellow-400">$28.8</span>{" "}
//         <span className="text-red-800 font-bold">+ $70</span>
//       </p>
//       <p className="pb-5">
//         Received Order fare:{" "}
//         <span className="text-green-800 font-bold">$98.34</span>{" "}
//       </p>
//     </div>
//   </div>
// </div>
// <div className="">
//   <div>
//     <div className="flex justify-end my-5">
//       <div className="text-xs mt-2 "> Click to view Invoice</div>{" "}
//       <div>
//         <p className="pb-2">
//           <BsBoxArrowInUpRight className=" ml-2 text-2xl text-red-600" />
//         </p>
//       </div>{" "}
//     </div>
//     <div className="flex justify-between">
//       <div className=" w-[33%]">
//         <p className="  font-bold  mb-2">Type</p>
//         <p className=" border-b border-gray-900 text-xs  pb-2 ">
//           {packageDetails?.package?.freightType}
//         </p>
//       </div>
//       <div className="w-[33%]">
//         <p className="font-bold mb-2 text-xs">
//           Weight- <span className="text-xs font-light">in LBS</span>
//         </p>
//         <p className=" border-b text-xs border-gray-900 pb-2">
//           {packageDetails?.package?.weightLBS}
//         </p>
//       </div>
//       <div className="w-[33%]">
//         <div>
//           <p className="font-bold mb-2">Packaging Type</p>
//           <p className=" border-b border-gray-900 pb-2 text-xs">
//             Cartoons
//           </p>
//         </div>
//         <div>
//           <p className="font-bold mb-2 pt-2">
//             Dimensions-{" "}
//             <span className="text-xs font-light">in cm</span>
//           </p>
//           <div className="flex justify-between font-light text-xs">
//             <p>
//               L: <span className=" border-b border-gray-900 ">10</span>
//             </p>
//             <p>
//               W: <span className=" border-b border-gray-900 ">10</span>
//             </p>
//             <p>
//               H: <span className=" border-b border-gray-900 ">10</span>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
//   <div className="my-4">
//     <p className="text-base font-bold"> Delivery Details:</p>
//     <div className="flex flex-row mt-3 justify-between">
//       <div className="w-[24%] pb-2">
//         <p className="mb-1">Name</p>
//         <p className=" border-b border-gray-900 text-xs  pb-2">
//           {packageDetails?.user?.name}
//         </p>
//       </div>
//       <div className="w-[24%] pb-2">
//         <p className="mb-1">Contact</p>
//         <p className="border-b border-gray-900 text-xs pb-2">
//           {" "}
//           {packageDetails?.user?.phoneNumber}
//         </p>
//       </div>
//       <div className="w-[24%] pb-2">
//         <p className="mb-1">Date</p>
//         <p className="border-b border-gray-900 text-xs  pb-2">
//           2024-02-15
//         </p>
//       </div>
//     </div>
//     <div className="flex mt-3 justify-between gap-2">
//       <div className="w-[50%]">
//         <p className="mb-1">Email</p>
//         <p className="border-b text-xs pb-2 border-gray-900">
//           {packageDetails?.user?.email}
//         </p>
//       </div>
//     </div>
//     <div className="mt-2">
//       <p className="mb-1">Address</p>
//       <p className="border-b border-gray-900 pb-2">
//         asdddddddddasdasdasdasdasdddasdasdasdasdasdddasdasdasdasdddasdasdasdasdasdasdddasdasdasdasdasd
//         {packageDetails?.user?.localAddress}
//       </p>
//     </div>
//   </div>
//   <div className="my-2">
//     <p className=" text-base font-bold">Preferences:</p>
//     <div className="my-2 flex">
//       <div className="flex flex-col">
//         <p className="mb-5 flex">
//           {" "}
//           <IoMdCheckboxOutline className="text-lg text-green-600 mr-2" />
//           Handle With Care
//         </p>
//         <p className="pb-5 flex">
//           {" "}
//           <IoMdCheckboxOutline className="text-lg mr-2 text-gray-600" />
//           Door-to-Door
//         </p>
//       </div>
//       <div className="flex flex-col mx-3">
//         <p className="mb-5 flex">
//           {" "}
//           <IoMdCheckboxOutline className="text-lg mr-2 text-gray-600" />
//           Insurance
//         </p>
//         <p className="pb-5 flex">
//           {" "}
//           <IoMdCheckboxOutline className="text-lg text-green-600 mr-2" />
//           Mover
//         </p>
//       </div>
//     </div>
//   </div>
// </div>
// </div>
// <div className="pb-5">
// <button
//   type="submit"
//   className="bg-pink-700 text-white font-bold py-2 mt-4 px-4 rounded"
// >
//   Save
// </button>
// </div>
