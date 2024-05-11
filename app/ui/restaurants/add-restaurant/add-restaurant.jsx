import React from "react";
import Dialog from "@mui/material/Dialog";
import imagePlaceholder from "../../../../public/images/imagePlaceholder.webp";
import TextField from "../../dashboard/input/text-field";
import Image from "next/image";
import { CircularProgress } from "@mui/material";
import { useRef } from "react";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { addRestaurant } from "@/service/api";
import axios from "axios";

function AddRestaurant({refresh}) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [restroImage, setrestroImage] = React.useState();
  const [loading, setloading] = React.useState("");

  const imageUpload = useRef(null);

  const handleImageChange = (e) => {
    setrestroImage(e.target.files[0]);
  };

  const clickUploadReference = () => {
    imageUpload.current.click();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addRestro = async (e) => {
    e.preventDefault();
    setloading(true);

    if (!restroImage) {
      Swal.fire({
        icon: "error",
        position: "top-right",
        text: "Please select an image",
        toast: true,
        showConfirmButton: false,
        timer: 1500,
      });
      setloading(false);
      return;
    }
    if (!name) {
      Swal.fire({
        icon: "error",
        position: "top-right",
        text: "Please insert name",
        toast: true,
        showConfirmButton: false,
        timer: 1500,
      });
      setloading(false);
      return;
    }

    const formData = new FormData();

    formData.append("name", name);
    formData.append("restaurantImage", restroImage);

    addRestaurant(formData)
      .then((res) => {
        if (res.success) {
          setloading(false);
          setOpen(false);
          setName("");
          setrestroImage("");
          refresh();
          Swal.fire({
            icon: "success",
            title: "Restaurant added successfully.",
            position: "top-right",
            showConfirmButton: false,
            timer: 1500,
            toast: true,
          });
        } else {
          setloading(false);
          setOpen(false);
          Swal.fire({
            icon: "error",
            title: `${res.msg}` || "Something went wrong!",
            position: "top-right",
            showConfirmButton: false,
            timer: 1500,
            toast: true,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <React.Fragment>
      <button
        onClick={handleClickOpen}
        className="bg-sky-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Add Restaurant
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxWidth: "400px",
            width: "100%",
            borderRadius: 5,
            backgroundColor: "#000000",
          },
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="bg-[#1B2537] text-gray-100 text-xs px-2">
          <p
            className="font-bold text-sm pt-6 pb-4 px-2"
            id="alert-dialog-title"
          >
            {"Add Restaurant"}
          </p>
          <div className="pt-4 px-4">
            <Image
              src={
                restroImage
                  ? URL.createObjectURL(restroImage)
                  : imagePlaceholder
              }
              alt="restaurant image"
              width={400}
              height={400}
              onClick={clickUploadReference}
              className={`cursor-pointer rounded w-[400px] min-w-[350px] max-w-[300px] h-[300px] object-contain  ${
                !restroImage && "opacity-60"
              }`}
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <input
              ref={imageUpload}
              id="picture"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden h-10 w-full rounded-md border border-input bg-slate-700 px-3 py-2 text-sm text-gray-400 file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium cursor-pointer"
            />
          </div>

          <div className="px-2">
            <TextField
              // label="Name *"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              placeholder={"Write restraunt name..."}
              half={true}
            />
          </div>
          <div className="flex justify-end gap-3 pb-4 px-4">
            <button
              onClick={handleClose}
              className="bg-gray-400 rounded mt-4 w-[100px] h-[32px]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-400 rounded mt-4 w-[100px] h-[32px]"
              onClick={(e) => addRestro(e)}
            >
              {loading ? (
                <CircularProgress size={18} color="inherit" />
              ) : (
                "Save"
              )}
            </button>
          </div>
        </div>
      </Dialog>
    </React.Fragment>
  );
}

export default AddRestaurant;
