import React from "react";
import foodCard from "./../../../../public/images/promotions/pizzaPromo.png";
import { deletePromotionalImages } from "@/service/api";
import Swal from "sweetalert2/dist/sweetalert2.js";
import Image from "next/image";

function PromoCard({ data, setupdateList }) {
  const divStyle = {
    backgroundImage: `url(${data?.imageUrl})`,
    backgroundSize: "100% 170px",
    backgroundPosition: "center",
    backgroundColor: "#000",
    width: "290px",
    height: "170px",
    borderRadiusTop: "8px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  };

  const deletePromo = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deletePromotionalImages({
          imageIds: [data.id],
        })
          .then((res) => {
            // console.log(res);
            setupdateList();
            Swal.fire({
              icon: "success",
              title: "Deleted successfully",
              position: "top-right",
              showConfirmButton: false,
              timer: 1500,
              toast: true,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  return (
    <div>
      <div className="w-[270px] h-[160px] relative bg-black">
        <Image
          src={data?.imageUrl}
          fill
          className="rounded-t"
        />
      </div>
      <div
        onClick={deletePromo}
        className="text-red-400 text-center cursor-pointer bg-black p-2 rounded-b"
      >
        Delete
      </div>
    </div>
  );
}

export default PromoCard;
