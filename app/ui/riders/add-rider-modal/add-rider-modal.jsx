import * as React from "react";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import TextField from "@/app/ui/dashboard/input/text-field";
import { addRider } from "@/service/api";
import Swal from "sweetalert2/dist/sweetalert2.js";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";

function AddRiderModal(props) {
  const { onClose, open } = props;
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [availability, setavailability] = React.useState(true);
  const [contactDetails, setcontactDetails] = React.useState("");
  const [vehiclePlateNumber, setvehiclePlateNumber] = React.useState("");
  const [licensePlateNumber, setlicensePlateNumber] = React.useState("");
  const [loading, setloading] = useState(false);

  const [validationMsg, setvalidationMsg] = useState("");

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = async () => {
    if (
      !name ||
      !contactDetails ||
      !licensePlateNumber ||
      !vehiclePlateNumber ||
      !email ||
      !password
    ) {
      setvalidationMsg("Required fields (*) missing.");
      return;
    }

    const data = {
      name,
      email,
      password,
      contactDetails,
      licensePlateNumber,
      availability,
      vehiclePlateNumber,
    };
    try {
      await addRider(data).then((res) => {
        if (res.success) {
          Swal.fire({
            icon: "success",
            title: "Rider added successfully.",
            position: "top-right",
            showConfirmButton: false,
            timer: 1500,
            toast: true,
          });

          setloading(false);
        } else {
          Swal.fire({
            icon: "error",
            title: "Something went wrong!",
            position: "top-right",
            showConfirmButton: false,
            timer: 1500,
            toast: true,
          });
          setloading(false);
        }
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        position: "top-right",
        showConfirmButton: false,
        timer: 1500,
        toast: true,
      });
      setloading(false);
    }
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      PaperProps={{
        style: {
          maxWidth: "400px",
          width: "100%",
          borderRadius: 5,
          backgroundColor: "#000000",
        },
      }}
    >
      <div className="bg-[#1B2537] text-gray-100 text-xs px-2">
        <p className="font-bold text-sm pt-6 pb-4 px-2">Add Rider</p>
        <div className="w-full">
          <TextField
            label="Name *"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            half={true}
          />
          <TextField
            label="Email *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            type={"email"}
            half={true}
          />
          <TextField
            label="Password *"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            half={true}
          />
          <TextField
            label="Phone Number *"
            value={contactDetails}
            onChange={(e) => setcontactDetails(e.target.value)}
            fullWidth
            required
            half={true}
          />
          <TextField
            label="Vehicle Plate Number *"
            value={vehiclePlateNumber}
            onChange={(e) => setvehiclePlateNumber(e.target.value)}
            fullWidth
            half={true}
          />
          <TextField
            label="License Number *"
            value={licensePlateNumber}
            onChange={(e) => setlicensePlateNumber(e.target.value)}
            fullWidth
            half={true}
          />
          <p className="text-red-500 px-2">{validationMsg}</p>
          <div className="px-2 py-2 flex justify-end gap-4">
            <button
              className="bg-blue-400 rounded px-8 py-2 mb-4"
              variant="outlined"
              onClick={handleSubmit}
            >
              Submit
              {loading ? <CircularProgress size={18} color="inherit" /> : ""}
            </button>
            <button
              onClick={onClose}
              className="bg-gray-600 rounded px-8 py-2 mb-4"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

AddRiderModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default function AddRider() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <button
        className="bg-sky-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={handleClickOpen}
      >
        Add Rider
      </button>
      <AddRiderModal open={open} onClose={handleClose} />
    </>
  );
}
