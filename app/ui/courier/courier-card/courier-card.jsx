"use client";

import { CircularProgress, Dialog, Popover, Radio } from "@mui/material";
import { styled } from "@mui/material/styles";
import { TiArrowSortedDown } from "react-icons/ti";
import { updateCourierPackage } from "@/service/api";
import Swal from "sweetalert2/dist/sweetalert2.js";
import React from "react";
import { IoCall } from "react-icons/io5";

function CourierCard({ data }) {
  return (
    <div className="bg-slate-800 md:w-[calc(50%-5px)] w-100 text-xs rounded-md p-4">
      <div className="">
        <div className="flex justify-between py-2 border-b-[1px] border-slate-700">
          <div>
            <span className="text-[#ff6287] text-sm">
              TRACKING ID - {data?.id}
            </span>{" "}
            | {data?.businessName}{" "}
            <div className="mt-1">{data?.description}</div>
          </div>
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded px-2 py-1">
              $ {data?.packageCost}
            </div>
            <div>
              {data?.alreadyPaid == "Yes" ? (
                <p className="ml-4 text-xs bg-[#c3eafff4] font-semibold px-4 py-1 rounded text-sky-800">
                  {"Paid"}
                </p>
              ) : (
                <p className="ml-4 text-xs bg-red-200 text-red-700 font-semibold px-4 py-1 rounded">
                  {"Unpaid"}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center py-2">
          <div>
            <div>
              <p>Current Status - {data?.status}</p>
              <UserDetailsPopover
                userDetails={{ ...data?.User, id: data?.id }}
                address={data?.packageLocation}
              />
            </div>
          </div>
          <div>
            <StatusUpdater id={data?.id} currentStatus={data?.status} />
          </div>
        </div>
      </div>
    </div>
  );
}

function UserDetailsPopover({ userDetails, address }) {
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
        className="font-bold flex items-center mt-2"
      >
        Customer details <TiArrowSortedDown size={22} />
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
        <div className="bg-black w-[400px] text-xs text-slate-300 p-4">
          <div>
            <div className="flex justify-between">
              <div>
                <p>Customer Name : {userDetails?.name}</p>
                <p>Email : {userDetails?.email}</p>
              </div>
              <div className="bg-slate-600 p-2 rounded">
                <a href={`tel:${userDetails?.phoneNumber}`}>
                  <IoCall size={24} color="#BBF7D0" />
                </a>
              </div>
            </div>
            <p>User Id : {"YP" + userDetails?.id}</p>
            <p>Address : {address}</p>
          </div>
        </div>
      </Popover>
    </div>
  );
}

function StatusUpdater({ id, currentStatus }) {
  const [open, setOpen] = React.useState(false);
  const [loader, setloader] = React.useState(false);
  const validStatus = [
    "Pending",
    "Rejected",
    "Cancelled",
    "Accepted",
    "Picked",
    "In-transit",
    "Shipped",
    "Out for delivery",
    "Delivered",
  ];
  const [selectedValue, setSelectedValue] = React.useState(currentStatus);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
  });
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const BpIcon = styled("span")(({ theme }) => ({
    borderRadius: "50%",
    width: 16,
    height: 16,
    boxShadow:
      theme.palette.mode === "dark"
        ? "0 0 0 1px rgb(16 22 26 / 40%)"
        : "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundColor: theme.palette.mode === "dark" ? "#394b59" : "#f5f8fa",
    backgroundImage:
      theme.palette.mode === "dark"
        ? "linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))"
        : "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    ".Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2,
    },
    "input:hover ~ &": {
      backgroundColor: theme.palette.mode === "dark" ? "#30404d" : "#ebf1f5",
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background:
        theme.palette.mode === "dark"
          ? "rgba(57,75,89,.5)"
          : "rgba(206,217,224,.5)",
    },
  }));
  const BpCheckedIcon = styled(BpIcon)({
    backgroundColor: "#445dc1",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&::before": {
      display: "block",
      width: 16,
      height: 16,
      backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
      content: '""',
    },
    "input:hover ~ &": {
      backgroundColor: "#106ba3",
    },
  });
  const updateStatus = () => {
    setloader(true);
    const data = {
      courierId: id,
      status: selectedValue,
    };
    updateCourierPackage(data)
      .then((res) => {
        // console.log(res);
        if (res.success) {
          handleClose();
          Swal.fire({
            icon: "success",
            title: "Package status updated.",
            position: "top-right",
            showConfirmButton: false,
            timer: 1500,
            toast: true,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Some error occurred",
            position: "top-right",
            showConfirmButton: false,
            timer: 2500,
            toast: true,
          });
        }
        setloader(false);
      })
      .catch((e) => {
        console.log(e);
        setloader(false);
      });
  };

  return (
    <>
      <button
        onClick={handleClickOpen}
        className="bg-gradient-to-r from-[#FC2954] to-[#CA1062] p-2 rounded"
      >
        Update Status
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            borderRadius: 5,
            backgroundColor: "#000000",
          },
        }}
      >
        <div className="bg-[#2D2F3F] p-8 text-slate-200 flex gap-2 flex-col">
          <p className="mb-4 font-semibold">Update package status</p>
          {validStatus.map((status) => {
            return (
              <div
                className={`flex gap-2 justify-start items-center w-[300px] ${
                  selectedValue == status
                    ? "bg-[#445dc140] border-2 border-[#445dc1] rounded-md"
                    : ""
                } `}
                key={status}
              >
                <Radio
                  checkedIcon={<BpCheckedIcon />}
                  icon={<BpIcon />}
                  {...controlProps(status)}
                  sx={{
                    color: "grey",
                    "&.Mui-checked": {
                      color: "#6583F9",
                    },
                  }}
                />
                <span className="text-xs">{status}</span>
              </div>
            );
          })}
          <button
            onClick={updateStatus}
            className="mt-4 bg-gradient-to-r from-[#FC2954] to-[#CA1062] p-2 rounded"
          >
            {!loader ? "Save" : <CircularProgress size={18} />}
          </button>
        </div>
      </Dialog>
    </>
  );
}

export default CourierCard;
