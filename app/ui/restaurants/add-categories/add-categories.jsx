import React, { useEffect, useRef, useState } from "react";
import Dialog from "@mui/material/Dialog";
import Image from "next/image";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { MdAdd } from "react-icons/md";
import { addCategoriesToRestaurant } from "@/service/api";
import TextField from "../../dashboard/input/text-field";
import imagePlaceholder from "../../../../public/images/imagePlaceholder.webp";
import { createCaregories } from "@/service/api";
import { getCategories } from "@/service/api";

function AddCategories({ rid, handleChange, cidList }) {
  const [open, setOpen] = React.useState(false);
  const [selectedCategories, setselectedCategories] = React.useState([]);
  const [showCreateCategories, setshowCreateCategories] = React.useState(false);
  const [categoriesList, setcategoriesList] = React.useState([]);
  const [refresh, setrefresh] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function toggleRefresh() {
    setrefresh(!refresh);
  }

  useEffect(() => {
    const fetchData = () => {
      getCategories()
        .then((res) => {
          setcategoriesList(res.data);
        })
        .catch((err) => console.log(err));
    };

    fetchData();
  }, [refresh]);

  useEffect(() => {
    setselectedCategories(cidList);
  }, [cidList]);

  function pushCategory(id) {
    if (selectedCategories.includes(id)) {
      setselectedCategories(selectedCategories.filter((item) => item !== id));
      return;
    }
    setselectedCategories([...selectedCategories, id]);
  }

  function addCategoriesToRestro() {
    if (!selectedCategories.length) {
      Swal.fire({
        icon: "error",
        text: "Please select atleast one category",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
      });
      return;
    }

    addCategoriesToRestaurant(rid, selectedCategories).then((res) => {
      // console.log(res);
      if (res.success) {
        Swal.fire({
          icon: "success",
          text: res.msg,
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
        });
        // setMenu(res.data.Categories)
        handleChange();
        handleClose();
      }
    });

    // console.log(selectedCategories);
  }

  return (
    <React.Fragment>
      <button
        onClick={handleClickOpen}
        className="flex items-center justify-center bg-slate-200 text-blue-500 2bg-gradient-to-r from-purple-500 to-pink-500 rounded px-2 py-2"
      >
        Add Categories
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
        <div className="bg-[#1B2537] text-gray-100 text-xs p-4">
          {showCreateCategories ? (
            <CreateCategory
              toggleRefresh={toggleRefresh}
              setshowCreateCategories={setshowCreateCategories}
            />
          ) : (
            <div>
              <div className="h-[450px] overflow-hidden overflow-y-scroll flex flex-wrap justify-around items-center gap-4">
                <div
                  onClick={() => {
                    setshowCreateCategories(true);
                  }}
                  className="cursor-pointer w-[80px] h-[80px] border-[1px] rounded flex flex-col justify-center items-center"
                >
                  <MdAdd size={30} />
                </div>
                {categoriesList?.map((category, idx) => {
                  return (
                    <>
                      <div
                        onClick={() => pushCategory(category?.id)}
                        className={`cursor-pointer w-[100px] h-[100px] borsder-2 flex flex-col justify-center items-center ${
                          selectedCategories.includes(category?.id) &&
                          "bg-slate-700 rounded"
                        }`}
                      >
                        <Image
                          alt="category.name"
                          width={100}
                          height={100}
                          src={category?.imageUrl || imagePlaceholder}
                          className="rounded-full h-[50px] w-[50px] object-cover"
                        />
                        <p className="text-center text-[10px] p-2 font-light">
                          {category?.name}
                        </p>
                      </div>
                    </>
                  );
                })}
              </div>
              <div className="mt-4 flex justify-center px-2">
                <button
                  onClick={addCategoriesToRestro}
                  className="w-full rounded py-2 bg-gradient-to-r from-purple-500 to-pink-500"
                >
                  Add Selected Categories
                </button>
              </div>
            </div>
          )}
        </div>
      </Dialog>
    </React.Fragment>
  );
}

function CreateCategory({ toggleRefresh, setshowCreateCategories }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [catImage, setcatImage] = useState();
  const [loading, setloading] = useState(false);

  const imageUpload = useRef(null);

  const handleImageChange = (e) => {
    setcatImage(e.target.files[0]);
  };

  const clickUploadReference = () => {
    imageUpload.current.click();
  };

  const createCat = async (e) => {
    e.preventDefault();
    setloading(true);

    if (!catImage) {
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

    if (!name || !description) {
      Swal.fire({
        icon: "error",
        position: "top-right",
        text: "Required fields are missing",
        toast: true,
        showConfirmButton: false,
        timer: 1500,
      });
      setloading(false);
      return;
    }

    const formData = new FormData();

    formData.append("name", name);
    formData.append("categoryImage", catImage);
    formData.append("description", description);

    createCaregories(formData)
      .then((res) => {
        if (res.success) {
          setloading(false);
          setName("");
          setDescription("");
          setcatImage("");
          toggleRefresh();
          setshowCreateCategories(false);
          Swal.fire({
            icon: "success",
            title: "Created successfully.",
            position: "top-right",
            showConfirmButton: false,
            timer: 1500,
            toast: true,
          });
        } else {
          setloading(false);
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
    <div>
      <p className="text-sm font-semibold">Create New Category</p>
      <div>
        <div>
          <div className="pt-4 px-2 mb-4">
            <Image
              src={catImage ? URL.createObjectURL(catImage) : imagePlaceholder}
              alt="restaurant image"
              width={400}
              height={400}
              onClick={clickUploadReference}
              className={`cursor-pointer rounded w-[400px] min-w-[350px] max-w-[300px] h-[300px] object-cover  ${
                !catImage && "opacity-60"
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
          <TextField
            name={"name"}
            label={"Name"}
            required
            id="name"
            type="text"
            half={true}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            name={"description"}
            label={"Description"}
            required
            id="description"
            type="text"
            half={true}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="flex justify-between gap-4 px-2">
          <button
            className="w-1/2 bg-slate-400 rounded mt-4 h-[32px]"
            onClick={() => {
              setshowCreateCategories(false);
            }}
          >
            Close
          </button>
          <button
            className="w-1/2 bg-blue-400 rounded mt-4 h-[32px]"
            onClick={createCat}
          >
            Create Category
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddCategories;
