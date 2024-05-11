"use client";
import React from "react";
import { usePathname } from "next/navigation";
import IconButton from "@mui/material/IconButton";
import { IoMoonOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { AiOutlineLogin } from "react-icons/ai";
import { destroyCookie } from "nookies";
import { useRouter } from "next/navigation";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import Swal from "sweetalert2/dist/sweetalert2.js";
// import Swal from "sweetalert2";

function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [restroName, setRestroName] = React.useState(null);

  const logout = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Logout",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        destroyCookie(null, "token");
        router.push("/");
      }
    });
  };
  
  return (
    <div className="flex items-center justify-between bg-[#1B2537] rounded py-2 px-4 ">
      <div className="capitalize font-semibold">
        {pathname
          .slice(0, pathname.length - 1)
          .split("/")
          .pop() == "add-meal"
          ? "Add Meals / Combo"
          : pathname
              .slice(0, pathname.length - 1)
              .split("/")
              .pop()}
      </div>
      <div className="flex gap-4">
        {/* <IconButton>
          <IoMoonOutline size={18} color={"white"} />
        </IconButton>
        <IconButton>
          <IoMdNotificationsOutline size={20} color={"white"} />
        </IconButton> */}
        <IconButton onClick={logout}>
          <AiOutlineLogin title="logout" size={20} color={"white"} />
        </IconButton>
      </div>
    </div>
  );
}

export default Navbar;
