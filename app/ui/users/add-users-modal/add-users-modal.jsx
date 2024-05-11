import * as React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import TextField from "@/app/ui/dashboard/input/text-field";
import { addUser } from '@/service/api';
import Swal from "sweetalert2/dist/sweetalert2.js";
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react';



function AddUserModal(props) {
  const { onClose, open } = props;
  const [name, setName] = React.useState('');
  const [email, setemail] = React.useState('');
  const [password, setpassword] = React.useState('');
  const [type, settype] = React.useState('');
  const [loading, setloading] = useState(false);

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = async () => {
    const data = {
      name,
      email,
      password,
      type

    };
    try {
      await addUser(data).then((res) => {
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

    <Dialog onClose={handleClose} open={open} PaperProps={{ style: { maxWidth: '350px', width: '100%' } }} >
      <div className="bg-[#1B2537] text-gray-100 text-xs px-2" >
        <p className="font-bold text-sm pt-8 py-2 pb-6 px-2 border-b-[1px] text-center border-slate-900">
          Add User
        </p>
        <div className="w-full mt-4">
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            half={true}

          />
          <TextField
            type={email}
            label="Email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            fullWidth
            half={true}

          />
          <TextField
            label="Password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            fullWidth
            half={true}

          />
          <TextField
            label="Type"
            value={type}
            onChange={(e) => settype(e.target.value)}
            fullWidth
            half={true}

          />
          
          <button className="bg-blue-400 w-full rounded px-8 py-2 mb-4" variant="outlined" onClick={handleSubmit}>
            Submit
            {loading ? <CircularProgress size={18} color="inherit" /> : ''}
          </button>
        </div>
      </div>
    </Dialog>
  );
}

AddUserModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default function AddUser() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <button className="bg-blue-400 rounded px-8 py-2" onClick={handleClickOpen}>
        Add User
      </button>
      <AddUserModal open={open} onClose={handleClose} />
    </>
  );
}
