"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import pizza from "./../../../../public/images/pizza.png";
import Popover from "@mui/material/Popover";
import { updateOrderStatus } from "@/service/api";
import Swal from "sweetalert2/dist/sweetalert2.js";
import TextField from "../../dashboard/input/text-field";
import { getAvailableRider, acceptOrder } from "@/service/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";

function OrderCard({ order, handleRefresh, handleOrderDetails }) {

  return (
    <div className="flex flex-col md:w-[calc(50%-5px)] w-100  my-[5px] bg-slate-600s bg-[#1B2537] text-sm p-4 rounded">
      <div className="card-body py-4 flex items-start w-full justify-between border-b-[1px] border-slate-900">
        <div className="flex flex-col gap-2 items-start">
          <p>
            ORDER ID - <span className="text-cyan-300">{order.orderId}</span>
            <button onClick={() => {handleOrderDetails(order.orderId)}}
              className="border-gray-700 border-2 text-xs text-white ml-2 px-2 py-2 rounded"
            >
              More Details
            </button>
          </p>
          <div className="flex space-x-3 mt-1 items-center">
            <Image
              alt={order?.orders[0]?.mealName}
              src={order?.orders[0]?.imageUrl}
              width={20}
              height={20}
              className="rounded-full w-[20px] h-[20px]"
            />
            <p className="w-[150px]! text-wrap">
              {order?.orders[0]?.mealName} x {order?.orders[0]?.quantity}
            </p>
            <ItemsPopover
              items={order?.orders}
              totalAmount={order?.totalAmount}
            />
          </div>
        </div>
        <div className="flex flex-col gap-8 items-end">
          <p>
            ORDER DATE - <span className="font-bold">{order?.orderDate}</span>
          </p>
          <p>
            Payment - <span className="font-bold">{order.paymentMethod}</span>
          </p>
        </div>
      </div>
      <div className="card-footer flex justify-between items-center py-4">
        <div>
          <p className="font-bold">
            Order Price - <span>${order.totalAmount}</span>
          </p>
        </div>
        <div className="flex space-x-3">
          <div
            className={`${
              (order.status == "Rejected" || order.status == "Delivered") &&
              "hidden opacity-60 cursor-not-allowed"
            }`}
          >
            <RejectOrder handleRefresh={handleRefresh} order={order} />
          </div>
          <div
            className={`${
              (order.status == "Rejected" ||
                order.status == "Confirmed" ||
                order.status == "Delivered") &&
              "hidden opacity-60 cursor-not-allowed"
            }`}
          >
            <AcceptOrder handleRefresh={handleRefresh} order={order} />
          </div>
        </div>
      </div>
    </div>
  );
}

function ItemsPopover({ items, totalAmount }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <button
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
        className="font-bold"
      >
        more
      </button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div className="bg-black w-[400px] text-slate-300 p-4">
          {/* <p># Items Detail</p> */}
          <div className="space-y-1 border-b-[1px] border-slate-400 pb-2">
            {items.map((item, index) => (
              <div className="flex justify-between" key={index}>
                <p>
                  {item.mealName} x {item.quantity}
                </p>
                <p>${item.amount}</p>
              </div>
            ))}
            {/* <div className="flex justify-between">
              <p>Pizza x 2</p>
              <p>$100.14</p>
            </div>
            <div className="flex justify-between">
              <p>Burger x 1</p>
              <p>$60.51</p>
            </div>
            <div className="flex justify-between">
              <p>Fried Chicken x 6</p>
              <p>$145.14</p>
            </div> */}
          </div>
          <div className="pt-4 flex justify-between">
            <p>Total</p>
            <p>${totalAmount}</p>
          </div>
        </div>
      </Popover>
    </div>
  );
}

