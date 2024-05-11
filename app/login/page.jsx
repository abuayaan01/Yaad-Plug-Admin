"use client";
import React, { useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
import { authLogin } from "@/service/api";
import Image from "next/image";
import logoColor from "./../../public/images/logoColor.png";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { setCookie } from "nookies";
import { FaEye } from "react-icons/fa";
import { RiEyeCloseFill } from "react-icons/ri";

function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  async function handleLogin() {
    setLoader(true);

    try {
      const res = await authLogin(email, password);
      if(res.code === 200) {
        setCookie(null, 'token', res.token, {
          maxAge: 60 * 60,
          path: '/',
          secure: true,
          sameSite: 'Strict',
        });
        router.push('/dashboard');
      }
      else {
        Swal.fire({
          icon: "error",
          title: res.err,
          position: 'top-right',
          showConfirmButton: false,
          timer: 1500,
          toast: true,
        })
      }
      setLoader(false);
    } catch (e) {
      console.log(e);
      setLoader(false);
      Swal.fire({
        icon: "error",
        title: "An error occurred during authentication.",
        position: 'top-right',
        showConfirmButton: false,
        timer: 1500,
        toast: true,
      })
    }
  }
  return (
    <div className="login-page h-screen w-full flex justify-center items-center">
    <div className="w-[400px] backdrop-filter bg-[#1B2537] backdrop-blur-[3px] p-8 rounded-lg border-slate-900 border-[1px] border-t-[1px] border-t-slate-600 border-l-[1px] border-l-slate-600 ">
      <div>
        <div className="py-2">
          <div className="flex justify-center">
            <Image src={logoColor} width={250} alt="Yaad Plug" />
          </div>
          <p className="text-sm text-center py-5">Administration</p>
          <label
            htmlFor="email"
            className="block mb-2 text-xs font-medium text-slate-300 "
          >
            Email
          </label>
          <input
            type="text"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            className="bg-gray-50 text-slate-700 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          />
        </div>
        <div className="py-2">
          <label
            htmlFor="password"
            className="block mb-2 text-xs font-medium text-slate-300 "
          >
            Password
          </label>
          <input
            value={password}
            autoComplete="on"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type={showPassword ? "text" : "password"} 
            className="bg-gray-50 text-slate-700 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          />
          <div
            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-blue-600 mr-10 mt-40 pb-5"
            onClick={() => setShowPassword(!showPassword)}
            >
            {showPassword ? (<FaEye /> ) : (<RiEyeCloseFill />)}</div>
        </div>
        <div className="flex justify-between text-sm py-4">
          <div className="">
            <span className="font-semibold text-slate-300 text-xs">
              Remember me
            </span>
            <Checkbox defaultChecked size="small" color="secondary" />
          </div>
        </div>
        <button
          onClick={handleLogin}
          className={`w-full sm:w-full py-3 rounded bg-[#E83C64] font-bold italic text-slate-50 my-4 flex items-center justify-center cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-lg hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:to-[#00C5E7)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded hover:before:left-0`}
        >
          {loader ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            <p>SIGN IN</p>
          )}
        </button>
      </div>
    </div>
  </div>
  )
}

export default Page