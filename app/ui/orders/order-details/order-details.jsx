"use client";
import React, { useState, useEffect } from "react";
import imagePlaceholder from "../../../../public/images/imagePlaceholder.webp";
import Image from "next/image";
import { getAllOrdersById } from "@/service/api";
import { IoArrowForwardOutline, IoCall } from "react-icons/io5";
// import { FaStar } from "react-icons/fa";
import PageLoader from "../../dashboard/page-loader/page-loader";

function OrderDetailsPage({ handleOrderDetails, orderid }) {
  const [orderDetails, setOrderDetails] = useState();
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await getAllOrdersById(orderid);
        setOrderDetails(response.data);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };
    fetchOrderDetails();
  }, [orderid]);

  return (
    <>
      {orderDetails ? (
        <div>
          <div className="flex justify-between items-center px-4 py-4 mb-4 rounded  bg-[#1B2537]">
            <div className="text-xs font-semibold">
              ORDER ID -{" "}
              <span className="text-sky-300">{orderDetails?.orderId}</span>
            </div>
            <div className="flex">
              {" "}
              <button
                className={`px-4 py-2 rounded font-semibold cursor-default ${
                  orderDetails?.status === "Rejected"
                    ? "bg-red-200 text-red-700"
                    : orderDetails?.status === "Pending"
                    ? "bg-yellow-200 text-yellow-700"
                    : "bg-green-200 text-green-700"
                }`}
              >
                {orderDetails?.status}
              </button>
              <button
                onClick={() => handleOrderDetails(0)}
                className="bg-[#070A0F] flex items-center gap-2 px-4 py-2 rounded ml-4"
              >
                Back to Orders <IoArrowForwardOutline />
              </button>
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <div className="flex">
              <div className="flex flex-col">
                <div className="bg-[#1B2537] w-[800px] rounded">
                  <div className="flex py-4">
                    <div className="w-[33%] px-4 ">
                      <h1 className=" text-xs pb-2 font-semibold">
                        Order Date
                      </h1>
                      <h2 className="text-xs">{orderDetails?.orderDate}</h2>
                      <h1 className=" mt-14 pb-2 text-xs font-semibold">
                        Tracking Number
                      </h1>
                      <h2 className="text-xs text-slate-400">
                        {orderDetails?.trackingNumber ? orderDetails?.trackingNumber : "Not Available"}
                      </h2>
                    </div>
                    <div className="w-[33%] px-4">
                      <h1 className=" text-xs pb-2 font-semibold">
                        Order Expected
                      </h1>
                      <h2 className="text-xs">
                        {orderDetails?.estimatedTime ? orderDetails?.estimatedTime + "mins" : "Not Available"}
                      </h2>
                      <h1 className=" mt-14 text-xs pb-2 font-semibold">
                        Delievery address
                      </h1>
                      <h2 className="text-xs">
                        {orderDetails?.deliveryAddress}
                      </h2>
                    </div>
                    <div className="w-[33%] px-4">
                      <h1 className="pb-2 text-xs font-semibold">
                        Payment Mode
                      </h1>
                      <h2 className="text-xs">{orderDetails?.paymentMethod}</h2>
                    </div>
                  </div>
                </div>
                <div className="mt-4 mb-2">
                  <p className="text-xs truncate">Order Items</p>
                </div>
                <div className="flex flex-col justify-between">
                  {orderDetails?.orders.map((order) => (
                    <div
                      key={order?.mealId}
                      className="flex py-2 items-center mt-2 px-4 gap-4 bg-[#1B2537] rounded"
                    >
                      <div className="">
                        {" "}
                        <Image
                          src={order?.imageUrl ? order?.imageUrl : imagePlaceholder}
                          alt="Order Image"
                          width={60}
                          height={60}
                          className="rounded min-w-[40px] max-w-[40px] min-h-[40px] max-h-[40px] object-cover"
                        />
                      </div>
                      <div className="w-full flex justify-between items-center">
                        <div>{order?.mealName ? order?.mealName : imagePlaceholder}</div>
                        <div className="pt-2">
                          {order?.quantity} x ${order?.amount}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-full">
              <div className="mb-2">
                <p className="text-xs truncate">Customer Details</p>
              </div>
              <div className="mb-4 px-4 py-4 bg-[#1B2537] rounded">
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <Image
                      src={orderDetails?.user?.profileImgUrl ? orderDetails?.user?.profileImgUrl : imagePlaceholder}
                      alt={"User Image"}
                      width={30}
                      height={30}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className=" text-xs pt-1 font-semibold">
                        {orderDetails?.user?.name}
                      </p>
                      <p className="text-xs pt-1">{orderDetails?.user?.email}</p>
                    </div>
                  </div>
                  <div className="mr-2">
                    <a href={`tel:${orderDetails?.user?.phoneNumber}`}>
                      <IoCall size={24} color="#BBF7D0" />
                    </a>
                  </div>
                </div>
              </div>
              {orderDetails?.rider && (
                <>
                  <div className="mt-4 mb-2">
                    <p className="text-xs truncate">Delivery Partner</p>
                  </div>
                  <div className="mb-4 p-4 bg-[#1B2537] rounded flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                      <Image
                        src={orderDetails?.rider?.profileImgUrl ? orderDetails?.rider?.profileImgUrl : imagePlaceholder}
                        alt="Rider Image"
                        width={60}
                        height={60}
                        className="w-10 h-10 rounded-full"
                      />
                      <p className="text-xs flex flex-col gap-1">
                        <span className="text-pink-400 font-semibold">
                          {orderDetails?.rider?.name + " "}
                        </span>
                        {/* <span className="flex gap-1 items-center">
                        <FaStar color="yellow" />
                        {orderDetails.rider.rating}
                      </span> */}
                        <span className="text-xs font-semibold text-sky-300">
                          {orderDetails?.rider?.vehiclePlateNumber}
                        </span>
                      </p>
                    </div>

                    <div className="flex flex-col">
                      <a href={`tel:${orderDetails?.rider?.contactDetails}`}>
                        <IoCall size={24} color="#BBF7D0" />
                      </a>
                    </div>
                  </div>
                </>
              )}
              <div className="mt-4 mb-2">
                <p className="text-xs truncate">Order Summary</p>
              </div>
              <div className="mb-4 p-4 bg-[#1B2537] rounded">
                <div className="py-2 flex flex-col gap-2">
                  <div className="flex justify-between text-xs">
                    <p className="text-xs">Order Price</p>
                    <p>${orderDetails?.orderPrice}</p>
                  </div>
                  {/* <div className="flex justify-between text-xs">
                    <p className=" text-xs">Discount Amount</p>
                    <p>$0</p>
                  </div> */}
                  {/* <div className="flex justify-between text-xs">
                    <p className="text-xs">
                      Promo Code : <span className="text-pink-400">Deal99</span>
                    </p>
                    {/* <p className="text-xs">Meal50</p> 
                  </div> */}
                  {orderDetails?.deliveryPartnerFee && <div className="flex justify-between text-xs">
                    <p className="">Delivery Charges</p>
                    <p>${orderDetails?.deliveryPartnerFee}</p>
                  </div>}
                 {orderDetails?.tax && <div className="flex justify-between text-xs">
                    <p className="text-xs">Tax <span className="text-[8px]">({orderDetails?.tax?.percentage}%)</span></p>
                    <p>${orderDetails?.tax?.amount}</p>
                  </div>}
                 {orderDetails?.tip && <div className="flex justify-between text-xs">
                    <p className=" text-xs">Delivery Tip</p>
                    <p>${orderDetails?.tip}</p>
                  </div>}
                 {orderDetails?.platformFee && <div className="flex justify-between text-xs">
                    <p className=" text-xs">Platform Fee</p>
                    <p>${orderDetails?.platformFee}</p>
                  </div>}
                  <div className="flex justify-between border-black border-t-[1px] text-xs pt-3">
                    <p className="text-xs">Total Amount</p>
                    <p>${orderDetails?.totalAmount}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <PageLoader />
      )}
    </>
  );
}

export default OrderDetailsPage;
