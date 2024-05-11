"use client";
import React, { useEffect, useState } from "react";
import PromoCard from "@/app/ui/promotions/promo-card/promo-card";
import { useRouter } from "next/navigation";
import { getPromotionalImages } from "@/service/api";
import PageLoader from "@/app/ui/dashboard/page-loader/page-loader";

function Page() {
  const router = useRouter();
  const [promotionalImages, setPromotionalImages] = useState([]);
  const [updateList, setupdateList] = useState(false);

  const refresh = () => {
    setupdateList(!updateList);
  }

  useEffect(() => {
    const fetchData = () => {
      getPromotionalImages()
        .then((res) => {
          setPromotionalImages(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, [updateList]);

  return (
    <>
      <div className="rounded">
        <div className="flex justify-end mb-4">
          <button
            className="bg-sky-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => {
              router.push("add-promotions");
            }}
          >
            {" "}
            Add Promotion
          </button>
        </div>

        {promotionalImages.length > 0 ? (
          <div className="flex gap-4 flex-wrap">
            {promotionalImages.map((image) => {
              return <PromoCard key={image.id} setupdateList={refresh} data={image} />;
            })}
          </div>
        ) : (
          <PageLoader />
        )}
      </div>
    </>
  );
}

export default Page;
