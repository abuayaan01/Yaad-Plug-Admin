"use client";
import React, { useEffect, useState } from "react";
import TextField from "@/app/ui/dashboard/input/text-field";
import Image from "next/image";
import imagePlaceholder from "../../../../public/images/imagePlaceholder.webp";
import StatusRadio from "@/app/ui/meal/status-radio/status-radio";
import { addMeal } from "@/service/api";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2/dist/sweetalert2.js";
import CircularProgress from "@mui/material/CircularProgress";
import Select from "react-select";
import { getMealOptions } from "@/service/api";
import { showSessionExpiredToast } from "@/service/utils/sessionExpiredToast";
import { useAuth } from "@/service/utils/authContext";

function AddMeal({ query, closeScreen, handleupdateMenu }) {
  const [name, setname] = useState("");
  const [category, setcategory] = useState("");
  const [price, setprice] = useState("");
  const [description, setdescription] = useState("");
  const [isVeg, setisVeg] = useState(false);
  const [isSpicy, setisSpicy] = useState(false);
  const [mealImage, setmealImage] = useState();
  const [status, setstatus] = useState(true);
  const [loading, setloading] = useState(false);
  const [categoryList, setcategoryList] = useState([]);
  const [comboItem, setComboItem] = useState();
  const [comboItemQuantity, setComboItemQuantity] = useState(1);
  const [mealOptions, setmealOptions] = useState([]);
  const [isCombo, setIsCombo] = useState(query?.cid == 13 ? true : false);

  const router = useRouter();

  // const { handleUnauthorizedAccess } = useAuth();

  const handleImageChange = (e) => {
    setmealImage(e.target.files[0]);
  };

  useEffect(() => {
    // getCategories().then((res) => {
    //   setcategoryList(res.data);
    // });
    getMealOptionsReq();
  }, []);

  const getMealOptionsReq = () => {
    getMealOptions()
      .then((res) => {
        setmealOptions(res.data);
      })
      .catch((err) => {
        if (err.response.data.status === 401) {
          // handleUnauthorizedAccess();
          showSessionExpiredToast();
        } else {
          console.log(err);
        }
      });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setloading(true);

    if (!mealImage) {
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

    const data = {
      name: name,
      // category: category,
      price: price,
      description: description,
      isVegetarian: isVeg,
      mealImage,
      isSpicy: isSpicy,
      status: status,
      categoryId: query.cid,
      restaurantId: query.rid,
    };

    const formData = new FormData();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        formData.append(key, data[key]);
      }
    }

    try {
      await addMeal(formData).then((res) => {
        if (res.success) {
          Swal.fire({
            icon: "success",
            title: "Meal added successfully.",
            position: "top-right",
            showConfirmButton: false,
            timer: 1500,
            toast: true,
          });
          // router.push("/dashboard/meals");
          closeScreen()
          handleupdateMenu()
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
  };

  const options = mealOptions.map((item) => {
    return { value: item, label: item };
  });

  const customStyles = {
    control: (provided) => ({
      ...provided,
      boxShadow: "0 0 0 0px #777",
      borderColor: "#4A5568",
      backgroundColor: "#2e374a",
      color: "#fff",
      fontSize: "12px",
      borderRadius: "4px",
      border: "1px solid #4A5568",
      outline: "none",
      transition: "all 0.2s",
      "&:hover": {
        borderColor: "#4A5568",
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#2e374a",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#2563EB" : "#2e374a",
      color: state.isSelected ? "#ffffff" : "#ffffff",
      "&:hover": {
        backgroundColor: "#2563EB",
        color: "#ffffff",
      },
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: "#fff", // Set the text color for the selected value
      display: "flex", // Ensure content is on a single line
      alignItems: "center", // Vertically center the content
    }),
    placeholder: (provided, state) => ({
      ...provided,
      color: "white",
    }),
    input: (provided, state) => ({
      ...provided,
      color: "white",
    }),
  };

  const addComboItem = () => {
    if (description) {
      setdescription(
        description + `\n${comboItem.value} x ${comboItemQuantity}`
      );
      return;
    }
    setdescription(`${comboItem.value} x ${comboItemQuantity}`);
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <div className="flex gap-4 text-xs">
          <div className="flex-1 bg-[#1B2537] rounded p-4">
            <div className="font-semibold flex justify-between py-2 pb-6 px-2 border-b-[1px] border-slate-900">
              <span>Add {isCombo ? "Combo" : "Meal"}</span>
              {/* <span className="flex gap-2 items-center">
                Combo
                <StatusRadio
                  value={isCombo}
                  // onChange={() => setIsCombo(!isCombo)}
                />
              </span> */}
            </div>
            <div className="flex flex-wrap w-full mt-2">
              <TextField
                label={"Name"}
                half={true}
                value={name}
                onChange={(e) => setname(e.target.value)}
              />
              {/* <div className="px-2 py-2 w-[50%]">
                <label className="my-2" htmlFor="Available Category">
                  Category
                </label>
                <select
                  className="focus:shadow-primary-outline darkbg-slate-850 darktext-white leading-5.6 ease block w-full rounded border border-solid border-slate-600 px-1 py-2 mt-3 font-normal text-slate-200 outline-none transition-all focus:border-blue-300 text-xs focus:outline-none bg-[#2e374a]"
                  onChange={(e) => setcategory(e.target.value)}
                  required={true}
                  value={isCombo ? "Combo" : category}
                >
                  <option value="">Select category</option>
                  {isCombo ? (
                    <option
                      className="bg-slate-900 text-xs text-[white]"
                      value={"Combo"}
                    >
                      Combo
                    </option>
                  ) : (
                    ""
                  )}
                  {categoryList &&
                    categoryList?.map((category, index) => (
                      <option
                        className="bg-slate-900 text-xs text-[white]"
                        value={category.name}
                        key={index}
                      >
                        {category.name}
                      </option>
                    ))}
                </select>
              </div> */}

              <TextField
                label={"Price"}
                value={price}
                type={"number"}
                onChange={(e) => setprice(e.target.value)}
              />
            </div>
            {/* {isCombo && (
              <div className="px-2 py-2">
                <label className="my-2" htmlFor="Available Category">
                  Combo items
                </label>
                <div className="flex items-center gap-2">
                  <div className="mt-3 w-full">
                    <Select
                      onChange={(value) => setComboItem(value)}
                      options={options}
                      styles={customStyles}
                    />
                  </div>
                  <p className="mt-2">x</p>
                  <select
                    className="focus:shadow-primary-outline darkbg-slate-850 darktext-white leading-5.6 ease block rounded border border-solid border-slate-600 px-1 py-2 mt-3 font-normal text-slate-200 outline-none transition-all focus:border-blue-300 text-xs focus:outline-none bg-[#2e374a]"
                    onChange={(e) => setComboItemQuantity(e.target.value)}
                  >
                    <option value={""}>Select quantity</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                  </select>
                  <span
                    onClick={() => addComboItem()}
                    className="bg-gray-600 rounded px-4 h-[35px] py-2 mt-3 cursor-pointer"
                  >
                    Add
                  </span>
                </div>
              </div>
            )} */}
            <div className="px-2 py-2 mt-2">
              <label htmlFor="Description">Description</label>
              <textarea
                value={description}
                onChange={(e) => setdescription(e.target.value)}
                rows={5}
                required={true}
                className={`w-full px-3 py-2 my-3 border-[1px] border-slate-600 bg-[#2e374a] rounded outline-none`}
              />

              <div className="grid w-full items-center gap-1.5">
                <label className="py-2">Add image</label>
                <input
                  id="picture"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="flex h-10 w-full rounded-md border border-input bg-slate-700 px-3 py-2 text-sm text-gray-400 file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium cursor-pointer"
                />
              </div>
            </div>
          </div>
          <div className="flex-1 bg-[#1B2537] rounded p-4">
            <p className="font-semibold py-2 pb-6 px-2 border-b-[1px] border-slate-900">
              Product Preview
            </p>
            <div className="py-4">
              <Image
                src={
                  mealImage ? URL.createObjectURL(mealImage) : imagePlaceholder
                }
                alt="meal image"
                width={400}
                height={400}
                className={`rounded border-[1px] border-slate-500 w-[300px] min-w-[300px] max-w-[300px] h-[300px] object-contain  ${
                  !mealImage && "opacity-60 object-cover"
                }`}
              />
            </div>
            <div className="py-4 px-2 flex flex-1 flex-col justify-between">
              <div className="flex justify-between w-full">
                <p>Status Available</p>
                <StatusRadio
                  value={status}
                  onChange={() => setstatus(!status)}
                />
              </div>
              <div className="">
                <div className="flex gap-2 justify-between py-2 my-2 w-full">
                  <p>Veg</p>
                  <StatusRadio
                    value={isVeg}
                    onChange={() => setisVeg(!isVeg)}
                  />
                </div>
                <div className="flex justify-between gap-2 py-2 my-2 w-full">
                  <p>Spicy</p>
                  <StatusRadio
                    value={isSpicy}
                    onChange={() => setisSpicy(!isSpicy)}
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="bg-blue-400 rounded mt-4 w-[100px] h-[32px]"
                >
                  {loading ? (
                    <CircularProgress size={18} color="inherit" />
                  ) : (
                    "Save"
                  )}
                </button>
                <button
                  onClick={closeScreen}
                  className="bg-slate-400 ml-4  w-[100px] h-[32px] rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default AddMeal;
