import React, { useEffect, useState } from "react";
import NoDataFound from "../../dashboard/no-data-found/no-data-found";
import { IoReturnUpBack } from "react-icons/io5";
import { getRestaurantMenuItems } from "@/service/api";
import Image from "next/image";
import placeHolder from "../../../../public/images/restaurantplaceholder.jpg";
import { FaCircle } from "react-icons/fa";
import AddMeal from "../add-meal/page";
import Swal from "sweetalert2/dist/sweetalert2.js";
import PageLoader from "../../dashboard/page-loader/page-loader";
import { deleteMeal } from "@/service/api";

function RestaurantMenuItems({ query, setShowMenuItems }) {
  const [menuItems, setMenuItems] = useState([]);
  const [addMealScreen, setAddMealScreen] = useState(false);
  const [loading, setloading] = useState(false);
  const [updateMenu, setupdateMenu] = useState(false);

  const handleupdateMenu = () => {
    setupdateMenu(!updateMenu);
  };

  function deleteMealReq(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete this item.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        deleteMeal(id)
          .then((res) => {
            if (res.status == 200) {
              Swal.fire({
                icon: "Success",
                title: "Meal deleted successfully",
                position: "top-right",
                showConfirmButton: false,
                timer: 1500,
                toast: true,
              });

              handleupdateMenu();
            }
          })
          .catch((e) => console.log(e));
      }
    });
  }

  const handleAddMealRequest = () => {
    setAddMealScreen(true);
  };

  const closeScreen = () => {
    setAddMealScreen(false);
  };

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setloading(true);
        const response = await getRestaurantMenuItems(query.rid, query.cid);
        setMenuItems(response.data);
        setloading(false);
      } catch (error) {
        console.log(error);
        setloading(false);
      }
    };
    fetchMenuItems();
  }, [updateMenu]);

  return (
    <div>
      {addMealScreen ? (
        <div>
          <AddMeal
            query={query}
            closeScreen={closeScreen}
            handleupdateMenu={handleupdateMenu}
          />
        </div>
      ) : (
        <div>
          <div className="flex justify-between">
            <div>
              <button
                onClick={() => {
                  setShowMenuItems(false);
                }}
                className="bg-slate-800 flex items-center gap-2 px-4 py-2 rounded"
              >
                <IoReturnUpBack /> Back
              </button>
            </div>
            <div className="flex">
              <button
                onClick={handleAddMealRequest}
                className="flex items-center justify-center bg-slate-200 text-blue-500 2bg-gradient-to-r from-purple-500 to-pink-500 rounded px-2 py-2"
              >
                Add Meal
              </button>
            </div>
          </div>
          <div className="mt-10 text-blue-200">
            {query.restaurantName} / {query.categoryName}
          </div>
          {loading ? (
            <PageLoader />
          ) : (
            <div className="mt-10">
              {menuItems?.length > 0 ? (
                <div className="flex px-4 flex-wrap justify-start gap-8">
                  {menuItems.map((item) => {
                    return (
                      <>
                        <div>
                          <div>
                            <div className="w-[250px] relative !min-h-[200px] rounded-lg bg-white flex justify-center items-center">
                              <Image
                                alt={item.name}
                                src={item.imageUrl || placeHolder}
                                width={200}
                                height={100}
                                className="w-[250px] rounded-lg object-contain"
                              />
                              <button
                                onClick={() => {
                                  deleteMealReq(item.id);
                                }}
                                className="py-2 text-center absolute bg-black w-full bottom-[-10px]"
                              >
                                Delete
                              </button>
                            </div>
                            <div className="mt-2 py-4 flex justify-between items-center">
                              <span className="flex items-center gap-2 font-semibold">
                                {item.name}{" "}
                                <span>
                                  {item?.isVegetarian ? (
                                    <FaCircle className="p-[1px] border-[1px] border-green-500 text-green-500" />
                                  ) : (
                                    <FaCircle className="p-[1px] border-[1px] border-red-500 text-red-500" />
                                  )}
                                </span>
                              </span>
                              <span>$ {item.price}</span>
                            </div>
                            <div>
                              <p className="text-slate-500 w-[250px] text-wrap text-[12px]">
                                {item?.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
              ) : (
                <NoDataFound />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default RestaurantMenuItems;
