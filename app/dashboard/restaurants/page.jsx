"use client";
import React, { useEffect } from "react";
import { getRestaurants } from "@/service/api";
import { useState } from "react";
import PageLoader from "@/app/ui/dashboard/page-loader/page-loader";
import Cards from "@/app/ui/restaurants/cards/cards";
import AddRestaurant from "@/app/ui/restaurants/add-restaurant/add-restaurant";
import RestaurantMenu from "@/app/ui/restaurants/restaurant-menu/restaurant-menu";
import { useAuth } from "@/service/utils/authContext";
import { showSessionExpiredToast } from "@/service/utils/sessionExpiredToast";
import NoDataFound from "@/app/ui/dashboard/no-data-found/no-data-found";


function Page() {
  const [restro, setRestro] = useState([]);
  const [restroName, setrestroName] = useState();
  const [restroId, setRestroId] = useState("");
  const [loading, setloading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [showRestaurantMenu, setshowRestaurantMenu] = useState(false);
  const { handleUnauthorizedAccess } = useAuth();


  const toggleRefresh = () => {
    setRefresh(!refresh);
  }

  const closeRestaurantMenu = () => {
    setshowRestaurantMenu(false);
  };

  const showRestroMenuById = (id,name) => {
    setRestroId(id);
    setshowRestaurantMenu(true);
    setrestroName(name)
  };

  useEffect(() => {
    const fetchData = () => {
      setloading(true);
      getRestaurants()
        .then((res) => {
          // console.log(res);
          setRestro(res.data);
          setloading(false);
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
  }, [refresh]);
  return (
    <>
      {showRestaurantMenu ? (
        <RestaurantMenu exit={closeRestaurantMenu} id={restroId} name={restroName} refresh={toggleRefresh} />
      ) : !loading ? (
        <>
          <div className="flex justify-end">
            <AddRestaurant refresh={toggleRefresh} />
          </div>
          <div className="mt-10">
            <div className="flex justify-start px-4 flex-wrap gap-8">
              {restro.length > 0 ? restro.map((item) => {
                return (
                  <div key={item.id}>
                    <Cards
                      data={item}
                      showRestroMenuById={showRestroMenuById}
                    />
                  </div>
                );
              }) : <NoDataFound />}
            </div>
          </div>{" "}
        </>
      ) : (
        <>
          <PageLoader />
        </>
      )}
    </>
  );
}

export default Page;
