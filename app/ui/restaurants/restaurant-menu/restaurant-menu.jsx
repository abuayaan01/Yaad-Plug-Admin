import React, { useEffect, useState } from "react";
import { getRestaurantMenu } from "@/service/api";
// import Swal from "sweetalert2/dist/sweetalert2.js";
import { IoReturnUpBack } from "react-icons/io5";
import imagePlaceholder from "./../../../../public/images/imagePlaceholder.webp";
import { MdDelete } from "react-icons/md";
import Image from "next/image";
import { deleteRetaurant } from "@/service/api";
import PageLoader from "../../dashboard/page-loader/page-loader";
import { useAuth } from "@/service/utils/authContext";
import { showSessionExpiredToast } from "@/service/utils/sessionExpiredToast";
import Swal from "sweetalert2/dist/sweetalert2.js";
import NoDataFound from "../../dashboard/no-data-found/no-data-found";
import AddCategories from "../add-categories/add-categories";
import RestaurantMenuItems from "../restaurant-menu-items/restaurant-menu-items";
function RestaurantMenu({ exit, id, name, refresh }) {
  const [menu, setMenu] = useState([]);
  const [loading, setloading] = useState(false);
  const [cidList, setcidList] = useState([]);
  const [showMenuItems, setShowMenuItems] = useState(false);
  const [query, setQuery] = useState({
    rid: id,
    restaurantName: name,
    cid: null,
    categoryName: null,
  });
  const [updateChanges, setupdateChanges] = useState(false);

  const handleChange = () => {
    setupdateChanges(!updateChanges);
  };

  const { handleUnauthorizedAccess } = useAuth();

  useEffect(() => {
    const fetchData = () => {
      setloading(true);
      getRestaurantMenu(id)
        .then((res) => {
          setloading(true);
          if (res.success) {
            setMenu(res.data.Categories);
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
        })
        .catch((err) => {
          if (err.response.status == 401) {
            showSessionExpiredToast();
            handleUnauthorizedAccess();
          } else {
            console.log(err);
          }
          setloading(false);
        });
    };
    fetchData();
  }, [updateChanges]);

  useEffect(() => {
    extractCategoryIds();
  }, [menu]);

  const extractCategoryIds = () => {
    if (menu.length > 0) {
      // console.log(menu);
      setcidList([]);
      menu?.forEach((item) => {
        // console.log("first", item.id);
        setcidList((prev) => [...prev, item.id]);
        // setcidList([item.id])
      });
    }
    console.log(cidList);
  };

  const DeleteRetuarantReq = () => {
    Swal.fire({
      icon: "error",
      // title: "Something went wrong!",
      text: "Are you sure you want to delete the restaurant?",
      position: "center",
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        deleteRetaurant(id)
          .then((res) => {
            // console.log(res);
            Swal.fire({
              icon: "success",
              title: "Restaurant deleted successfully",
              position: "top-right",
              showConfirmButton: false,
              timer: 1500,
              toast: true,
            });
            refresh();
            exit();
          })
          .catch((err) => {
            // console.log(err)
            Swal.fire({
              icon: "error",
              title: `${err.response.data.msg}` || "Something went wrong!",
              position: "top-right",
              showConfirmButton: false,
              timer: 1500,
              toast: true,
            });
          });
      }
    });
  };

  const showRestrauntMenuItems = (cid, category) => {
    setQuery((prev) => {
      return { ...prev, cid: cid, categoryName: category };
    });
    setShowMenuItems(true);
  };

  return (
    <div>
      {showMenuItems ? (
        <RestaurantMenuItems
          query={query}
          setShowMenuItems={setShowMenuItems}
        />
      ) : (
        <div>
          <div className="flex justify-between">
            <div>
              <button
                onClick={exit}
                className="bg-slate-800 flex items-center gap-2 px-4 py-2 rounded border-slate-800 border-[1px]"
              >
                <IoReturnUpBack /> Back
              </button>
            </div>
            <div className="flex">
              <AddCategories
                rid={id}
                handleChange={handleChange}
                cidList={cidList}
              />
              <button
                onClick={DeleteRetuarantReq}
                className="bg-[#070A0F] flex items-center text-red-400 gap-2 px-4 py-2 rounded ml-4"
              >
                <MdDelete className="text-red-500" /> Delete Restaurant
              </button>
            </div>
          </div>
          <div className="mt-10 text-blue-200">{name}</div>
          <div>
            {loading ? (
              <PageLoader />
            ) : (
              <>
                <div className="mt-10 px-4 flex flex-wrap justify-start gap-8">
                  {menu.length > 0 ? (
                    menu.map((item) => {
                      return (
                        <>
                          <div
                            onClick={() =>
                              showRestrauntMenuItems(item.id, item.name)
                            }
                          >
                            <div>
                              <div className="w-[250px] cursor-pointer !min-h-[200px] rounded-lg bg-white flex justify-center items-center">
                                <Image
                                  // onError={(e) => console.error(e.target.id)}
                                  alt={item.name}
                                  src={item.imageUrl || imagePlaceholder}
                                  width={200}
                                  height={200}
                                  // fill={true}
                                  className="!h-[200px] w-[250px] rounded object-cover"
                                />
                              </div>
                              <p className="mt-2 font-semibold text-center">
                                {item.name}
                              </p>
                            </div>
                          </div>
                        </>
                      );
                    })
                  ) : (
                    <>
                      <NoDataFound />
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default RestaurantMenu;
