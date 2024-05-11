import Image from "next/image";
import React from "react";
import imagePlaceholder from "../../../../public/images/restaurantplaceholder.jpg";

function Cards({ data , showRestroMenuById }) {
  // console.log(data);
  return (
    <div onClick={() => {showRestroMenuById(data.id,data.name)}}>
      <div className="w-[200px] cursor-pointer !min-h-[200px] rounded-lg bg-white flex justify-center items-center">
        <Image
          src={data.imageUrl || imagePlaceholder}
          width={200}
          height={100}
          className="h-[200px] w-[200px] rounded-lg object-contain"
          alt={data.name}
        />
      </div>
      <p className="mt-2 font-semibold text-center">{data.name}</p>
    </div>
  );
}

export default Cards;