const AcceptOrderModal = (props) => {
  const { onClose, open, order , handleRefresh } = props;
  const [riders, setriders] = useState();
  const [selectedRider, setselectedRider] = useState();
  const [estimatedTime, setestimatedTime] = useState();

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    getAvailableRiderReq();
  }, []);

  const getAvailableRiderReq = async () => {
    await getAvailableRider()
      .then((res) => {
        if (res.success) {
          setriders(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const acceptOrderReq = async () => {
    const data = {
      orderId: order.orderId,
      riderId: selectedRider,
      estimatedTime: estimatedTime,
    };

    if(!data.estimatedTime || !data.riderId || !data.orderId){
      onClose();
      Swal.fire({
        icon: "error",
        title: "Missing required fields",
        position: "top-right",
        showConfirmButton: false,
        timer: 1500,
        toast: true,
      });
      return;
    }

    // console.log(data);
    await acceptOrder(data)
      .then((res) => {
        if (res.success) {
          Swal.fire({
            icon: "success",
            title: "Order Accepted",
            position: "top-right",
            showConfirmButton: false,
            timer: 1500,
            toast: true,
          });
          handleClose();
          handleRefresh();
        } else {
          Swal.fire({
            icon: "error",
            title: "Error accepting order",
            position: "top-right",
            showConfirmButton: false,
            timer: 1500,
            toast: true,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <div className="bg-slate-700 text-xs text-slate-200 w-[500px] px-2 py-2">
        <p className="text-sm px-2 py-4 font-semibold">Accept Order</p>
        <div>
          <div className="px-2 py-2">
            <label className="my-2" htmlFor="Available Riders">
              Available Riders *
            </label>
            <select
              className="focus:shadow-primary-outline darkbg-slate-850 darktext-white text-sm leading-5.6 ease block w-full  rounded border border-solid border-gray-300 px-1 py-1 font-normal text-slate-200 outline-none transition-all focus:border-blue-300 focus:outline-none mt-2 bg-transparent"
              // className="flex-1 focus:shadow-primary-outline darkbg-slate-850 darktext-white text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-orange-300 focus:outline-none"
              onChange={(e) => setselectedRider(e.target.value)}
            >
              <option value="" className="bg-slate-900 text-[white]">Select rider</option>
              {riders?.map((rider, index) => (
                <option
                  className="bg-slate-900 text-[white]"
                  value={rider.id}
                  key={index}
                >
                  {rider.name}
                </option>
              ))}
            </select>
          </div>
          <TextField
            label={"Estimated Time (mins) *"}
            half={true}
            value={estimatedTime}
            type={"number"}
            onChange={(e) => setestimatedTime(e.target.value)}
          />
          <div className="px-2 py-4 flex justify-end gap-3">
            <button
              className="bg-teal-500 px-3 py-2 rounded"
              onClick={() => {
                acceptOrderReq();
              }}
            >
              Accept
            </button>
            <button className="bg-gray-500 px-3 py-2 rounded" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

AcceptOrderModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

function AcceptOrder({ order , handleRefresh }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button
        className="bg-[#ff6287] rounded py-2 px-4"
        onClick={handleClickOpen}
      >
        Accept
      </button>
      <AcceptOrderModal handleRefresh={handleRefresh} open={open} onClose={handleClose} order={order} />
    </div>
  );
}

const RejectOrderModal = (props) => {
  const { onClose, open, order, handleRefresh } = props;
  const [comments, setcomments] = useState("");

  const handleClose = () => {
    onClose();
  };

  const rejectOrderReq = () => {
    const id = order.orderId;
    const data = {
      status: "Rejected",
      comments,
    };

    if(!data.status || !data.comments){
      onClose();
      Swal.fire({
        icon: "error",
        title: "Missing required fields",
        position: "top-right",
        showConfirmButton: false,
        timer: 1500,
        toast: true,
      });
      return;
    }

    try {
      updateOrderStatus(id, data).then((res) => {
        if (res.success) {
          Swal.fire({
            icon: "success",
            title: `Order ${data.status}`,
            position: "top-right",
            showConfirmButton: false,
            timer: 1500,
            toast: true,
          });
          handleRefresh();
          handleClose();
        } else {
          Swal.fire({
            icon: "error",
            title: "Error accepting order",
            position: "top-right",
            showConfirmButton: false,
            timer: 1500,
            toast: true,
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <div className="bg-slate-700 w-[500px] text-xs px-2 py-2 text-slate-200">
        <p className="text-sm px-2 py-4 font-semibold">Reject Order</p>
        <div>
          <div className="px-2">
            <label htmlFor="reasonOfrejection">{"Reason *"}</label>
            <textarea
              required
              className="w-full px-3 py-2 my-3 border-[1px] border-slate-600 bg-[#2e374a] appearance-none rounded outline-none"
              value={comments}
              onChange={(e) => setcomments(e.target.value)}
            />
          </div>
          <div className="px-2 py-4 flex justify-end gap-3">
            <button
              className="bg-teal-500 px-3 py-2 rounded"
              onClick={rejectOrderReq}
            >
              Reject
            </button>
            <button className="bg-gray-500 px-3 py-2 rounded" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

RejectOrderModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

const RejectOrder = ({ order , handleRefresh }) => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <button
        className="bg-gray-700 rounded py-2 px-4"
        onClick={handleClickOpen}
      >
        Reject
      </button>
      {<RejectOrderModal handleRefresh={handleRefresh} open={open} onClose={handleClose} order={order} />}
    </div>
  );
};

export default OrderCard;
