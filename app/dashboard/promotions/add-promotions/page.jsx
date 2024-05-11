"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import imagePlaceholder from "../../../../public/images/imagePlaceholder.webp";
import PromoCard from "@/app/ui/promotions/promo-card/promo-card";
import Image from "next/image";
import { addPromotionalImages } from "@/service/api";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { CircularProgress } from "@mui/material";

function Page() {
  const [userType, setUserType] = useState("allUsers");
  const [promoCode, setPromoCode] = useState("");
  const [promoDescription, setPromoDescription] = useState("");
  const [promoDiscount, setPromoDiscount] = useState("");
  const [discountType, setDiscountType] = useState("value");
  const [promoCount, setPromoCount] = useState("");
  const [minimumBasketValue, setMinimumBasketValue] = useState("");
  const [termsAndConditions, setTermsAndConditions] = useState("");
  const [totalVouchers, setTotalVouchers] = useState("");
  const [redeemsPerUser, setRedeemsPerUser] = useState("");
  const [promoValidity, setPromoValidity] = useState("");
  const [promoStartFrom, setPromoStartFrom] = useState("");
  const [templateImage, setTemplateImage] = useState("");
  const [loading, setloading] = useState(false);

  const router = useRouter();

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const handleDiscountTypeChange = (e) => {
    setDiscountType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setloading(true)

    const formData = new FormData();

    formData.append("images", templateImage);

    addPromotionalImages(formData)
      .then((res) => {
        // console.log(res);
        Swal.fire({
          icon: "success",
          title: "Promo added successfully.",
          position: "top-right",
          showConfirmButton: false,
          timer: 1500,
          toast: true,
        });
        router.back();
        setloading(false);
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
      });
  };

  const handleImageChange = (e) => {
    setTemplateImage(e.target.files[0]);
  };
  return (
    <div>
      {/* <div>
        <div className="flex justify-between items-center">
          <h1 className="text-sm font-semibold ml-2"> Running Offers</h1>
          <button
            className="font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleSubmit}
          >
            <IoChevronBackCircleOutline className="w-6 h-6 text-blue-100" />
          </button>
        </div>
        <div className="grid grid-cols-4 gap-4 py-4 rounded shadow-xl">
          <PromoCard />
          <PromoCard />
          <PromoCard />
          <PromoCard />
        </div>
      </div> */}
      <div className=" mx-auto px-6 py-6 my-6 bg-[#1B2537] rounded-md shadow-md">
        <div className="flex justify-end"></div>
        <form onSubmit={handleSubmit}>
          {/* <div className="flex my-3 text-xs">
            <label className="mr-4">
              <input
                type="radio"
                value="allUsers"
                checked={userType === "allUsers"}
                onChange={handleUserTypeChange}
              />
              <span className="ml-2">All Users</span>
            </label>
            <label>
              <input
                type="radio"
                value="firstTimeUsers"
                checked={userType === "firstTimeUsers"}
                onChange={handleUserTypeChange}
              />
              <span className="ml-2">First Time Users</span>
            </label>
          </div> */}
          {/* <div className="flex flex-row space-x-10 text-xs">
            <div className="my-3 ">
              <label className="block">
                Promo Code Name
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  required
                  className="block w-[550px] mt-3 rounded-md border border-slate-600 bg-[#2e374a] focus:outline-none px-3 py-2 text-gray"
                />
              </label>
            </div>
            <div className="my-3 ">
              <label className="block pb-3">
                Promo Code Description
                <input
                  type="text"
                  value={promoDescription}
                  required
                  onChange={(e) => setPromoDescription(e.target.value)}
                  className="block w-400 mt-3 w-[550px] rounded-md border border-slate-600 bg-[#2e374a] focus:outline-none px-3 py-2 text-gray"
                />
              </label>
            </div>
          </div> */}
          {/* <div className="flex flex-row space-x-10 text-xs">
            <div className="my-2">
              <div className="">
                <label className="inline-block mr-4 mb-2">
                  <input
                    type="radio"
                    value="value"
                    checked={discountType === "value"}
                    onChange={handleDiscountTypeChange}
                  />
                  <span className="ml-2">Value</span>
                </label>
                <label className="inline-block">
                  <input
                    type="radio"
                    value="%"
                    checked={discountType === "%"}
                    onChange={handleDiscountTypeChange}
                  />
                  <span className="ml-2">Percentage</span>
                </label>
              </div>
              <div className="flex">
                <label className="block ">
                  Promo Code Discount
                  <input
                    type="text"
                    value={promoDiscount}
                    onChange={(e) => setPromoDiscount(e.target.value)}
                    required
                    className="block w-[550px] mt-3 rounded-md border border-slate-600 bg-[#2e374a] focus:outline-none px-3 py-2 text-gray"
                  />
                </label>

                <label className="block ml-10">
                  Minimum Basket Value
                  <input
                    type="text"
                    value={minimumBasketValue}
                    required
                    onChange={(e) => setMinimumBasketValue(e.target.value)}
                    className="block w-[550px] mt-3 rounded-md border border-slate-600 bg-[#2e374a] focus:outline-none px-3 py-2 text-gray"
                  />
                </label>
              </div>
            </div>
          </div> */}
          {/* <div className="flex flex-row mt-6 text-xs space-x-10">
            <div className="mb-4">
              <label className="block mb-2">
                Redeems Allowed Per User
                <input
                  type="text"
                  value={redeemsPerUser}
                  required
                  onChange={(e) => setRedeemsPerUser(e.target.value)}
                  className="block w-[550px] mt-3 rounded-md border border-slate-600 bg-[#2e374a] focus:outline-none px-3 py-2 text-gray"
                />
              </label>
            </div>
            <div className="mb-4 text-xs">
              <label className="block mb-2">
                Terms and Conditions *
                <input
                  type="text"
                  value={termsAndConditions}
                  onChange={(e) => setTermsAndConditions(e.target.value)}
                  required
                  className="block w-[550px] mt-3 rounded-md border border-slate-600 bg-[#2e374a] focus:outline-none px-3 py-2 text-gray"
                ></input>
              </label>
            </div>
          </div> */}

          <div className="my-3 text-xs">
            <div className="flex items-center justify-around">
              {/* <div className="flex">
                <label className="block mb-2">
                  Offers start from
                  <input
                    type="date"
                    value={promoStartFrom}
                    onChange={(e) => setPromoStartFrom(e.target.value)}
                    required
                    className="block w-[250px] mt-3 rounded-md border border-slate-600 bg-[#2e374a] focus:outline-none px-3 py-2 text-gray"
                  />
                </label>
                <label className="block mb-2 mx-12">
                  Promo Code Validity
                  <input
                    type="date"
                    value={promoValidity}
                    onChange={(e) => setPromoValidity(e.target.value)}
                    required
                    className="block w-[250px] mt-3 rounded-md border border-slate-600 bg-[#2e374a] focus:outline-none px-3 py-2 text-gray"
                  />
                </label>
              </div> */}

              <div className="grid w-full items-center gap-1.5">
                <label className="py-2">Set template</label>
                <input
                  id="picture"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                  className="flex rounded-md border border-input bg-slate-700 px-3 py-2 text-sm text-gray-400 file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium cursor-pointer"
                />
              </div>
            </div>

            <div className="mt-3">
              <h1 className="mb-3 ">Preview</h1>
              <Image
                className={`rounded ${!templateImage && "opacity-60"}`}
                src={
                  templateImage
                    ? URL.createObjectURL(templateImage)
                    : imagePlaceholder
                }
                alt="meal image"
                width={290}
                height={150}
                style={{ height: "160px" }}
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-pink-700 w-[150px] hover:bg-pink-500 text-white font-bold py-2 mt-4 px-4 rounded"
          >
            { loading ? <CircularProgress size={14} />  : "Add Promotion" } 
          </button>
          <button
            type="button" 
            onClick={() => router.back()}
            className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 ml-4 mt-4 px-4 rounded"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default Page;
