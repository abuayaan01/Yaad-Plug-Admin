import React from "react";
import { FaDatabase } from "react-icons/fa6";

function NoDataFound() {
  return (
    <div className="flex justify-center items-center flex-col w-full gap-10 h-[80vh]">
      <div>
        <FaDatabase size={100} color="#55555590" />
      </div>
      <div className="uppercase">No Results found</div>
    </div>
  );
}

export default NoDataFound;
